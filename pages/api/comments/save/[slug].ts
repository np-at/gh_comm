import {Octokit} from "@octokit/core"
import {createAppAuth} from "@octokit/auth-app"
import type {NextApiRequest, NextApiResponse} from "next";
import IComment from "@interfaces/IComment";
import {Endpoints, OctokitResponse} from "@octokit/types";
import {getGithubParamsFromEnv} from "@components/Comments/utils";

type repoContentsRequestParameters =
    Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["parameters"];
type repoContentsRequestResponse = Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]

function appendToParent(comments: Array<IComment>, newComment: IComment): Array<IComment> {
    comments.forEach((comment) => {
        if (comment.id === newComment.parentCommentId) {
            comment.children.push(newComment);
        } else if (comment.children && comment.children.length > 0) {
            comment.children = appendToParent(comment.children, newComment);
        }
    });
    return comments;
}

let octo: Octokit
const getOctoInstance = () => {

    if (!octo)
        if (!process.env.GITHUB_PRIV_KEY)
            console.error("no private key found in env: GITHUB_PRIV_KEY")
    if (!process.env.GITHUB_APP_ID)
        console.error("no app id found in env: GITHUB_APP_ID")
    octo = new Octokit({
        authStrategy: createAppAuth,
        auth: {
            appId: process.env.GITHUB_APP_ID,
            privateKey: process.env.GITHUB_PRIV_KEY,
            installationId: process.env.GITHUB_INSTALLATION_ID
        },
    })
    return octo
}
const SaveComment: (req: NextApiRequest, res: NextApiResponse) => Promise<void> = (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const {owner, repo, ref} = getGithubParamsFromEnv()
    const o = getOctoInstance()
    if (!req.body.content) {

        console.warn("bad request received: comment content empty, rejecting")
        console.log(req.body)
        return new Promise<void>(resolve => {
            res.status(401).json({})
            resolve()
        })
    }

    return new Promise(async (resolve) => {

        // const installations = await o.request("GET /app/installations")
        // console.log(installations)

        const newComment: IComment = {
            date: req.body.date,
            parentCommentId: req.body.parentCommentId,
            id: req.body.id,
            username: req.body.username,
            // email: encrypt(req.body.email as string),
            email: req.body.email,
            content: req.body.content,
            children: req.body.children,
        };

        const {slug} = req.query;


        try {
            const prevComments: repoContentsRequestResponse | void = await o.request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                    headers: {
                        accept: "application/vnd.github.v3+json",
                    },
                    owner: owner,
                    repo: repo,
                    path: `comments/${slug}.json`,
                    ref: ref,

                }
            ).catch((e) => {
                if (e.status !== 404) throw new Error(e);
            });

            if (prevComments) {
                //@ts-ignore
                let data = JSON.parse(Buffer.from((prevComments.data).content, "base64").toString("ascii"));
                //@ts-ignore
                const {sha} = prevComments.data;

                if (newComment.parentCommentId) {
                    data = appendToParent(data, newComment);
                } else {
                    data.push(newComment);
                }

                const update = await o.request(
                    "PUT /repos/{owner}/{repo}/contents/{path}",
                    {
                        headers: {
                            accept: "application/vnd.github.v3+json",
                        },
                        owner: owner,
                        repo: repo,
                        path: `comments/${slug}.json`,
                        branch: ref,
                        message: `Updated comment on post ${slug}`,
                        sha,
                        content: Buffer.from(JSON.stringify(data), "ascii").toString(
                            "base64"
                        ),
                    }
                );

                res.status(200).json(JSON.stringify(update));
                resolve();
            } else {
                const data = [newComment];

                const update = await o.request(
                    "PUT /repos/{owner}/{repo}/contents/{path}",
                    {
                        headers: {
                            accept: "application/vnd.github.v3+json",
                        },
                        owner: owner,
                        repo: repo,
                        path: `comments/${slug}.json`,
                        branch: ref,
                        message: `New comment on post ${slug}`,
                        content: Buffer.from(JSON.stringify(data), "ascii").toString(
                            "base64"
                        ),
                    }
                );

                res.status(200).json(JSON.stringify(update));
                resolve();
            }
        } catch (e) {
            res.status(503).json(e);
            resolve();
        }
    });
};
export default SaveComment
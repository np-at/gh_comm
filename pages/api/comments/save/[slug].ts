import { request } from "@octokit/request";
import type { NextApiRequest, NextApiResponse } from "next";
import IComment from "@interfaces/IComment";
import { encrypt } from "@lib/encryption/crypto";
import {Endpoints, OctokitResponse} from "@octokit/types";
type repoContentsRequestParameters =
    Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["parameters"];
type repoContentsRequestResponse = Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]
function appendToParent(comments: Array<IComment>, newComment: IComment ): Array<IComment> {
    comments.forEach((comment) => {
        if (comment.id === newComment.parentCommentId) {
            comment.children.push(newComment);
        } else if (comment.children && comment.children.length > 0) {
            comment.children = appendToParent(comment.children, newComment);
        }
    });
    return comments;
}
const SaveComment: (req: NextApiRequest, res: NextApiResponse) => Promise<void> =  (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    return new Promise(async (resolve) => {
        const newComment: IComment = {
            date: req.body.date,
            parentCommentId: req.body.parentCommentId,
            id: req.body.id,
            username: req.body.username,
            email: encrypt(req.body.email as string),
            content: req.body.content,
            children: req.body.children,
        };

        const { slug } = req.query;

        try {
            const prevComments: repoContentsRequestResponse | void= await request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                    headers: {
                        authorization: `token ${process.env.GITHUB_TOKEN}`,
                        accept: "application/vnd.github.v3+json",
                    },
                    owner: process.env.GITHUB_OWNER ?? "",
                    repo: process.env.GITHUB_REPO ?? "",
                    path: `comments/${slug}.json`,
                    ref: "prod",

                }
            ).catch((e) => {
                if (e.status !== 404) throw new Error(e);
            });

            if (prevComments) {
                //@ts-ignore
                let data = JSON.parse(Buffer.from((prevComments.data).content, "base64").toString("ascii"));
                //@ts-ignore
                const { sha } = prevComments.data;

                if (newComment.parentCommentId) {
                    data = appendToParent(data, newComment);
                } else {
                    data.push(newComment);
                }

                const update = await request(
                    "PUT /repos/{owner}/{repo}/contents/{path}",
                    {
                        headers: {
                            authorization: `token ${process.env.GITHUB_TOKEN}`,
                            accept: "application/vnd.github.v3+json",
                        },
                        owner: process.env.GITHUB_OWNER ?? "",
                        repo: process.env.GITHUB_REPO ?? "",
                        path: `comments/${slug}.json`,
                        branch: "prod",
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

                const update = await request(
                    "PUT /repos/{owner}/{repo}/contents/{path}",
                    {
                        headers: {
                            authorization: `token ${process.env.GITHUB_TOKEN}`,
                            accept: "application/vnd.github.v3+json",
                        },
                        owner: process.env.GITHUB_OWNER ?? "",
                        repo: process.env.GITHUB_REPO ?? "",
                        path: `comments/${slug}.json`,
                        branch: "prod",
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
            res.status(500).json(e);
            resolve();
        }
    });
};
export default SaveComment
import { Octokit } from "@octokit/core";
import { createAppAuth } from "@octokit/auth-app";
import type { NextApiRequest, NextApiResponse } from "next";
import { ICommentFile, ICommentStorage } from "@interfaces/IComment";
import { Endpoints } from "@octokit/types";
import { getGithubParamsFromEnv } from "@components/Comments/utils";
import { encrypt } from "@lib/encryption/crypto";

type repoContentsRequestParameters =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["parameters"];
type repoContentsRequestResponse = Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]

function appendCommentToCommentFile(commentFile: ICommentFile, newComment: ICommentStorage): ICommentFile {
  const { comments} = commentFile;

  if (newComment.parentCommentId) {
    const parent = comments.find(comment => comment.id === newComment.parentCommentId);
    if (parent) {
      parent.childrenIds = parent.childrenIds || [];
      if (!parent.childrenIds.includes(newComment.id)) {
        parent.childrenIds.push(newComment.id);
      }
    }
  }
  comments.push(newComment);
  return commentFile;
//  comments.forEach((comment) => {
//    const parent = comments.find((c) => c.id === comment.parentCommentId);
//    if (parent) {
//      parent.childrenIds = parent.childrenIds || [];
//      parent.childrenIds.push(newComment.id);
//    }
//    if (comment.id === newComment.parentCommentId) {
//      comment.childrenIds = comment.childrenIds || [];
//      comment.childrenIds.push(newComment.id);
//    } else if (comment.children && comment.children.length > 0) {
//      comment.children = appendCommentToCommentFile(comment.children, newComment);
//    }
//  });
//  return comments;
}

let octo: Octokit;
const getOctoInstance = () => {

  if (!octo)
    if (!process.env.GITHUB_PRIV_KEY)
      console.error("no private key found in env: GITHUB_PRIV_KEY");
  if (!process.env.GITHUB_APP_ID)
    console.error("no app id found in env: GITHUB_APP_ID");
  octo = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIV_KEY,
      installationId: process.env.GITHUB_INSTALLATION_ID
    }
  });
  return octo;
};
const SaveComment: (req: NextApiRequest, res: NextApiResponse) => Promise<void> = (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { owner, repo, ref } = getGithubParamsFromEnv();
  const o = getOctoInstance();
  if (!req.body.content) {

    console.warn("bad request received: comment content empty, rejecting");
    console.log(req.body);
    return new Promise<void>(resolve => {
      res.status(401).json({});
      resolve();
    });
  }

  return new Promise(async (resolve) => {

    // const installations = await o.request("GET /app/installations")
    // console.log(installations)

    const newComment: ICommentStorage = {
      date: req.body.date,
      parentCommentId: req.body.parentCommentId,
      id: req.body.id,
      username: req.body.username,
      // email: encrypt(req.body.email as string),
      email: encrypt(req.body.email),
      content: req.body.content,
      children: req.body.children,
      page_name: req.body.page_name,
      childrenIds: req.body.childrenIds ?? []
    };

//    const { slug } = req.query;
    const slug = req.body.page_name || req.query.slug;


    try {
      const prevComments: repoContentsRequestResponse | void = await o.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          headers: {
            accept: "application/vnd.github.v3+json"
          },
          owner: owner,
          repo: repo,
          path: `comments/${slug}.json`,
          ref: ref

        }
      ).catch((e) => {
        console.error(`error encountered while retrieving repo comments with path: comments/${slug}.json`, e);
        if (e.status !== 404) throw new Error(e);
      });

      if (prevComments) {
        //@ts-ignore
        let data: ICommentFile = JSON.parse(Buffer.from((prevComments.data).content, "base64").toString("ascii"));

        // attempt to deal with possible malformed comments file (all valid comments files should have a page_name value; overwrite it
        if (!data.comments && !data.page_name) {
          console.warn("malformed comments file found, overwriting");
          data = {
            page_name: slug,
            comments: []
          };
        }

        //@ts-ignore
        const { sha } = prevComments.data;
        data.comments = data.comments || [];
        data = appendCommentToCommentFile(data, newComment);

        const update = await o.request(
          "PUT /repos/{owner}/{repo}/contents/{path}",
          {
            headers: {
              accept: "application/vnd.github.v3+json"
            },
            owner: owner,
            repo: repo,
            path: `comments/${slug}.json`,
            branch: ref,
            message: `Updated comment on post ${slug}`,
            sha,
            content: Buffer.from(JSON.stringify(data), "ascii").toString(
              "base64"
            )
          }
        );

        res.status(200).json(JSON.stringify(update));
        resolve();
      } else {
        const data: ICommentFile = {
          page_name: slug,
          comments: [newComment]
        };


        const update = await o.request(
          "PUT /repos/{owner}/{repo}/contents/{path}",
          {
            headers: {
              accept: "application/vnd.github.v3+json"
            },
            owner: owner,
            repo: repo,
            path: `comments/${slug}.json`,
            branch: ref,
            message: `New comment on post ${slug}`,
            content: Buffer.from(JSON.stringify(data), "ascii").toString(
              "base64"
            )
          }
        );

        res.status(200).json(JSON.stringify(update));
        resolve();
      }
    } catch (e) {
      console.error("generic error enountered from comment/save/[slug] handler", e);
      res.status(503).json(e);
      resolve();
    }
  });
};
export default SaveComment;

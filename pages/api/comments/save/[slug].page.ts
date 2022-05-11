import { Octokit } from "@octokit/core";
import { StatusCodes } from "http-status-codes";
import { createAppAuth } from "@octokit/auth-app";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ICommentFile, ICommentStorage } from "@interfaces/IComment";
import type { Endpoints } from "@octokit/types";
import { getGithubParamsFromEnv } from "@components/Comments/utils";
import { encrypt } from "@lib/encryption/crypto";
import {CommentsRequireApproval} from "@lib/GLOBALS";

type repoContentsRequestResponse =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"];


// not the most efficient way to do this, but it works
function appendCommentToCommentFile(
  commentFile: ICommentFile,
  newComment: ICommentStorage
): ICommentFile {
  const { comments } = commentFile;

  if (newComment.parentCommentId) {
    const parent = comments.find((comment) => comment.id === newComment.parentCommentId);
    if (parent) {
      parent.childrenIds = parent.childrenIds || [];
      if (!parent.childrenIds.includes(newComment.id)) {
        parent.childrenIds.push(newComment.id);
      }
    } else {
      console.warn(`Parent comment ${newComment.parentCommentId} not found`);
    }
  }
  comments.push(newComment);
  return commentFile;
}

let octo: Octokit;
const getOctoInstance = () => {
  if (!octo)
    if (!process.env.GITHUB_PRIV_KEY) console.error("no private key found in env: GITHUB_PRIV_KEY");
  if (!process.env.GITHUB_APP_ID) console.error("no app id found in env: GITHUB_APP_ID");
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
const SaveComment: (req: NextApiRequest, res: NextApiResponse) => Promise<void> = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { owner, repo, ref } = getGithubParamsFromEnv();
  const o = getOctoInstance();
  if (!req.body.content) {
    console.warn("bad request received: comment content empty, rejecting");
    console.log(req.body);
    return new Promise<void>((resolve) => {
      res.status(StatusCodes.UNAUTHORIZED).json({});
      resolve();
    });
  }

  return new Promise(async (resolve) => {
    const newComment: ICommentStorage = {
      approved: CommentsRequireApproval,
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


    const slug = req.body.page_name || req.query.slug;

    try {
      const prevComments: repoContentsRequestResponse | void = await o
        .request("GET /repos/{owner}/{repo}/contents/{path}", {
          headers: {
            accept: "application/vnd.github.v3+json"
          },
          owner: owner,
          repo: repo,
          path: `content/comments/${slug}.json`,
          ref: ref
        })
        .catch((e) => {
          console.error(
            "error encountered while retrieving repo comments with path: comments/%s.json",
            e
          );
          if (e.status !== StatusCodes.NOT_FOUND) throw new Error(e);
        });

      if (prevComments) {
        let data: ICommentFile = JSON.parse(
          // @ts-ignore
          Buffer.from(prevComments.data.content, "base64").toString("ascii")
        );

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

        const update = await o.request("PUT /repos/{owner}/{repo}/contents/{path}", {
          headers: {
            accept: "application/vnd.github.v3+json"
          },
          owner: owner,
          repo: repo,
          path: `content/comments/${slug}.json`,
          branch: ref,
          message: `Updated comment on post ${slug}`,
          sha,
          content: Buffer.from(JSON.stringify(data), "ascii").toString("base64")
        });

        res.status(StatusCodes.OK).json(JSON.stringify(update));
        resolve();
      } else {
        const data: ICommentFile = {
          page_name: slug,
          comments: [newComment]
        };

        const update = await o.request("PUT /repos/{owner}/{repo}/contents/{path}", {
          headers: {
            accept: "application/vnd.github.v3+json"
          },
          owner: owner,
          repo: repo,
          path: `content/comments/${slug}.json`,
          branch: ref,
          message: `New comment on post ${slug}`,
          content: Buffer.from(JSON.stringify(data), "ascii").toString("base64")
        });

        res.status(StatusCodes.OK).json(JSON.stringify(update));
        resolve();
      }
    } catch (e) {
      console.error("generic error encountered from comment/save/[slug] handler", e);
      res.status(StatusCodes.SERVICE_UNAVAILABLE).json(e);
      resolve();
    }
  });
};

// noinspection JSUnusedGlobalSymbols
export default SaveComment;

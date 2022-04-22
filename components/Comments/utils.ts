import fs_sanitize from "sanitize-filename";

export const sanitizeSlug = (slug: string) => fs_sanitize(slug, { replacement: "_" });

// @ts-ignore
export const getGithubParamsFromEnv: () => {
  owner: string;
  ref: string;
  repo: string;
} = () => {
  const err: string[] = [];
  const owner = process.env.GITHUB_OWNER;
  if (!owner) err.push("GITHUB_OWNER env not found");
  const repo = process.env.GITHUB_REPO;
  if (!repo) err.push("GITHUB_REPO env not found");
  const ref = process.env.GITHUB_REF;
  if (!ref) err.push("GITHUB_REF env var not found");

  if (err.length > 0) {
    err.forEach((x) => console.error(x));
  }

  return { owner, repo, ref };
};

// export const getComments = async (slug: string): Promise<Array<IComment> | null> => {
//     const {ref, repo, owner} = getGithubParamsFromEnv()
//     try {
//         const comments = await request(
//             "GET /repos/{owner}/{repo}/contents/{path}",
//             {
//                 headers: {
//                     authorization: `token ${token}`,
//                     accept: "application/vnd.github.v3.raw",
//                 },
//                 owner: owner,
//                 repo: repo,
//                 path: `../../comments/${slug}.json`,
//                 ref: ref,
//             }
//         );
//         return JSON.parse(comments.data as unknown as string);
//     } catch (e) {
//         return null;
//     }
// }

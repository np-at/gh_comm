import {request} from "@octokit/request";
import IComment from "@interfaces/IComment";


export const getGithubParamsFromEnv: () => { owner: string; ref: string; repo: string; token: string } = () => {
    const err: string[] = []
    const token = process.env.GITHUB_TOKEN
    if (!token)
        err.push("GITHUB_TOKEN env not found present")
    const owner = process.env.GITHUB_OWNER
    if (!owner)
        err.push("GITHUB_OWNER env not found")
    const repo = process.env.GITHUB_REPO
    if (!repo)
        err.push("GITHUB_REPO env not found")
    const ref = process.env.GITHUB_REF
    if (!ref)
        err.push("GITHUB_REF env var not found")

    if (err.length > 0) {
        err.forEach(x => console.error(x))
        // throw Error("env params not present")
    }

    return {token, owner, repo, ref}
}

export const getComments = async (slug: string): Promise<Array<IComment> | null> => {
    const {ref, repo, token, owner} = getGithubParamsFromEnv()
    try {
        const comments = await request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
                headers: {
                    authorization: `token ${token}`,
                    accept: "application/vnd.github.v3.raw",
                },
                owner: owner,
                repo: repo,
                path: `../../comments/${slug}.json`,
                ref: ref,
            }
        );
        return JSON.parse(comments.data as unknown as string);
    } catch (e) {
        return null;
    }
}


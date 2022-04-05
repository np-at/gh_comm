import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";
import matter from "gray-matter";


const contentDirectory = path.join(process.cwd(), "content")
export interface HomePageCMSFields {
    picture: string
    date: string;
    title: string;
    body: string;
    tags?: string[];
    slug: string;
    fullPath?: string;
}
export type PageContent = {
    readonly title: string;
    readonly date: string;
    readonly content: string;
    readonly slug: string;
    readonly tags: string[];
    readonly fullPath: string;
    readonly excerpt: string;
    readonly description: string;
    readonly image: string;
}
//let pageCache: { [key: string]: PageContent };
export const getContentFromSlug: (slug: string) => HomePageCMSFields = (slug: string) => {
//    if (pageCache)
//        return pageCache[slug];
    const fullPath = path.join(contentDirectory, slug + ".md");
    const pageData = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(pageData, {
        engines: {
            yaml: (s) => yaml.load(s, {schema: yaml.JSON_SCHEMA}) as object
        }
    });
    const matterData = matterResult.data as HomePageCMSFields

    matterData.fullPath = fullPath
    return matterData;
}

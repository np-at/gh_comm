import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";
import matter from "gray-matter";
import md from "markdown-it";
import { sanitizeSlug } from "@components/Comments/utils";

const contentDirectory_RelativeToRoot = "content";
const contentDirectory_Absolute = path.join(process.cwd(), contentDirectory_RelativeToRoot);

export interface HomePageCMSFields extends ContentPageData {
  picture: string;
  date: string;
  title: string;
  tags?: string[];
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
};

export interface ContentPageData {
  readonly body: string;
  readonly fullPath: string;
  readonly slug: string;
}

export const getContentDirectory = (relativeToRoot: boolean = false): string => relativeToRoot ? contentDirectory_RelativeToRoot : contentDirectory_Absolute;

export const getMarkdownFileContentFromPath = (
  fullPath: string
): { [p: string]: any } | undefined => {
  let pageData: string;
  try {
    pageData = fs.readFileSync(fullPath, "utf8");
  } catch (e) {
    return undefined;
  }

  const matterResult: matter.GrayMatterFile<string> = matter(pageData, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  matterResult.data.fullPath = fullPath;

  matterResult.data.fullPath = fullPath;
  matterResult.data.body = md({
    html: true,
    linkify: true,
    typographer: true,
  }).render(matterResult.content);
  return matterResult.data;
};

export function getMarkdownFileContentFromSlug<T extends ContentPageData>(
  rawSlug: string
) {

  const fsSanitizedSlug = sanitizeSlug(rawSlug) + ".md";
  const fullPath = path.join(contentDirectory_Absolute, fsSanitizedSlug);
  const pageData = getMarkdownFileContentFromPath(fullPath);
  return pageData as T;
}

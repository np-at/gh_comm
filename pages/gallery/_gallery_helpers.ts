import path from "node:path";
import fs from "node:fs";
import { getContentDirectory, getMarkdownFileContentFromPath } from "@lib/pages";
import { GalleryItemProps } from "./GalleryItem";

const contentDir = path.join(getContentDirectory(true), "gallery");
const getGalleryFile = (galleryName: string) => path.join(contentDir, galleryName);
// const getGalleryImage = (galleryName: string, imageName: string) =>
//   path.join(contentDir, "media", imageName);

const getGalleryItem: (galleryName: string) => GalleryItemProps | undefined = (
  galleryName: string
) => {
  const galleryFile = getGalleryFile(galleryName);

  if (fs.existsSync(galleryFile)) {
    // const galleryContent = fs.readFileSync(galleryFile, "utf8");
    return getMarkdownFileContentFromPath(galleryFile) as GalleryItemProps;
  }
  throw Error(`Gallery ${galleryName} not found`);
};

export const getGalleryItems: () => GalleryItemProps[] = () => {
  const galleryFiles = fs.readdirSync(contentDir, {withFileTypes: false, encoding: null});
  // console.warn("galleryfiles",galleryFiles);
  const galleryItems = galleryFiles.map((galleryFile) => getGalleryItem(galleryFile));
  return compactArray(galleryItems);
  // const asdf =  (galleryItems?.filter(galleryItem => !!galleryItem));
  // const aa = galleryItems.filter((galleryItem) => !!galleryItem);
};

const compactArray = <T>(input: Array<T | undefined>): T[] => {
  const output: T[] = [];
  for (const item of input) {
    !!item && output.push(item);
  }
  return output;
};

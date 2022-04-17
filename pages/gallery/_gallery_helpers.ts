import path from "node:path";
import fs from "node:fs";
import { getContentDirectory, getMarkdownFileContentFromPath } from "@lib/serverside_utils/pages";
import { GalleryItemProps } from "./GalleryItem";

const pseudoRandString = (length: number) => {
  const arr = new Uint8Array(length);
  for (let i = 0; i < arr.length; i++) {
    let as;
    while (true) {
      as = Math.floor(Math.random() * 80 + 47);
      if (as < 48) {
        continue;
      } else if (57 < as && as < 65) {
        continue;
      } else if (90 < as && as < 97) {
        continue;
      } else if (122 < as && as < 127) {
        continue;
      }
      break;
    }
    arr[i] = as;
  }
  return String.fromCharCode(...arr);
};
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
    const as = getMarkdownFileContentFromPath(galleryFile) as GalleryItemProps;
    as.id = pseudoRandString(12);
    return as;
  }
  throw Error(`Gallery ${galleryName} not found`);
};

export const getGalleryItems: () => GalleryItemProps[] = () => {
  const galleryFiles = fs.readdirSync(contentDir, { withFileTypes: false, encoding: null });
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

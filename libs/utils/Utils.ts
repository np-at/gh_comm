import { v4 } from "uuid";

export const generateUUID: () => string = () => {
  return v4().toString();
};

export const getEffectiveRoutePath = (__filename: string) => {
  const segments = __filename.split("/");
  const startIdx = segments.findIndex((segment) => segment == "pages");

  // add leading slash to path
  const finalPath = "/" + segments.slice(startIdx + 1).join("/");

  // remove file extension if present
  return finalPath.replace(/\.\S*$/, "");
};

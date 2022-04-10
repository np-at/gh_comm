import path from "node:path";
import { getContentDirectory } from "@lib/pages";
import fs from "node:fs/promises";

export const getHighlightsSourceFiles = async (
  returnFullPath: boolean = false
) => {
  const eventsDirectory = path.join(getContentDirectory(), "events");

  const qualifiedRootPath = returnFullPath
    ? eventsDirectory
    : path.join(getContentDirectory(true), "events");

  const eventFiles = await fs.readdir(eventsDirectory, { encoding: "utf-8" });
  console.warn("eventFiles", eventFiles);
  const timelineEvents: string[] = [];
  for (let i = eventFiles.length - 1; i >= 0; i--) {
    const file = eventFiles[i];
    if (file.endsWith(".md")) {
      timelineEvents.push(path.join(qualifiedRootPath, file));
      // console.log("file", file);
      // const content = (await getMarkdownFileContentFromPath(
      //   path.join(eventsDirectory, file)
      // )) as TimelineEventProps;
      // content && timelineEvents.push(content);
    }
  }
  return timelineEvents;
};
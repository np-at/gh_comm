import { getContentDirectory } from "@lib/serverside_utils/pages";

export const getHighlightsSourceFiles = async (returnFullPath: boolean = false) => {
  const path = await import("node:path");

  const fs = await import("node:fs/promises");

  const eventsDirectory = path.join(getContentDirectory(), "events");

  const qualifiedRootPath = returnFullPath
    ? eventsDirectory
    : path.join(getContentDirectory(true), "events");

  const eventFiles = await fs.readdir(eventsDirectory, { encoding: "utf-8" });
  const timelineEvents: string[] = [];
  for (let i = eventFiles.length - 1; i >= 0; i--) {
    const file = eventFiles[i];
    if (file.endsWith(".md")) {
      timelineEvents.push(path.join(qualifiedRootPath, file));
    }
  }
  return timelineEvents;
};

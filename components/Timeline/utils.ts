import type {
  TimelineItemDistributionProps,
  TimelineItempProps
} from "@components/Timeline/Timeline";

export const calculateSpacing: (
  items: TimelineItemDistributionProps[],
  totalWidth: number,
  startPadding?: number,
  endPadding?: number,
  itemHeight?: number
) => { size: number | null; content?: string; id?: string }[] = (
  items,
  totalWidth,
  startPadding,
  endPadding,
  itemHeight
) => {
  const spacing: { size: number | null; content?: string; id?: string }[] = [];
  const availableSpace: number =
    totalWidth - (startPadding ?? 0) - (endPadding ?? 0) - (itemHeight ?? 0) * items.length;
  // 1 month
  const divheight = (totalWidth - (startPadding ?? 0) - (endPadding ?? 0))  / (Math.max(new Date(items[items.length - 1].date).getTime() - (new Date(items[0].date )).getTime(), 0) / (1000 * 60 * 60 * 24));
  console.log("divheight", divheight);
  // if (startPadding) spacing.push({ size: startPadding });
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (i == 0) {
      if (startPadding) {
        spacing.push({ size: startPadding });
      }
    } else if (i == items.length - 1 && endPadding) spacing.push({ size: endPadding });
    else {
      let currentSpace = 0
      const targetSpacing = (item.distribution - items[i - 1].distribution) * availableSpace;
      while (currentSpace < targetSpacing) {
        currentSpace += divheight;
        spacing.push({ size: divheight });
      }
      // spacing.push({
      //   size: (item.distribution - items[i - 1]?.distribution) * availableSpace
      // });
    }
    spacing.push({ size: itemHeight ?? null, content: item.label, id: item.id });
  }
  if (endPadding) spacing.push({ size: endPadding });
  return spacing;
};

// This is a simple, *insecure* hash that's short, fast, and has no dependencies.
// For algorithmic use, where security isn't needed, it's way simpler than sha1 (and all its deps)
// or similar, and with a short, clean (base 36 alphanumeric) result.
// Loosely based on the Java version; see
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export const simpleHash: (str: string) => string = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return new Uint32Array([hash])[0].toString(36);
};

export const calculateDistribution: (
  items: TimelineItempProps[]
) => TimelineItemDistributionProps[] = (items) => {
  items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const start = new Date(items[0].date).getTime();
  const end = new Date(items[items.length - 1].date).getTime();
  const range = end - start;
  return items.map((item, index) => {
    // let distributionItem: {distribution: number, label: string} = {}
    if (index === 0) {
      return {
        distribution: 0,
        label: item.date,
        id: item.id ?? simpleHash(item.title + item.date),
        title: item.title,
        date: item.date,
        description: item.description
      };
    }
    const dist = (new Date(item.date).getTime() - start) / range;

    return {
      label: item.date,
      distribution: dist,
      id: item.id ?? simpleHash(item.title + item.date),
      title: item.title,
      description: item.description,
      date: item.date
    };
  });
};

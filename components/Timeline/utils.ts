import type { TimelineItemDistributionProps } from "@components/Timeline/Timeline";
import { TimelineItempProps } from "@components/Timeline/TimelineItem";

type CalculateSpacingProps = (
  items: TimelineItemDistributionProps[],
  totalWidth: number,
  startPadding?: number,
  endPadding?: number,
  itemHeight?: number,
  minEventPadding?: number,
  maxEventPadding?: number,
  labelWidth?: number
) => SpacingBlock[];

export enum SpacingType {
  Unlabeled,
  Link,
  Labeled
}

interface SpacingBlock {
  size: number | null;
  content?: string;
  id?: string;
  type: SpacingType;
  key: string;
}
const day: number = 24 * 60 * 60 * 1000;
const week: number = 7 * day;
const month: number = 4 * week;
const year: number = 365 * day;
const divTimeIncrement = (timeSpanTotal: number) => {
  if (timeSpanTotal < 9 * month) {
    return day;
  }
  if (timeSpanTotal < 1.5 * year) {
    return week;
  }
  if (timeSpanTotal < 3 * year) {
    return month;
  }
  return year;
};
// Calculate the spacing between each item
export const calculateSpacing: CalculateSpacingProps = (
  items,
  totalHeight,
  startPadding,
  endPadding,
  itemHeight,
  _minEventPadding,
  _maxEventPadding,
  _labelWidth
) => {
  let keyCounter = 0;
  const nextKey: () => string = () => {
    keyCounter++;
    return `sp-${keyCounter}`;
  }
  const spacing: SpacingBlock[] = [];
  const availableSpace: number =
    totalHeight - (startPadding ?? 0) - (endPadding ?? 0) - (itemHeight ?? 0) * items.length;
  // 1 month


  const timeSpan = Math.max(
    new Date(items[items.length - 1].date).getTime() - new Date(items[0].date).getTime(),
    1
  );
  const divheight =
    (totalHeight - (startPadding ?? 0) - (endPadding ?? 0)) /
    (timeSpan / divTimeIncrement(timeSpan));

  const padSpace = (size: number) => {
    let currentSpace = 0;
    while (currentSpace < size) {
      const remaining = size - currentSpace;
      if (remaining < divheight) {
        spacing.push({ size: remaining, type: SpacingType.Unlabeled, key: nextKey() });
        break;
      }
      spacing.push({ size: divheight, type: SpacingType.Unlabeled, key: nextKey() });
      currentSpace += divheight;
    }
  };
  if (startPadding) padSpace(startPadding);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const targetSpacing = (item.distribution - (items[i - 1]?.distribution ?? 0)) * availableSpace;

    padSpace(targetSpacing);

    spacing.push({
      size: itemHeight ?? null,
      content: item.label,
      id: item.id,
      type: SpacingType.Link,
      key: nextKey()
    });
  }
  if (endPadding) padSpace(endPadding);
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

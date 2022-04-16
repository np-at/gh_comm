import type { IComment } from "@interfaces/IComment";

export const CompareCommentLists: (a: IComment[], b: IComment[]) => (boolean) = (a: IComment[], b: IComment[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    const aComment = a[i];
    const bComment = b[i];
    if (aComment.id !== bComment.id) {
      return false;
    }
    if (aComment.children && bComment.children) {
      if (aComment.children?.length !== bComment.children?.length) return false;
      if (!CompareCommentLists(aComment.children, bComment.children)) {
        return false;
      }
    }
  }

  return true;
};

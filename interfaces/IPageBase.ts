import { IComment } from "@interfaces/IComment";

export interface IPageBase {
  comments?: IComment[] | null;
}
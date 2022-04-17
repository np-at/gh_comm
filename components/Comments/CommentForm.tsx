import { type FieldErrors, type SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import React from "react";
import type { IComment } from "@interfaces/IComment";
import RowDiv from "@components/Layout/Row";

export const CommentForm: React.FC<{
  handleSubmit: UseFormHandleSubmit<IComment>;
  onSubmit: SubmitHandler<IComment>;
  register: any;
  errors: FieldErrors<IComment>;
  parentSlug: string;
  parentCommentId?: string;
}> = (p) => {
  //    const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = event => {
  //      console.warn("handleFormSubmission",event);
  //        event.preventDefault();
  //        p.handleSubmit(p.onSubmit);
  //    };

  return (
    <form
      action={`/api/comments/save/${p.parentSlug}`}
      method={"POST"}
      onSubmit={p.handleSubmit(p.onSubmit, (errors1, event) => console.error(errors1, event))}>
      <RowDiv>
        <label>
          <span>Display Name</span>
          <input
            type={"text"}
            name={"username"}
            {...p.register("username", { required: true })}
            defaultValue={""}
          />
        </label>
      </RowDiv>
      <RowDiv>
        <label>
          Your Email
          <input type={"email"} {...p.register("email")} />
        </label>
      </RowDiv>
      <RowDiv>
        <label>
          Comment{" "}
          <textarea
            {...p.register("content", {
              required: true,
              min: 1,
              maxLength: 1000
            })}
          />
        </label>
      </RowDiv>
      <input
        type={"text"}
        {...p.register("parentCommentId")}
        value={p.parentCommentId}
        hidden
        readOnly={true}
      />
      <input
        type={"text"}
        name={"page_name"}
        value={p.parentSlug}
        hidden
        readOnly={true}
        {...p.register("page_name")}
      />
      <RowDiv>
        <input type={"submit"} value={"Submit"} />
      </RowDiv>
      {/*<input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />*/}
      {/*<input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />*/}
      {/*<input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />*/}
      {/*<input type="tel" placeholder="Mobile number" {...register("Mobile number", {*/}
      {/*    required: true,*/}
      {/*    minLength: 6,*/}
      {/*    maxLength: 12*/}
      {/*})} />*/}

      {/*<input type="submit"/>*/}
    </form>
  );
};

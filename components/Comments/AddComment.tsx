import { useState } from "react";
import {  useForm } from "react-hook-form";
import type { SubmitHandler} from "react-hook-form";
import { generateUUID } from "@lib/universal_utils/Utils";
import { CommentForm } from "@components/Comments/CommentForm";
import type { IComment } from "@interfaces/IComment";

export default function AddComment({
  slug,
  parentCommentId
}: {
  slug: string;
  parentCommentId?: string;
}): JSX.Element {
  const [commentSent, setCommentSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<IComment>();

  function sendData(data: IComment) {
    setIsLoading(true);

    // Prepare the new comment data
    const newComment: IComment = {
      page_name: slug,
      date: new Date(), // p
      parentCommentId: parentCommentId || null, // If this new comment has a parent, put the id here
      id: generateUUID(), // generate the unique id here however you want
      username: data.username || "Anonymous",
      email: data.email,
      content: data.content,
      children: [],
      childrenIds: null
    };

    // Send the new comment to an API endpoint we'll build later. It's important to pass the slug parameter and I'm doing that with a path parameter
    fetch(`/api/comments/save/${slug}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newComment)
    })
      .then((res) => {
        if (res.ok) {
          // IComment was sent
          setCommentSent(true);
          setIsLoading(false);
          methods.reset({ username: "", email: undefined, content: "" });
        }
      })
      .catch(() => {
        setCommentSent(true);
        setIsLoading(false);
        // handle the error
      });
  }

  const onSubmit: SubmitHandler<IComment> = (data) => {
    console.log("data: ", data);
    sendData(data);
  };

  return (
    <>
      {!isLoading && !commentSent && (
        <CommentForm
          parentCommentId={parentCommentId}
          parentSlug={slug}
          onSubmit={onSubmit}
          register={methods.register}
          handleSubmit={methods.handleSubmit}
          errors={methods.formState.errors}
        />
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
}

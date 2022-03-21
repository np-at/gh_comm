import {useState} from "react";
import {SubmitHandler, useForm,} from "react-hook-form";
import {generateUUID} from "@lib/utils/Utils";
import {CommentForm} from "@components/Comments/CommentForm";
import IComment from "@interfaces/IComment";



export default function AddComment({
                                       slug,
                                       parentCommentId,
                                   }: {
    slug: string;
    parentCommentId?: string;
}): JSX.Element {
    const [commentSent, setCommentSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IComment>();

    function sendData(data: IComment) {
        setIsLoading(true);

        // Prepare the new comment data
        const newComment: IComment = {
            date: new Date(), // p
            parentCommentId: parentCommentId || undefined, // If this new comment has a parent, put the id here
            id: generateUUID(), // generate the unique id here however you want
            username: data.username || "Anonymous",
            email: data.email,
            content: data.content,
            children: [],
        };

        // Send the new comment to an API endpoint we'll build later. It's important to pass the slug parameter and I'm doing that with a path parameter
        fetch(`/api/comments/save/${slug}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
            .then((res) => {
                if (res.ok) {
                    // IComment was sent
                    setCommentSent(true);
                    setIsLoading(false);
                    reset({username: "", email: undefined, content: ""});
                }
            })
            .catch(() => {
                setCommentSent(true);
                setIsLoading(false);
                // handle the error
            });
    }

    const onSubmit: SubmitHandler<IComment> = (data) => sendData(data);

    return (
        <>
        {!isLoading && !commentSent && (
            <CommentForm
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
            />
        )}
        {isLoading && (
            <p>Loading...</p>
        )}
        </>
    );
}
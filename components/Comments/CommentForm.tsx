import {
    FieldErrors,
    SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister,


} from "react-hook-form";
import React from "react";
import IComment from "@interfaces/IComment";

export const CommentForm: React.FC<{handleSubmit: UseFormHandleSubmit<IComment>, onSubmit: SubmitHandler<IComment>, register: UseFormRegister<IComment>, errors: FieldErrors<IComment>}> = p => {
    const { formState: {errors}} = useForm<IComment>();
    // const onSubmit = (data: any) => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={p.handleSubmit(p.onSubmit)}>
            <input type={"text"} placeholder={""} />
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
import IComment from "@interfaces/IComment";
import path from "path";
import {readFileSync} from "fs";

export const getCommentsFromStatic: (slug: string) => Promise<IComment[] | null> = async (slug:string) => {
    const  p= path.join(process.cwd(), 'comments', `${slug}.json`)
    try {
        const commentPageJson =  readFileSync(p)
        return JSON.parse(commentPageJson.toString('utf8')) as (IComment[] | null)
    } catch (e) {
        return null
    }
}

export const getCommentsFromStaticSync: (slug: string) => IComment[] | null = (slug:string) => {
    const  p= path.join(process.cwd(), 'comments', `${slug}.json`)
    try {
        const commentPageJson =  readFileSync(p)
        return JSON.parse(commentPageJson.toString('utf8')) as (IComment[] | null)
    } catch (e) {
        return null
    }
}
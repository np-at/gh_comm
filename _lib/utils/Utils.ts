import {randomUUID} from "crypto";


export const generateUUID: () => string = ()=>{
    return randomUUID({disableEntropyCache: false})
}
export const getKey: () => string = () => {
    return ""
}
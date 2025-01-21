import { Follow, Request } from "../../generated";
export type StatusType=Follow | Request | null
export const statusBooleanConverter=({arg}:{arg:StatusType[]})=>{
    const following = arg[0] ? true : false;
    const incomingRequest = arg[1] ? true : false;
    const outgoingRequest = arg[2] ? true : false;
    return (
        {
            following,
            incomingRequest,
            outgoingRequest
        }
    )
   
}
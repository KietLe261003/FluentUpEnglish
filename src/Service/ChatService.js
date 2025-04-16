import { request } from "../Config/Request"

export const ChatService ={
    generateChat: async(message)=>{
        const res = await request.get(`/gemini/generate/${message}`);
        return res.data;
    }
}
import { get, post, put } from "../untils/request";
export const gettags = async (id) => {
    const result = await get(`/tags/${id}`);
    return result;
}
export const posttags = async (id, body) => {
    const result = await post(id, body);
    return result;
}
export const puttags = async (id, body) => {
    const result = await put(id, body);
    return result;
}
export const getalltags = async () => {
    const result = await get("/tags");
    return result;
}
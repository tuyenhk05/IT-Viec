import { get, post, put } from "../untils/request";
export const getnew = async (id) => {
    const result = await get(`/news/${id}`);
    return result;
}
export const postnew = async (id, body) => {
    const result = await post(id, body);
    return result;
}
export const putnew = async (id, body) => {
    const result = await put(id, body);
    return result;
}
export const getallnew = async () => {
    const result = await get("/news");
    return result;
}
export const gettagsnews = async (tag) => {
    const result = await get(`/tag/${tag}`);
    return result;
}
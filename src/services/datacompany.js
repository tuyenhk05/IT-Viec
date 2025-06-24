import { get, post, put } from "../untils/request";
export const getcompany = async (id) => {
    const result = await get(`/company/${id}`);
    return result;
}
export const postcompany = async (id, body) => {
    const result = await post(id, body);
    return result;
}
export const putcompany = async (id, body) => {
    const result = await put(`/company/${id}`, body);
    return result;
}
export const getallcompany = async () => {
    const result = await get("/company");
    return result;
}
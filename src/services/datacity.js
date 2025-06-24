import { get, post, put } from "../untils/request";
export const getcity = async (id) => {
    const result = await get(`/city/${id}`);
    return result;
}
export const postcity= async (id, body) => {
    const result = await post(id, body);
    return result;
}
export const putcity = async (id, body) => {
    const result = await put(id, body);
    return result;
}
export const getallcity = async () => {
    const result = await get("/city");
    return result;
}
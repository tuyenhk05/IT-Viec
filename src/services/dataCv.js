import { get, post, put,del } from "../untils/request";

export const getcv = async (id) => {
    const result = await get(`/cv/${id}`);
    return result;
}

export const postcv = async (id, body) => {
    const result = await post(`/cv`, body);  // Updated API path for CV submission
    return result;
}

export const putcv = async (id, body) => {
    const result = await put(`/cv/${id}`, body);
    return result;
}

export const getallcv = async () => {
    const result = await get("/cv");
    return result;
}
export const delcv = async (id) => {
    const result = await del(`/cv/${id}`);
    return result;
}

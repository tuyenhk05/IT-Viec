import { get, post, put,del } from "../untils/request";
export const getjob = async (id) => {
    const result = await get(`/jobs/${id}`);
    return result;
}
export const postjob = async (body) => {
    const result = await post(`/jobs`, body);
    return result;
}
export const putjob = async (id, body) => {
    const result = await put(`/jobs/${id}`, body);
    return result;
}
export const getalljob = async () => {
    const result = await get("/jobs");
    return result;
}
export const gettagsjob = async (tags) => {
    const result = await get(`/jobs?q=${tags}`);
    return result;
}
export const getalljobb = async (page) => {
    const result = await get(`/jobs?_page=${page}&_limit=6&status=true`);
    return result;
}
export const delJob = async (path) => {
    const result = await del(`/jobs/${path}`);
    return result;
}
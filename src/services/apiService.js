import api from "../api/api";

export const parsePipeline = async (payload) => {
    const response = await api.post("/pipelines/parse", payload); 
    return response;
};
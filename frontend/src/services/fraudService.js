import api from "./api";

export const predictFraud=(data)=>api.post("/predict",data);

export const getHistory=()=>api.get("/history");
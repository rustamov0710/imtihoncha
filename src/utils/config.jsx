import axios from "axios";
export const API = axios.create({
    baseURL: "https://project-5fa23-default-rtdb.firebaseio.com/",
    headers: { "Content-Type": "application/json" },
});
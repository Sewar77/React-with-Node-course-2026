import axios from "axios";

const api = axios.create({
    baseURL: "https://react-with-node-course-2026.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export default api;
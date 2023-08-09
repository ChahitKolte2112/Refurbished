import { axiosInstance } from "./axiosinstance";
import axios from "axios";
const API_URL = axios.create({ baseURL: "http://localhost:5000" });
export const RegisterUser = async (payload) => {
    try {
        const response = await API_URL.post("/api/users/signup", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const LoginUser = async (payload) => {
    try {
        const response = await API_URL.post("/api/users/login", payload);

        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const GetCurrentUser = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "tokenRefurbised"
                )}`,
            },
        };

        const response = await API_URL.get(
            "/api/users/get-current-user",
            config
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

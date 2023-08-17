import axios from "axios";
const API_URL = axios.create({ baseURL: "http://localhost:5000" });
export const AddProduct = async (payload) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "tokenRefurbised"
                )}`,
            },
        };
        const response = await API_URL.post(
            "/api/products/add-product",
            payload,
            config
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const GetallProducts = async () => {
    try {
        const response = await API_URL.get("/api/products/get-product");
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const EditProducts = async (payload) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "tokenRefurbised"
                )}`,
            },
        };
        const response = await API_URL.put(
            `/api/products/edit-product/${payload._id}`,
            payload,
            config
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};
export const DeleteProducts = async (id) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "tokenRefurbised"
                )}`,
            },
        };

        const response = await API_URL.delete(`/api/products/delete-product/${id}`, config);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

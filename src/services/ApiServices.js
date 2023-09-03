import axios from "axios";

const base_url = "http://localhost:9000";
const token = sessionStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const postRequest = async (path, data) => {
    try {
        const response = await axios.post(base_url+path, data);
        return response;
    } catch (error) {
        if(error.response.status === 401){
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("id");
            window.location.href="/login"
        }
    }
}
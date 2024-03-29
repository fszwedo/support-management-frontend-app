import axios, { AxiosResponse } from "axios";

export const getUserFromLocalStorage = () => {
    const userId = localStorage.getItem("id");
    const userToken = localStorage.getItem("token");
    const userType = localStorage.getItem("type");

    return { userId, userToken, userType };
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("type");
};

export const saveUserDataToLocalStorage = (response: AxiosResponse) => {
    localStorage.setItem('type', response.data.type);
    localStorage.setItem('id', response.data._id);
    localStorage.setItem('token', response.headers?.["x-auth-token"]);
    axios.defaults.headers.common = {'x-auth-token': response.headers?.["x-auth-token"]};
}
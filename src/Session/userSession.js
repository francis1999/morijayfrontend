import { useState } from "react";


export const getUser = () => {
    //const userStr = sessionStorage.getItem("data");
    const userStr = localStorage.getItem("data");
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    const pickToken=localStorage.getItem("accessToken");
    const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${pickToken}`
    };
    console.log(headers)
    
}

export const setUserSession = (accessToken, data) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("data", JSON.stringify(data));
}
export const removeUserSession = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("data");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("data");
}
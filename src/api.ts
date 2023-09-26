import axios from "axios";
import {QueryFunctionContext} from "@tanstack/react-query"
import Cookie from "js-cookie"
import { ICampingForm, ISignInForm, ISignUpForm, imageUploadDBparams, uploadCloudFlareRequest } from "./type";



const instance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
});


export const getCampgroundall = async () => {
    return await instance.get("campgrounds/").then((response) => {

        return response.data
    })
}

export const getCampground = async ({queryKey}:QueryFunctionContext) => {
    const [_, id] = queryKey
    return await instance.get(`campgrounds/${id}`).then((res) => {
        return res.data
    })
}

export const emailSignUp = async (variables:ISignUpForm) => {
    return await instance.post("users/signup", variables, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }).then((res)=>{
        return res.data
    }).catch((error)=>{

        return Promise.reject(error.response.data);
})
}

export const getMe = async () => {
    return await instance.get("users/me").then((res) => res.data).catch((error)=>{
        return Promise.reject(error.response.data);
    })
}

export const emailSignIn = async ({email, password}:ISignInForm) => {
    return await instance.post("users/signin", {email, password}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }).then((res)=>{
        return res.data
    })
}

export const createCampground = async (variables:ICampingForm) => {
    return await instance.post("campgrounds/", variables, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }).then((res) => {
        return res.data
    }).catch((error)=>{
        return Promise.reject(error.response.data)
    })
}

export const getOneTimeUrl = async () => {
    return await instance.post("campgrounds/image/one-time-upload", null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken")
        }
    }).then((res)=>{
        return res.data
    })
}

export const uploadCloudFlare = async ({file, uploadURL}:uploadCloudFlareRequest) => {
    const form = new FormData();
    form.append("file", file)
    return await axios.post(uploadURL, form, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookie.get("csrftoken")
        }
    }).then((res) => {
        return res.data
    }).catch((error)=>console.log("error: ", error))
    
}

export const imageUploadDB = async ({id, file}:imageUploadDBparams) => {
    return await instance.post(`campgrounds/${id}/image/upload`, {id, file}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken")
        }
    }).then((res) => {
        return res.data
    })
}


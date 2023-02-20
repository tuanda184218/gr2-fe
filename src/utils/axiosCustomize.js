import axios from "axios";
import { NProgress } from "nprogress";
import { store } from "../redux/store";

const instance = axios.create({
    API_URL: "http://localhost:8085/",
});

// add a request interceptor
instance.interceptors.request.use(function (config){
    const token = store?.getState()?.user?.account?.accessToken;
    config.headers["Authorization"] = "Bearer " + token;
    NProgress.start();
    return config;
}, function (error){
    return Promise.reject(error);
})

// add a response interceptor
instance.interceptors.response.use(function(response){
    NProgress.done();
    return response && response.data ? response.data : response;
},function(error){
    return error && error.response && error.response.data ? 
    error.response.data : Promise.reject(error);
})

export default instance;
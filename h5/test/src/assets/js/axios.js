import Vue from 'vue'
import axios from 'axios'

let interceptorsRequest = (req) => {
    return req;
}

let interceptorsResponse = (res) => {
    return (res);
}

let errRes = (err) => {
    return err;
}

let Axios = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",   // application/json

    },
    transfromRequest: [
        function (req) {
            return req
        }
    ],
    transfromResponse: [
        function (res) {
            console.log(res)
            return res
        }
    ],
})

// 请求拦截器
Axios.interceptors.request.use(interceptorsRequest, errRes);
// 响应拦截器
Axios.interceptors.response.use(interceptorsResponse, errRes)

Vue.prototype.$axios = Axios
export default Axios;
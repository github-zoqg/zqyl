import axios from "axios"

//更改axios默认配置
Object.assign(axios.defaults,{
    baseUrl:"/",
    headers:{
        "Content-Type":"application/x-www-from-urlencoded"
    },
    transformResponse:[function(data){
        let jsonData=JSON.parse(data);
        if(jsonData.state==100){
            window.location="http://www.test.com";
        }else{
            return jsonData;
        }
    }]
})



//添加请求拦截器
axios.interceptors.request.use(config=>{
    config.headers["Authorzition"]="zoqg";
    return config;
},err=>{
    return Promise.reject(err);
})


//添加相应拦截器
axios.interceptors.response.use(response=>{
    return response
},err=>{
    return Promise.reject(err)
})


export default axios;
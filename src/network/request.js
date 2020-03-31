import axios from "axios"

export function request(config){
    //1.创建axios的实例
    const instance = axios.create({
        baseURL:"http://123.207.32.32:8000",
        timeout:5000
    })
    //2.axios的拦截器
    //2.1请求拦截
    // instance.interceptors.request.use(config => {
    //     console.log(config);
    //     /**
    //      * 为什么要使用请求拦截器
    //      * 1.比如config中的一些信息不符合服务器的要求
    //      * 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标(很多页面中间在请求时，有个图标在转)
    //      * 3.某些网络请求(比如登录(token),必须携带一些特殊的信息，如果没携带，跳转到相应页面重新登录等)
    //      */
    //     return config
    // },err => {
    //     console.log(err)
    // })
    //2.2响应拦截
    // instance.interceptors.response.use(res => {
    //     console.log(res)
    // },err => {
    //     console.log(err)
    // })
    // instance.interceptors.reponse.use(res=>{
    //     console.log(res)
    // },err=>{
    //     console.log(err)
    // })
    //3.发送真正的网络请求
    //这个函数instance本身返回Promise,所以可以在调用这个函数的其它中直接.then
    return instance(config)
}
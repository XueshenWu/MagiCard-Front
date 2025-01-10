import { message } from "../components/Message.js";

import { router } from "../main.js";
import fetchMock from "./fetch-mock.js";
import { Crisp } from "crisp-sdk-web";




const mock = false





const get = async (url, params, token = true) => {

    if (token === true && !localStorage.getItem('token')) {
        message.error("请先登录")
        router.replace("/login")
        return { err: true, data: null }
    }

    try {

        const headers = {
            "Content-Type": "application/json",
            "Authorization": token ? localStorage.getItem('token') : "",
            "Platform":"h5"
        }

        const url_with_params = withParams(url, params)
        const resp = await fetch(url_with_params, {
            method: "GET",
            headers,
        })
        console.log(`
            ---------------GET Request----------------
            url: ${url_with_params},
            headers: ${JSON.stringify(headers)},
            -------------------------------------------
            `)

        const res = await resp.json()

        console.log(`
            ---------------GET Response----------------
            code: ${res.code},
            data: ${JSON.stringify(res)},
            -------------------------------------------
            `)

        switch (res.code) {
            case 200:
                return { err: false, ...res }
            case 401:
                message.error("请先登录")
                localStorage.removeItem('token')
                Crisp.session.reset();
                router.replace("/login")
                window.location.reload()
                return { err: true, data: null }
                
                break
            case 404:
                message.error("请求的地址不存在")
                router.replace('/')
                return { err: true, data: null }
                
                break
            case 500:
                message.error(res.msg)
                return { err: true, data: null }
                break
            
            default:
                message.error('出现未知错误，请稍后再试')
                return { err: true, data: null }
        }

    } catch (error) {
        message.error("网络错误")
        return { err: true, data: null }
    }
}

const get_mock = async (url, params, token = true) => {

    if (token === true && !localStorage.getItem('token')) {
        message.error("请先登录")
        router.replace("/login")
        return
    }

    try {
        const resp = await fetchMock(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? localStorage.getItem('token') : ""
            },
        })

        const data = await resp.json()
        switch (data.code) {
            case 200:
                return { err: false, ...data }
            case 401:
                message.error("请先登录")
                router.replace("/login")
                break
            case 404:
                message.error("请求的地址不存在")
                router.replace('/')
                break
            default:
                message.error('出现未知错误，请稍后再试')
                return { err: true, data: null }
        }

    } catch (error) {
        message.error("网络错误")
        return { err: true, data: null }
    }
}


function withParams(url, params) {
    if(!params) return url

    
    const searchParams = new URLSearchParams();

    for (const [key, value] of params) {
        searchParams.append(key, value);
    }

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
}


export default mock ? get_mock : get
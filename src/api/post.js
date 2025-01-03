import { message } from "../components/Message.js";
import { tokenStore } from "../states/tokenStore.js";
import { useRouter } from "vue-router";

const router = useRouter()

export default async (url, body, token = true) => {

    if (token === true && !tokenStore.value.token) {
        message.error("请先登录")
        router.replace("/login")
        return
    }

    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? tokenStore.value.token : ""
            },
            body: JSON.stringify(body)
        })

        const data = await resp.json()
        switch(data.code){
            case 200:
                return {err:false, data}
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
                return {err:true, data:null}
        }

    } catch (error) {
        message.error("网络错误")
        return {err:true, data:null}
    }
}
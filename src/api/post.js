import { message } from "../components/Message.js";
import { router } from "../main.js";
import fetchMock from "./fetch-mock.js";

const mock = false;
const TIMEOUT = 60000; // 超时时间，单位：毫秒（这里设置为10秒）

const post = async (url, body, token = true) => {
    if (token === true && !localStorage.getItem('token')) {
        message.error("请先登录");
        router.replace("/login");
        return { err: true, data: null };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, TIMEOUT);

    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": token ? localStorage.getItem('token') : ""
        };

        const resp = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        console.log(`
            ---------------POST Request----------------
            url: ${url},
            body: ${JSON.stringify(body)},
            headers: ${JSON.stringify(headers)},
            -------------------------------------------
            `);

        const res = await resp.json();

        console.log(`
            ---------------POST Response----------------
            code: ${res.code},
            data: ${JSON.stringify(res)},
            -------------------------------------------
            `);

        switch (res.code) {
            case 200:
                return { err: false, ...res };
            case 401:
                message.error("请先登录");
                router.replace("/login");
                return { err: true, data: null };
            case 404:
                message.error("请求的地址不存在");
                router.replace('/');
                return { err: true, data: null };
            case 500:
                message.error(res.msg);
                return { err: true, data: null };
            default:
                message.error('出现未知错误，请稍后再试');
                return { err: true, data: null };
        }

    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            message.error("请求超时，请稍后再试");
        } else {
            message.error("网络错误");
        }
        return { err: true, data: null };
    }
};

const post_mock = async (url, body, token = true) => {
    if (token === true && !localStorage.getItem('token')) {
        message.error("请先登录");
        router.replace("/login");
        return { err: true, data: null };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, TIMEOUT);

    try {
        const resp = await fetchMock(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? localStorage.getItem('token') : ""
            },
            body: JSON.stringify(body),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await resp.json();
        switch (data.code) {
            case 200:
                return { err: false, ...data };
            case 401:
                message.error("请先登录");
                router.replace("/login");
                break;
            case 404:
                message.error("请求的地址不存在");
                router.replace('/');
                break;
            default:
                message.error('出现未知错误，请稍后再试');
                return { err: true, data: null };
        }

    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            message.error("请求超时，请稍后再试");
        } else {
            message.error("网络错误");
        }
        return { err: true, data: null };
    }
};

export default mock ? post_mock : post;

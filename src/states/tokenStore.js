
import { ref } from "vue"

/**
 * @typedef {Object} tokenStore
 * @property {string} token
 * @property {function} setToken
 */

const tokenStore = ref({
    token:localStorage.getItem('token')??true,
    setToken(token){
        this.token = token
        localStorage.setItem('token',token)
    },
})

export {tokenStore}
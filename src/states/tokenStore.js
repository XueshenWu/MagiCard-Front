
import { ref } from "vue"

/**
 * @typedef {Object} tokenStore
 * @property {string} token
 * @property {function} setToken
 */

const tokenStore = ref({
    token:"token",
    setToken(token){
        this.token = token
        localStorage.setItem('token',token)
    },
})

export {tokenStore}
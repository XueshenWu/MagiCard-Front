
import { reactive, ref } from "vue"




const loginModalOpen = ref(false)




const modalStore = reactive({
    loginModalOpen:false,
    setLoginModalOpen: (value) => {
        loginModalOpen.value = value
    },
    registerRefId: null,
    loginModalFirstOpen:false
})

export {modalStore}
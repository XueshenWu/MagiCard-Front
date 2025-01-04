
const BASE_URL = 'http://192.168.193.75:8085';


const URL = {
    user:{
        verifyPassword:`${BASE_URL}/v1/user/verifyPassword`,
        smsLogin:`${BASE_URL}/v1/user/smsLogin`,
        smsCode:`${BASE_URL}/v1/user/smsCode`,
        resetPaymentPassword:`${BASE_URL}/v1/user/resetPaymentPassword`,
        resetLoginPassword:`${BASE_URL}/v1/user/resetLoginPassword`,
        requestStatement:`${BASE_URL}/v1/user/requestStatement`,
        register:`${BASE_URL}/v1/user/register`,
        passwordLogin:`${BASE_URL}/v1/user/passwordLogin`,
        modifyPhoneNumber:`${BASE_URL}/v1/user/modifyPhoneNumber`,
        modifyEmail:`${BASE_URL}/v1/user/modifyEmail`,
        checkCurrentNumber:`${BASE_URL}/v1/user/checkCurrentNumber`,
        userInfo:`${BASE_URL}/v1/user/userInfo`,
    },
    invitation:{
        summary:`${BASE_URL}/v1/invitation/summary`,
        invitationList:`${BASE_URL}/v1/invitation/List`,
    }
}

export default URL;
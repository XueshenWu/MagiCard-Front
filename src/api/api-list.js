
const BASE_URL = 'http://192.168.193.75:8085';
// const BASE_URL = 'http://3.86.106.168:8085';


const URL = {
    base: BASE_URL,
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
        requestStatement:`${BASE_URL}/v1/user/requestStatement`,
    },
    invitation:{
        summary:`${BASE_URL}/v1/invitation/summary`,
        invitationList:`${BASE_URL}/v1/invitation/List`,
        changeInvitationCode:`${BASE_URL}/v1/invitation/changeInvitationCode`,
    },
    card:{
        cardList: `${BASE_URL}/v1/card/list`,
        cardInfo: `${BASE_URL}/v1/card/info`,
        verifyPassword: `${BASE_URL}/v1/card/verifyPassword`,
        rechargeFee: `${BASE_URL}/v1/card/rechargeFee`,
    },
    transaction:{
        summary: `${BASE_URL}/v1/transaction/summary`,
        card: `${BASE_URL}/v1/transaction/card`,
        all: `${BASE_URL}/v1/transaction/all`,
    },
    payment:{
        openCardPayment:`${BASE_URL}/v1/payment/openCardPayment`,
        rechargePayment:`${BASE_URL}/v1/payment/rechargePayment`,
    }
}

export default URL;
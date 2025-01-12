// local
const BASE_URL = 'http://192.168.193.75:8085';
const FRONTEND_URL = 'http://localhost:5173'

// // public
// const BASE_URL = 'http://43.199.192.103:8085';
// const FRONTEND_URL = 'http://43.199.192.103'


// // test
// const BASE_URL = 'http://192.168.193.75:8085';
// const FRONTEND_URL = 'http://localhost:5173'


const URL = {
    base: BASE_URL,
    frontend:FRONTEND_URL,
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
        rewardRequest:`${BASE_URL}/v1/invitation/reward/request`,
    },
    card:{
        cardList: `${BASE_URL}/v1/card/list`,
        cardInfo: `${BASE_URL}/v1/card/info`,
        verifyPassword: `${BASE_URL}/v1/card/verifyPassword`,
        rechargeFee: `${BASE_URL}/v1/card/rechargeFee`,
        freeze: `${BASE_URL}/v1/card/freeze`,
        delete: `${BASE_URL}/v1/card/delete`,
        create: `${BASE_URL}/v1/card/create`,
        recharge: `${BASE_URL}/v1/card/recharge`,
        unfreeze: `${BASE_URL}/v1/card/unfreeze`,
        withdrawl: `${BASE_URL}/v1/card/withdrew`,
        verifyPaymentPassword: `${BASE_URL}/v1/card/verifyPaymentPwd`,
        parentInviteCode: `${BASE_URL}/v1/card/parentInviteCode`,
        changeInviteRelation: `${BASE_URL}/v1/card/changeInviteRelation`,
    },
    transaction:{
        summary: `${BASE_URL}/v1/transaction/summary`,
        card: `${BASE_URL}/v1/transaction/card`,
        all: `${BASE_URL}/v1/transaction/all`,
    },
    payment:{
        openCardPayment:`${BASE_URL}/v1/payment/openCardPayment`,
        rechargePayment:`${BASE_URL}/v1/payment/rechargePayment`,
        unfreezePayment:`${BASE_URL}/v1/payment/unfreezePayment`,
        checkOrderStatus:`${BASE_URL}/v1/payment/checkOrderStatus`,
    }
}

export default URL;
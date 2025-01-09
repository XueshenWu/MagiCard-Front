<script setup>
import { Dropdown, Menu, MenuItem, MenuDivider, Modal, Spin, QRCode } from 'ant-design-vue';
import { inject, ref, nextTick, watch } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message';
import { useI18n } from 'vue-i18n';
import URL from '../../api/api-list';
import get from '../../api/get';
import post from '../../api/post';



const reqPending = ref(false);



const { t } = useI18n();
const { cardId, balance, cardStatus } = defineProps({
    cardId: {
        type: String,
        required: true
    },
    balance: {
        type: String,
        required: true
    },
    cardStatus: {
        type: String,
        required: true
    }
})

const updateCardData = inject('updateCardData');
const updateCardList = inject('updateCardList');


const openFreezeModal = ref(false);
const openDeleteModal = ref(false);
const openRecoverModal = defineModel('openRecoverModal')




const handleDeleteCard = () => {
    if (parseFloat(balance) > 1) {
        message.error(t('message.cardOptions.deleteCard.error'))
        return
    }
    openDeleteModal.value = true
}

const isPolling = ref(false)


const pollingClass = ref('bg-slate-200 cursor-not-allowed')


const pollPaymentStatus = () => {

    if (paymentInfo.value === null) {
        return
    } else {
        isPolling.value = true;


            (new Promise((resolve, reject) => {
                const timeoutJob = async () => {
                    
                    if(openRecoverModal.value === false){
                        reject()
                        return
                    }


                    const res = await post(URL.payment.checkOrderStatus, { data: paymentInfo.value.outOrderId }, true)
                  

                    if (res.err) {
                   
                        isPolling.value = false
                        reject()
                    }

                    const fulfilled = res.data === 2
                

                    if (fulfilled) {
                 
                        const unfreezeRes = await post(URL.card.unfreeze, {
                            cardId: cardId,
                            outOrderId: paymentInfo.value.outOrderId
                        })
         

                        try {
                            if (unfreezeRes.err) {
                                console.log('About to reject')
                                reject()
                                console.log('After reject')
                            } else {
                                console.log('About to resolve with:', unfreezeRes.data)
                                resolve(unfreezeRes.data)
                                console.log('After resolve')
                            }
                        } catch (e) {
                            console.log('Error during resolve/reject:', e)
                        }
                    } else {
                        console.log('Setting next timeout')
                        setTimeout(timeoutJob, 3000)
                    }
                }

                timeoutJob()
            }))
            .then((data) => {
                console.log('Success:', data)
                message.success(t('message.cardOptions.recoverCard.success'))
                updateCardData()
            })
            .catch((error) => {
                console.log('Error:', error)
            })
            .finally(() => {
                isPolling.value = false
                openRecoverModal.value = false
            
            })


    }
}



// const pollPaymentStatus = () => {

//     if (paymentInfo.value === null) {
//         return
//     } else {
//         isPolling.value = true


//         new Promise((resolve, reject) => {
//             const timeoutJob = async () => {
//                 try {
//                     const res = await post(URL.payment.checkOrderStatus, { data: paymentInfo.value.outOrderId }, true)
//                     if (res.err) {
//                         isPolling.value = false
//                         return reject()
//                     }

//                     const fulfilled = res.data === 2
//                     if (fulfilled) {
//                         const unfreezeRes = await post(URL.card.unfreeze, {
//                             cardId: cardId,
//                             outOrderId: paymentInfo.value.outOrderId
//                         })

//                         if (unfreezeRes.err) {
//                             return reject()
//                         } else {
//                             return resolve(unfreezeRes.data)
//                         }
//                     }

//                     // Instead of creating a new timeout, return a promise that resolves after timeout
//                     await new Promise(r => setTimeout(r, 3000))
//                     return timeoutJob()  // Continue the same promise chain
//                 } catch (error) {
//                     reject(error)
//                 }
//             }

//             timeoutJob()
//         })
//             .then((data) => {
//                 // Handle success
//             })
//             .catch((error) => {
//                 // Handle error
//             })
//             .finally(() => {
//                 isPolling.value = false
//                 openRecoverModal.value = false
//                 openResultModal.value = true
//             })


//     }
// }




const finishDeleteCard = async () => {
    reqPending.value = true;
    const res = await post(URL.card.delete, { cardId: cardId }, true)
    reqPending.value = false;
    if (!res.err) {
        message.success(t('message.cardOptions.deleteCard.success'))
        updateCardList()

    } else {
        message.error(t('message.cardOptions.deleteCard.failed'))
    }
    openDeleteModal.value = false
}

const finishFreezeCard = async () => {

    reqPending.value = true;

    const res = await post(URL.card.freeze, { cardId: cardId }, true)
    reqPending.value = false;
    if (!res.err) {
        message.success(t('message.cardOptions.freezeCard.success'))

        updateCardData()
    } else {
        message.error(t('message.cardOptions.freezeCard.failed'))
    }
    openFreezeModal.value = false

}


const paymentInfo = ref(null)

watch(openRecoverModal, ()=>{
    paymentInfo.value = null
},{immediate:true})


const createRecoverCardPayment = async () => {
    reqPending.value = true;
    const res = await post(URL.payment.unfreezePayment, { cardId: cardId }, true)
    reqPending.value = false;
    if (!res.err) {
        paymentInfo.value = {
            orderId: res.data.orderId,
            outOrderId: res.data.outOrderId,
            payUrl: res.data.payUrl
        }
        await nextTick()


    } else {
        message.error(t('message.cardOptions.recoverCard.failed'))
    }

}


</script>

<template>
    <Dropdown :triggger="['click']">
        <button class="bg-slate-200 px-5 py-3 rounded-lg hover:bg-slate-300 duration-100">
            <EllipsisOutlined />
        </button>
        <template #overlay>
            <Menu>
                <MenuItem v-if="cardStatus === 'Active'" @click="openFreezeModal = true">
                {{ t('message.cardOptions.freeze') }}
                </MenuItem>
                <MenuItem v-else @click="openRecoverModal = true">
                {{ t('message.cardOptions.recover') }}
                </MenuItem>
                <MenuItem @click="handleDeleteCard">
                {{ t('message.cardOptions.delete') }}
                </MenuItem>
            </Menu>
        </template>
    </Dropdown>
    <GeneralModal :maskClosable="false" v-model:open='openFreezeModal' width="29.166667vw" :centered="true"
        :mainTitle="t('message.cardOptions.cautionTitle')">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.freezeCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.freezeCard.warning2') }}</p>
        </div>
        <template #footer>

            <div class="flex flex-row items-center justify-center gap-x-4 w-full">

                <button @click="openFreezeModal = false"
                    :class='`content-style px-10 h-[2.708333vw] w-[50%] ${reqPending ? " bg-slate-50 cursor-wait" : "bg-slate-200 hover:bg-slate-300"}  duration-100`'>{{
                        t('message.cardOptions.cancel') }}</button>

                <Spin :spinning="reqPending" wrapperClassName="h-[2.708333vw] w-[50%]">
                    <button @click="finishFreezeCard"
                        class="content-style h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{
                            t('message.cardOptions.freezeCard.confirm') }}</button>
                </Spin>

            </div>

        </template>

    </GeneralModal>

    <GeneralModal :maskClosable="false" v-model:open="openRecoverModal" width="29.166667vw" :centered="true"
        :mainTitle="t(paymentInfo === null ? 'message.cardOptions.cautionTitle' : 'message.cardOptions.paymentTitle')"
        :subTitle="t(paymentInfo === null ? '' : t('message.qrCode.subtitle'))"
        >
        <div v-if="paymentInfo === null"
            class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.recoverCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.recoverCard.warning2') }}</p>
        </div>
        <template #footer>
            <div v-if="paymentInfo === null" class="flex flex-row items-center justify-center gap-x-4">

                <button @click="openRecoverModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[50%] bg-slate-200 hover:bg-slate-300 duration-100">{{
                        t('message.cardOptions.cancel') }}</button>

                <Spin :spinning="reqPending" wrapperClassName="h-[2.708333vw] w-[50%]">
                    <button @click="createRecoverCardPayment"
                        class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{
                            t('message.cardOptions.recoverCard.confirm') }}</button>
                </Spin>

            </div>

            <div v-else class="flex flex-col items-center justify-center payment-style space-y-[1.320833vw] ">
                <QRCode class="w-[8.85416667vw] h-[8.85416667vw]" :value="paymentInfo.payUrl" />

                <Spin :spinning="isPolling" wrapperClassName="h-[2.708333vw] w-[100%] grid place-content-center">
                    <button @click="pollPaymentStatus"
                        :class="`py-[.520833vw] px-[1.7625vw]  text-white  ${isPolling ? pollingClass : 'bg-[#3189ef]'} rounded-[0.625vw]`">
                        {{ t('message.qrCode.complete') }}
                    </button>
                </Spin>

            </div>

        </template>
    </GeneralModal>





    <GeneralModal :maskClosable="false" v-model:open='openDeleteModal' width="29.166667vw" :centered="true"
        :mainTitle="t('message.cardOptions.cautionTitle')">
        <div class="flex flex-col items-center justify-center mt-[1.875vw] mb-[1.875vw] text-[1.09375vw] text-center">
            <p>{{ t('message.cardOptions.deleteCard.warning1') }}</p>
            <p>{{ t('message.cardOptions.deleteCard.warning2') }}</p>
        </div>
        <template #footer>
            <div class="flex flex-row items-center justify-center gap-x-4">

                <button @click="openDeleteModal = false"
                    class="content-style px-10 h-[2.708333vw] w-[50%] bg-slate-200 hover:bg-slate-300 duration-100">{{
                        t('message.cardOptions.cancel') }}</button>

                <Spin :spinning="reqPending" wrapperClassName="h-[2.708333vw] w-[50%]">
                    <button @click="finishDeleteCard"
                        class="content-style px-10 h-[2.708333vw] w-[100%] bg-red-500 hover:bg-red-400 duration-100 text-white">{{
                            t('message.cardOptions.deleteCard.confirm') }}</button>
                </Spin>
            </div>
        </template>

    </GeneralModal>

</template>
<style scoped>
.content-style {
    font-size: 1.09375vw;
    line-height: 1.5238095238;
    border-radius: .625vw;
}
</style>
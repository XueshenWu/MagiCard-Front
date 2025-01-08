<script setup>
import CashoutButton from './CashoutButton.vue';
import CardOptionButton from './CardOptionButton.vue';
import CardHelp from './CardHelp.vue';
import RechargeButton from './RechargeButton.vue';
import { useRouter } from 'vue-router';
import useClipboard from 'vue-clipboard3';
import { message } from '../Message';
import CardNumber from '../CardNumber.vue';

import html2canvas from 'html2canvas';
import NumberBoxInput from '../NumberBoxInput.vue';

import { computed, nextTick, ref, watchEffect } from 'vue';
import GeneralModal from '../Modal/GeneralModal.vue';
import get from '../../api/get';
import post from '../../api/post';
import URL from '../../api/api-list';
import { useI18n } from 'vue-i18n';
import { debounce } from '../../utils/debounceConfig';

const { t } = useI18n();

const openCheckoutCodeModal = ref(false);

const expireDate = ref(null)

const openRecoverModal = ref(false);

let cb = () => { }

const trimed = ref(false);


const getSecureInfo = async () => {
    const res = await post(URL.card.verifyPassword, {
        paymentPassword: checkoutCode.value,
        cardId: cardId
    })

    if (!res.err) {
        return res.data;
    } else {
        message.error(res.msg);
    }
}




const cardDetailRef = ref(null);





const { cardData, cardId } = defineProps(['cardData', 'cardId']);

const freezedClass = ref('*:blur [&>#info]:blur-none');



const cvv = ref();
const checkoutCode = ref("");

const isCheckoutCodeValid = computed(() => {
    return checkoutCode.value.length === 6;
});


const finishSecureInfoRequestModal = async () => {
    const info = await getSecureInfo();

    const _cvv = info.cvv;
    cvv.value = _cvv;

    const _expireDate = {
        month: info.expMonth,
        year: info.expYear
    }
    expireDate.value = _expireDate;

    openCheckoutCodeModal.value = false;
    checkoutCode.value = "";
    await cb({ cvv: _cvv, expireDate: _expireDate });

}





const router = useRouter();
const { toClipboard } = useClipboard();




const copy = debounce(async (text) => {
    try {
        await toClipboard(text);
        message.success(t('message.messages.copySuccess'));
    } catch (error) {
        message.error(t('message.messages.copyFailed'));
    }
})

const copyCVV = () => {
    if (cvv.value) {
        copy(cvv.value);
    } else {
        cb = async (data) => { await copy(data.cvv) };
        openCheckoutCodeModal.value = true;
    }
}


const copyExpireDate = () => {
    if (expireDate.value) {
        copy(t('message.dateFormat.expiry', {
            month: expireDate.value.month,
            year2: expireDate.value.year.slice(-2),
            year4: expireDate.value.year
        }));
    } else {
        cb = async (data) => {
            await copy(t('message.dateFormat.expiry', {
                month: data.expireDate.month,
                year2: data.expireDate.year.slice(-2),
                year4: data.expireDate.year
            }));
        };
        openCheckoutCodeModal.value = true;
    }
}


const copyCardDetails = async () => {


    if (!cvv.value || !expireDate.value) {
        cb = copyCardDetails;
        openCheckoutCodeModal.value = true;
    } else {
        try {

            await nextTick();
            const details = t('message.cardDetails.format', {
                cardNumber: cardData.cardNumber,
                month: expireDate.value.month,
                year2: expireDate.value.year.slice(-2),
                year4: expireDate.value.year,
                cvv: cvv.value,
                name: cardData.userName
            });



            await toClipboard(details);
            message.success(t('message.messages.copySuccess'));
        } catch (error) {
            message.error(t('message.messages.copyFailed'));
        }
    }


};



const updateScale = (reset = false) => {
    const viewport = {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };

    const baseSize = {
        width: 1920,
        height: 1080
    };

    const widthScale = reset ? 1 : viewport.width / baseSize.width;

    const scaleContainer = document.getElementById('scale-container');
    if (scaleContainer) {
        scaleContainer.style.transform = `scale(${widthScale})`;
        scaleContainer.style.width = `${baseSize.width}px`;
        scaleContainer.style.height = `${baseSize.height}px`;

        // Update the wrapper height
        const scaledHeight = baseSize.height * widthScale;
        document.getElementById('content-wrapper').style.height = `${scaledHeight}px`;
    }
};



const copyAddressDetails = async () => {
    try {
        const address = t('message.addressDetails.format', {
            address: cardData.address,
            city: cardData.city,
            postalCode: cardData.postalCode,
            state: cardData.state,
            stateNameCn: cardData.stateCnName ? t('message.addressDetails.stateSeparator') + cardData.stateCnName : ''
        });
        await toClipboard(address);
        message.success(t('message.messages.copySuccess'));
    } catch (error) {
        message.error(t('message.messages.copyFailed'));
    }
};

// TODO: invite link get on main page

const downLoadCardDetails = async () => {


    if (!cvv.value) {
        cb = downLoadCardDetails;
        openCheckoutCodeModal.value = true;
        return;
    }


    trimed.value = true;
    updateScale(true);
    await nextTick();
    const canvas = await html2canvas(document.getElementById('cardDetail'), { backgroundColor: 'null', background: true });
    const image = canvas.toDataURL('image/png');
    updateScale();
    trimed.value = false;
    const a = document.createElement('a');
    a.href = image;
    a.download = 'card.png';
    a.click();


}

const downLoadAddressDetails = async () => {
    trimed.value = true;
    updateScale(true);
    await nextTick();
    const canvas = await html2canvas(document.getElementById('addressDetail'), { backgroundColor: '#f3fbfd' });
    const image = canvas.toDataURL('image/png');
    updateScale();
    trimed.value = false;
    const a = document.createElement('a');
    a.href = image;
    a.download = 'address.png';
    a.click();
}


const freezed = computed(() => cardData.cardStatus !== 'Active');

</script>

<template>
    <template v-if="!!cardData">
        <div class="flex flex-col justify-start w-full gap-y-10">

            <div class="flex flex-col items-center justify-start w-full">
                <div class="flex flex-row justify-between w-full">
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            {{ !freezed ? t('message.payable') : t('message.freezed') }}
                        </div>
                        <div class="flex items-end gap-x-2">
                            <div class="font-bold text-4xl">$</div>
                            <div class="font-bold text-5xl">{{
                                Number(cardData["balance"]).toFixed(2) }}</div>
                        </div>
                    </div>
                    <div class="flex flex-row items-center text-xl gap-x-6">

                        <CashoutButton :disabled="freezed" :availableBalance="cardData['balance']" />

                        <RechargeButton :disabled="freezed" :cardId="cardId" />
                        <button @click="() => router.replace('/openCard')"
                            class="bg-black text-slate-200 px-8 py-3 rounded-xl hover:bg-slate-800 duration-100">
                            {{ t('message.openNewCard') }}
                        </button>

                        <CardOptionButton v-model:openRecoverModal="openRecoverModal" :cardId="cardId" :balance="cardData.balance"
                            :cardStatus="cardData.cardStatus" />
                    </div>
                </div>
            </div>

            <div id="cardDisplay" :class="`${!freezed?'':freezedClass} relative  flex flex-row items-start justify-center border rounded-2xl`"
                style="background: radial-gradient(circle at top , rgb(241, 253, 255) 0%, rgb(249, 249, 249) 100%);">
                
                <div v-if="freezed" id="info" class="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center gap-x-4">
                    <button @click="openRecoverModal=true" class="bg-[#3189ef]  text-[1.9vw] text-white px-[3vw] py-[1.2vw] rounded-[0.625vw] hover:bg-blue-400 duration-100">
                        {{ t('message.cardDetailRecover') }}
                    </button>
                </div>
                
                <div id="cardDetail" :ref="cardDetailRef"
                    style="background: radial-gradient(circle at top left, rgba(238,238,238,1) 0%, rgb(249, 249, 249) 100%);"
                    class="flex flex-col bg-gray-100 w-1/2 h-full gap-y-6  px-9 py-7 border  border-gray-300 rounded-2xl">
                    <div class="flex flex-row items-center justify-between">
                        <img src="/logo.png" alt="logo" class="w-9 h-7" />
                        <div v-if="!trimed"
                            class="trim flex flex-row items-center justify-center gap-x-4 text-[#3189ef] [&>a]:cursor-pointer">
                            <CardHelp />
                            <a @click="copyCardDetails" class="text-lg tracking-widest">
                                {{ t('message.cardInfo.copyAll') }}
                            </a>
                            <a @click="downLoadCardDetails" class="grid place-content-center">
                                <img src="/download.png" class="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class=" text-gray-500 text-lg">{{ t('message.cardInfo.cardNumber') }} </div>
                                <!-- <div class="font-bold text-lg">{{ cardData['cardNo'] }}</div> -->
                                <CardNumber :value="cardData['cardNumber']" class="font-semibold text-3xl" />
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-lg tracking-widest text-[#3189ef]"
                                @click="copy(cardData['cardNumber'])">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class=" text-gray-500 text-lg">{{ t('message.cardInfo.cvv') }}</div>
                                <div class="font-semibold text-3xl">{{ cvv ?? '* * *' }}</div>
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-lg tracking-widest text-[#3189ef]"
                                @click="copyCVV">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                            <GeneralModal v-model:open="openCheckoutCodeModal" width="29.1667vw" :centered="true">

                                <div class="flex items-center flex-col justify-center p-8 gap-y-8">
                                    <div class="text-[1.458333vw]">
                                        {{ t('message.modal.enterPaymentPassword') }}
                                    </div>
                                    <div class="flex flex-col items-center justify-center gap-y-2">
                                        <div class="w-full text-center text-[0.8vw] mb-8">
                                            {{ t('message.modal.passwordProtection') }}
                                        </div>
                                        <NumberBoxInput v-model:value="checkoutCode" />
                                    </div>
                                    <button @click="finishSecureInfoRequestModal" :disabled="!isCheckoutCodeValid"
                                        :class="{ 'bg-[#3189ef] hover:bg-blue-400 cursor-pointer': isCheckoutCodeValid, 'bg-gray-400 cursor-not-allowed': !isCheckoutCodeValid }"
                                        class="text-white font-normal text-[1.04167vw] w-[14.0625vw] h-[2.70833vw] px-14 rounded-xl duration-100">
                                        {{ t('message.modal.confirmPassword') }}
                                    </button>
                                </div>

                                <template #footer></template>
                            </GeneralModal>

                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">{{ t('message.cardInfo.expiryDate') }}</div>
                                <div class="font-semibold text-3xl">
                                    {{ expireDate ? t('message.dateFormat.expiry', {
                                        month: expireDate.month,
                                        year2: expireDate.year.slice(-2),
                                    year4: expireDate.year
                                    }) : t('message.dateFormat.placeholder') }}
                                </div>
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-[#3189ef] tracking-widest text-lg"
                                @click="copyExpireDate">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">{{ t('message.cardInfo.name') }}</div>
                                <div class="font-bold text-3xl">{{ cardData["userName"] }}</div>
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-[#3189ef] tracking-widest text-lg"
                                @click="copy(cardData['userName'])">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                        </div>
                    </div>
                </div>

                <div id="addressDetail"
                    class="flex flex-col bg-gray-100 w-1/2 h-full gap-y-6 px-9 py-7 border border-l-0 bg-inherit  border-gray-300 rounded-r-2xl">
                    <div class="flex flex-row items-center justify-between">
                        <div class="flex items-center gap-x-2">
                            <img src="/usflag.png" alt="logo" class="w-6 h-4" />
                            <div class="text-lg">{{ t('message.billingAddress.title') }}</div>
                        </div>
                        <div v-if="!trimed"
                            class="flex flex-row items-center justify-center gap-x-4 text-[#3189ef] [&>a]:cursor-pointer">
                            <CardHelp />
                            <a @click="copyAddressDetails" class="text-lg tracking-widest">
                                {{ t('message.cardInfo.copyAll') }}
                            </a>
                            <a @click="downLoadAddressDetails" class="grid place-content-center">
                                <img src="/download.png" class="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">{{ t('message.billingAddress.address1') }}</div>
                                <div class="font-semibold text-3xl">{{ cardData["address"] }}</div>
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-[#3189ef] tracking-widest text-lg"
                                @click="copy(cardData['address'])">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">{{ t('message.billingAddress.city') }}</div>
                                <div class="font-semibold text-3xl">{{ cardData["city"] }}</div>
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-[#3189ef] tracking-widest text-lg"
                                @click="copy(cardData['city'])">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">{{ t('message.billingAddress.postalCode') }}</div>
                                <div class="font-semibold text-3xl">{{ cardData["postalCode"] }}</div>
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-[#3189ef] tracking-widest text-lg"
                                @click="copy(cardData['postalCode'])">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">{{ t('message.billingAddress.state') }}</div>
                                <div class="font-semibold text-3xl">
                                 
                                    {{ cardData.state }}
                                </div>
                            </div>
                            <a v-if="!trimed" class="cursor-pointer text-[#3189ef] text-lg tracking-widest"
                                @click="copy(`${cardData['stateName']}${cardData['stateCnName'] ? ' / ' + cardData['stateCnName'] : ''}`)">
                                {{ t('message.cardInfo.copy') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div>
            Loading...
        </div>
    </template>
</template>
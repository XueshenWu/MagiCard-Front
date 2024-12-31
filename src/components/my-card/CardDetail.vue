<script setup>
import CashoutButton from './CashoutButton.vue';
import CardOptionButton from './CardOptionButton.vue';
import CardHelp from './CardHelp.vue';
import RechargeButton from './RechargeButton.vue';
import { useRouter } from 'vue-router';
import useClipboard from 'vue-clipboard3';
import { message } from 'ant-design-vue';
import CardNumber from '../CardNumber.vue';
import DateDisply from './DateDisply.vue';
import { ref} from 'vue';


const openCheckoutCodeModal = ref(false);

const { cardData } = defineProps(['cardData']);
const router = useRouter();
const { toClipboard } = useClipboard();

const copy = async (text) => {
    try {
        await toClipboard(text);
        message.success('复制成功');
    } catch (error) {
        message.error('复制失败');
    }
};

function formateDate(dateStr) {
 
    const [year, month] = dateStr.split('-');
    
    const style1 = `${month}月/${year}年`;
    
 
    const style2 = `${month}月/${year}年`;
    
 
    return `${style1} (或${style2})`;
}

const copyCardDetails = async () => {
    try {
        const details = `卡号: ${cardData.cardNo}
有效期: ${String(cardData.issueDate).split('-')[1]}月/${String(cardData.issueDate).split('-')[0]}年
安全码: ${cardData.cvv}
姓名: ${cardData.userName}`;
        await toClipboard(details);
        message.success('复制成功');
    } catch (error) {
        message.error('复制失败');
    }
};

const copyAddressDetails = async () => {
    try {
        const address = `地址1: ${cardData.addressLine1}
城市: ${cardData.city}
邮编: ${cardData.postalCode}
州: ${cardData.stateName}${cardData.stateCnName ? ' / ' + cardData.stateCnName : ''}`;
        await toClipboard(address);
        message.success('复制成功');
    } catch (error) {
        message.error('复制失败');
    }
};
</script>

<template>
    <template v-if="!!cardData">
        <div class="flex flex-col justify-start w-full gap-y-10">

            <div class="flex flex-col items-center justify-start w-full">
                <div class="flex flex-row justify-between w-full">
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            可支付
                        </div>
                        <div class="flex items-end gap-x-2">
                            <div class="font-bold text-4xl">$</div>
                            <div class="font-bold text-5xl">{{
                                Number(cardData["balance"]).toFixed(2) }}</div>
                        </div>
                    </div>
                    <div class="flex flex-row items-center text-xl gap-x-6">

                        <CashoutButton :availableBalance="cardData['balance']" />

                        <RechargeButton cardInfo="test" />
                        <button @click="() => router.replace('/openCard')"
                            class="bg-black text-slate-200 px-8 py-3 rounded-xl hover:bg-slate-800 duration-100">
                            开新卡
                        </button>

                        <CardOptionButton />
                    </div>
                </div>
            </div>

            <div id="cardDisplay" class="flex flex-row items-start justify-center border rounded-2xl"
            
              style="background: radial-gradient(circle at top , rgb(241, 253, 255) 0%, rgb(249, 249, 249) 100%);"
            >
                <div id="cardDetail"
                    style="background: radial-gradient(circle at top left, rgba(238,238,238,1) 0%, rgb(249, 249, 249) 100%);"
                    class="flex flex-col bg-gray-100 w-1/2 h-full gap-y-6  px-9 py-7 border  border-gray-300 rounded-2xl">
                    <div class="flex flex-row items-center justify-between">
                        <img src="/logo.png" alt="logo" class="w-9 h-7" />
                        <div
                            class="flex flex-row items-center justify-center gap-x-4 text-[#3189ef] [&>a]:cursor-pointer">
                            <CardHelp />
                            <a @click="copyCardDetails" class="text-lg tracking-widest">
                                复制全部
                            </a>
                            <a class="grid place-content-center">
                                <img src="/download.png" class="w-5 h-5"</img>
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class=" text-gray-500 text-lg">卡号</div>
                                <!-- <div class="font-bold text-lg">{{ cardData['cardNo'] }}</div> -->
                                <CardNumber :value="cardData['cardNo']" class="font-semibold text-3xl" />
                            </div>
                            <a class="cursor-pointer text-lg tracking-widest text-[#3189ef]" @click="copy(cardData['cardNo'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class=" text-gray-500 text-lg">安全码/CVC/CVV</div>
                                <div class="font-semibold text-3xl">* * *</div>
                            </div>
                            <a class="cursor-pointer text-lg tracking-widest text-[#3189ef]" @click="copy(cardData['cvv'])">
                                复制
                            </a>
                            
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">有效期</div>
                                <div class="font-semibold text-3xl">
                                   <DateDisply :dateStr="cardData['issueDate']" />
                                </div>
                            </div>
                            <a class="cursor-pointer text-[#3189ef] tracking-widest text-lg"
                                @click="copy(`${String(cardData['issueDate']).split('-')[1]}月/${String(cardData['issueDate']).split('-')[0]}年`)">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">姓名</div>
                                <div class="font-bold text-3xl">{{ cardData["userName"] }}</div>
                            </div>
                            <a class="cursor-pointer text-[#3189ef] tracking-widest text-lg" @click="copy(cardData['userName'])">
                                复制
                            </a>
                        </div>
                    </div>
                </div>

                <div id="addressDetail"
                    class="flex flex-col bg-gray-100 w-1/2 h-full gap-y-6 px-9 py-7 border border-l-0 bg-inherit  border-gray-300 rounded-r-2xl">
                    <div class="flex flex-row items-center justify-between">
                        <div class="flex items-center gap-x-2">
                            <img src="/usflag.png" alt="logo" class="w-6 h-4" />
                            <div class="text-lg">账单地址</div>
                        </div>
                        <div
                            class="flex flex-row items-center justify-center gap-x-4 text-[#3189ef] [&>a]:cursor-pointer">
                            <CardHelp />
                            <a @click="copyAddressDetails" class="text-lg tracking-widest">
                                复制全部
                            </a>
                            <a class="grid place-content-center">
                                <img src="/download.png" class="w-5 h-5"</img>
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">地址1</div>
                                <div class="font-semibold text-3xl">{{ cardData["addressLine1"] }}</div>
                            </div>
                            <a class="cursor-pointer text-[#3189ef] tracking-widest text-lg" @click="copy(cardData['addressLine1'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">城市</div>
                                <div class="font-semibold text-3xl">{{ cardData["city"] }}</div>
                            </div>
                            <a class="cursor-pointer text-[#3189ef] tracking-widest text-lg" @click="copy(cardData['city'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">邮编</div>
                                <div class="font-semibold text-3xl">{{ cardData["postalCode"] }}</div>
                            </div>
                            <a class="cursor-pointer text-[#3189ef] tracking-widest text-lg" @click="copy(cardData['postalCode'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-lg text-gray-500">州</div>
                                <div class="font-semibold text-3xl">
                                    {{ cardData["stateName"] }} {{ cardData["stateCnName"] && '/' }}
                                    {{ cardData["stateCnName"] }}
                                </div>
                            </div>
                            <a class="cursor-pointer text-[#3189ef] text-lg tracking-widest"
                                @click="copy(`${cardData['stateName']}${cardData['stateCnName'] ? ' / ' + cardData['stateCnName'] : ''}`)">
                                复制
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
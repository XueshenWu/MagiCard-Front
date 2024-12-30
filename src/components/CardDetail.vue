<script setup>
import { ArrowDownOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import CashoutButton from './CashoutButton.vue';
import CardOptionButton from './CardOptionButton.vue';
import CardHelp from './CardHelp.vue';
import RechargeButton from './RechargeButton.vue';
import { useRouter } from 'vue-router';
import  useClipboard  from 'vue-clipboard3';
import { message } from 'ant-design-vue';
import CardNumber from './CardNumber.vue';



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
        <div class="flex flex-col justify-start w-full gap-y-4">
            <!-- Previous top section remains unchanged -->
            <div class="flex flex-col items-center justify-start w-full">
                <div class="flex flex-row justify-between w-full">
                    <div class="flex flex-col">
                        <div class="text-xl">
                            可支付
                        </div>
                        <div>
                            <span class="font-bold text-xl">$</span><span class="font-bold text-3xl">{{
                                Number(cardData["balance"]).toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="flex flex-row items-center text-sm gap-x-2">
                        <!-- <button class="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300 duration-100">
                            提现
                        </button> -->
                        <CashoutButton :availableBalance="cardData['balance']" />
                        <!-- <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 duration-100">
                            充值
                        </button> -->
                        <RechargeButton cardInfo="test" />
                        <button @click="()=>router.replace('/openCard')"
                            class="bg-black text-slate-200 px-6 py-2 rounded-lg hover:bg-slate-800 duration-100">
                            开新卡
                        </button>
                        <!-- <button class="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 duration-100">
                            <EllipsisOutlined />
                        </button> -->
                        <CardOptionButton />
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-start justify-center h-[300px]">
                <div id="cardDetail"
                    style="background: radial-gradient(circle at top left, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 100%);"
                    class="flex flex-col bg-gray-100 w-1/2 h-full gap-y-6 rounded-l-lg px-5 py-3">
                    <div class="flex flex-row items-center justify-between">
                        <img src="/logo.png" alt="logo" class="w-6 h-4" />
                        <div class="flex flex-row items-center justify-center gap-x-4 text-sky-500 [&>a]:cursor-pointer">
                            <CardHelp />
                            <a @click="copyCardDetails">
                                复制全部
                            </a>
                            <a class="grid place-content-center">
                                <ArrowDownOutlined />
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">卡号</div>
                                <!-- <div class="font-bold text-lg">{{ cardData['cardNo'] }}</div> -->
                                 <CardNumber :value="cardData['cardNo']" class="font-bold text-lg" />
                            </div>
                            <a class="cursor-pointer text-blue-500" @click="copy(cardData['cardNo'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">安全码/CVC/CVV</div>
                                <div class="font-bold text-lg">* * *</div>
                            </div>
                            <a class="cursor-pointer text-blue-500" @click="copy(cardData['cvv'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">有效期</div>
                                <div class="font-bold text-lg">
                                    {{ `${String(cardData['issueDate']).split('-')[1]}月/${String(cardData['issueDate']).split('-')[0]}年` }}
                                </div>
                            </div>
                            <a class="cursor-pointer text-blue-500" 
                               @click="copy(`${String(cardData['issueDate']).split('-')[1]}月/${String(cardData['issueDate']).split('-')[0]}年`)">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">姓名</div>
                                <div class="font-bold text-lg">{{ cardData["userName"] }}</div>
                            </div>
                            <a class="cursor-pointer text-blue-500" @click="copy(cardData['userName'])">
                                复制
                            </a>
                        </div>
                    </div>
                </div>

                <div id="addressDetail"
                    style="background: radial-gradient(circle at top left, rgba(241,253,255,1) 0%, rgba(255,255,255,1) 100%);"
                    class="flex flex-col bg-sky-100 w-1/2 h-full gap-y-6 rounded-r-lg px-5 py-3">
                    <div class="flex flex-row items-center justify-between">
                        <div class="flex items-center gap-x-2">
                            <img src="/usflag.png" alt="logo" class="w-6 h-4" />
                            <div class="">账单地址</div>
                        </div>
                        <div class="flex flex-row items-center justify-center gap-x-4 text-sky-500 [&>a]:cursor-pointer">
                            <CardHelp />
                            <a @click="copyAddressDetails">
                                复制全部
                            </a>
                            <a class="grid place-content-center">
                                <ArrowDownOutlined />
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">地址1</div>
                                <div class="font-bold text-lg">{{ cardData["addressLine1"] }}</div>
                            </div>
                            <a class="cursor-pointer text-blue-500" @click="copy(cardData['addressLine1'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">城市</div>
                                <div class="font-bold text-lg">{{ cardData["city"] }}</div>
                            </div>
                            <a class="cursor-pointer text-blue-500" @click="copy(cardData['city'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">邮编</div>
                                <div class="font-bold text-lg">{{ cardData["postalCode"] }}</div>
                            </div>
                            <a class="cursor-pointer text-blue-500" @click="copy(cardData['postalCode'])">
                                复制
                            </a>
                        </div>
                        <div class="flex flex-row justify-between items-end">
                            <div class="flex flex-col items-start">
                                <div class="text-sm text-gray-500">州</div>
                                <div class="font-bold text-lg">
                                    {{ cardData["stateName"] }} {{ cardData["stateCnName"] && '/' }}
                                    {{ cardData["stateCnName"] }}
                                </div>
                            </div>
                            <a class="cursor-pointer text-blue-500" 
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
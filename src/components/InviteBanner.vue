<script setup>
import { ref, watchEffect } from 'vue';
import { invitationInfoResp } from '../mock/invitationInfo';
import { Input, Modal, Tooltip, Button } from 'ant-design-vue';
import { CopyOutlined, EditOutlined } from '@ant-design/icons-vue';
import CashoutButton from './CashoutButton.vue';


const invitationInfo = ref(null)
const open = ref(false);
const openBonusCashout = ref(false);

async function getinvitationInfo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(invitationInfoResp.data);
        }, 50);
    });
}

watchEffect(async () => {
    invitationInfo.value = await getinvitationInfo();
});


</script>
<template>
    <template v-if="!invitationInfo">
        Loading...

    </template>

    <template v-else>
        <div class="flex flex-row justify-between items-center w-full">
            <div class="flex flex-col items-start gap-y-2 text-sm">
                <div class="text-blue-500 flex items-center ">
                    邀请朋友成功加入, 每位奖励2美金<img class="w-4 h-4" src="/coinsack.svg" alt="coin sack" />!
                </div>
                <div class="flex flex-row items-center gap-x-2">
                    <div class="border-r-2 border-gray-200 pr-2">
                        奖励金额总数:${{ invitationInfo['shareUseTips'] }}
                    </div>

                    <div class="border-r-2  border-gray-200 pr-2">邀请奖励余额:${{ invitationInfo['balance'] }}</div>

                    <a class="text-blue-500 cursor-pointer">
                        查看邀请明细
                    </a>
                </div>
            </div>

            <div class="flex flex-col items-center justify-end gap-y-2 ">
                <Input readonly class="font-bold h-10 text-black" :value="invitationInfo['inviteCode']">

                <template #prefix>
                    <div class="font-normal">
                        邀请码
                    </div>
                </template>

                <template #suffix>
                    <div class="flex gap-x-4">

                        <Tooltip placement="top" title="编辑邀请码">
                            <EditOutlined @click="open = true" class=" text-blue-500 cursor-pointer" />
                        </Tooltip>
                        <Modal width="280px" title="修改邀请码" v-model:open="open">
                            <div class="flex flex-col gap-y-2">
                                <div class="text-gray-500 text-xs ">
                                    邀请码
                                </div>
                                <Input class="bg-gray-600" v-model="invitationInfo['inviteCode']" />
                            </div>

                            <template #footer>
                                <div class="flex justify-center items-center gap-x-4">
                                    <Button class="w-24" type="primary" @click="open = false">确定</Button>
                                    <Button class="w-24" @click="open = false">取消</Button>
                                </div>

                            </template>
                        </Modal>
                        <Tooltip placement="top" title="复制邀请码">
                            <CopyOutlined class=" text-blue-500 cursor-pointer" />
                        </Tooltip>
                    </div>
                </template>

                </Input>
            </div>
            <button @click="openBonusCashout = true"
                className="bg-blue-500 rounded-lg  px-6 py-2 text-white hover:bg-blue-400 "
                :availableBalance="invitationInfo['balance']">
                提现
            </button>
            <Modal v-model:open='openBonusCashout' width="400px">
                <div class="flex flex-col items-center justify-center gap-y-4">

                    <p class="text-xl">邀请奖励余额</p>
                    <p class="text-xs">你可提现的奖励金额为</p>
                    <p class="font-bold text-3xl">${{ Number(invitationInfo['balance']).toFixed(2) }}</p>


                </div>
                <template #footer>
                    <div class="flex flex-row items-center justify-center gap-x-4 mt-8">

                        <button @click="openBonusCashout = false"
                            :class="`px-10 py-2 w-36 text-sm rounded-lg ${invitationInfo['balance']<=0?'bg-gray-100 cursor-not-allowed text-gray-400':'bg-blue-500 hover:bg-blue-400 text-white'} duration-100 `">确认提现</button>

                    </div>
                </template>

            </Modal>

        </div>

    </template>

</template>
<script setup>
import { ref, watchEffect, watch } from 'vue';
import { Input, Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import useClipboard from 'vue-clipboard3';
import GeneralModal from '../Modal/GeneralModal.vue';
import { message } from '../Message';
import get from '../../api/get';
import URL from '../../api/api-list';
import post from '../../api/post';


const invitationInfo = ref(null);
const open = ref(false);
const openBonusCashout = ref(false);
const { toClipboard } = useClipboard();
const router = useRouter();

const newInviteCode = ref('');




async function getinvitationInfo() {
    const res = await get(URL.invitation.summary, null, true)
    return res.data;
}

watchEffect(async () => {
    invitationInfo.value = await getinvitationInfo();
});

const handleModifyInviteCode = async () => {

     if(newInviteCode.value === invitationInfo.value.inviteCode){
        message.error('请输入新的邀请码');
        return;
    }

    const inviteCodePattern = /^[a-zA-Z0-9]{6}$/;
    if (!inviteCodePattern.test(newInviteCode.value)) {
        message.error('邀请码必须是6位数字和字母的组合');
        return;
    }

    const res = await post(URL.invitation.changeInvitationCode, { invitationCode: newInviteCode.value }, true)
    if (!res.err) {
        message.success('修改成功');
        invitationInfo.value = await getinvitationInfo();
    }else{
        message.error('修改失败');
    }

    open.value = false;
};


watch(open, async (newVal) => {
    if (newVal) {
        newInviteCode.value = invitationInfo.value.inviteCode;
    }
})

const copyInviteCode = async () => {
    try {

        await toClipboard(`http://localhost:5173?refId=${invitationInfo.value.inviteCode}`);

        message.success('复制成功');
    } catch (error) {
        message.error('复制失败');
    }
};
</script>
<template>
    <template v-if="!invitationInfo">
        Loading...
    </template>

    <template v-else>
        <div class=" border-t pt-12 border-gray-300 flex flex-row justify-between items-center w-full">
            <div class="flex flex-col items-start gap-y-4 text-sm">
                <div class="text-[#3189ef] flex items-center text-3xl tracking-wider ">
                    邀请朋友成功加入, 每位奖励2美金<img class="w-6 h-6" src="/coinsack.svg" alt="coin sack" />!
                </div>
                <div class="flex flex-row items-center gap-x-2 *:text-lg">
                    <div class="border-r-2 border-gray-200 pr-4">
                        奖励金额总数: <span class="font-semibold">${{ invitationInfo.totalRewardAmount.toFixed(2) }}</span>
                    </div>

                    <div class="border-r-2  border-gray-200 pr-4">邀请奖励余额: <span class="font-semibold">${{
                        invitationInfo.rewardBalance.toFixed(2) }}</span>
                    </div>

                    <div class="text-[#3189ef] cursor-pointer" @click="() => router.replace('/invite-record')">
                        查看邀请明细 >
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-center justify-end gap-x-10">

                <div class="flex items-center justify-between h-16 px-4 gap-x-16 bg-gray-100 rounded-xl">


                    <div class="flex items-center gap-x-4">
                        <div class="font-normal text-xl text-gray-400">
                            邀请码
                        </div>


                        <div class="font-bold text-black text-2xl">
                            {{ invitationInfo.inviteCode }}
                        </div>
                    </div>



                    <div class="flex gap-x-4">
                        <img src="/invitation/change_code.png" class="w-5 h-5 cursor-pointer" @click="open = true">

                        <GeneralModal width="29.1667vw" v-model:open="open" :centered="true">
                            <div class="p-8 flex flex-col gap-y-2 items-center justify-center">
                                <div class="text-[1.458333vw]">
                                    修改邀请码
                                </div>
                                <div class="flex flex-col items-start gap-y-4 w-full">
                                    <div class="text-gray-500 text-[.833333vw]">
                                        邀请码
                                    </div>
                                    <Input allowClear v-model:value="newInviteCode"
                                        class="text-[.9375vw] font-semibold customer-input" />

                                </div>
                            </div>

                            <template #footer>
                                <div class="flex justify-center items-center gap-x-4 m-4">
                                    <button @click="open = false"
                                        class="h-[2.708333vw] text-[1.041667vw] w-[100%] rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200">取消</button>
                                    <button @click="handleModifyInviteCode"
                                        :class="`h-[2.708333vw] text-[1.041667vw] w-[100%] rounded-xl transition-colors duration-200 ${(invitationInfo.inviteCode ?? '').length > 0 ? ' bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-200 cursor-not-allowed text-gray-500'}`">确认</button>
                                </div>
                            </template>
                        </GeneralModal>
                        <img src="/copy.png" class="w-5 h-5 cursor-pointer" @click="copyInviteCode">
                    </div>
                </div>
                <button @click="openBonusCashout = true"
                    className="bg-[#3b82f6] rounded-xl  px-12 py-3 text-2xl text-white hover:bg-blue-400 "
                    :availableBalance="invitationInfo.rewardBalance.toFixed(2)">
                    去提现
                </button>
            </div>

            <GeneralModal v-model:open='openBonusCashout' width="29.1667vw" :centered="true">
                <div class="flex flex-col items-center justify-center gap-y-4 pt-8 px-8">
                    <p class="text-[1.458333vw]">邀请奖励余额</p>
                    <p class="text-[0.8vw]">你可提现的奖励金额为</p>
                    <p class="font-bold text-[2.08333vw]">${{ Number(
                        invitationInfo.rewardBalance.toFixed(2)).toFixed(2) }}</p>
                </div>
                <template #footer>
                    <div class="flex flex-row items-center justify-center gap-x-4 mt-12 px-8 pb-8 ">
                        <button @click="openBonusCashout = false"
                            :class="`text-[1.04167vw] w-[14.0625vw] h-[2.70833vw]  rounded-xl ${invitationInfo['balance'] <= 0 ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-blue-500 hover:bg-blue-400 text-white'} duration-100 `">全部提现</button>
                    </div>
                </template>
            </GeneralModal>
        </div>
    </template>
</template>
<style scoped>
.customer-input {
    line-height: 1.666667vw;
    padding: .989583vw 2.03125vw;
    border-radius: .625vw;
}
</style>
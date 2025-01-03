<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { message } from "../components/Message.js"

import useClipboard from 'vue-clipboard3';
import GeneralModal from '../components/Modal/GeneralModal.vue';
const open = ref(false);
const openRewardShow = ref(false);
let rewardAmount = ref(0.00);
let inviteCode = ref("ASIU23");
let inviteCodeModal = ref("");

let inviteStatistics = ref({
    rewardBalance: 0,
    monthlyReferrals: 0,
    totalReferrals: 0,
    rechargedUsers: 0,
    totalRewardAmount: 0
});
const statusMap = {
    all: '全部',
    registered: '仅注册',
    unpaid: '未支付',
    paid: '已支付'
};
const { toClipboard } = useClipboard();

const copy = async (text) => {
    try {
        await toClipboard(text);
        message.success('复制成功');
    } catch (error) {
        message.error('复制失败');
    }
};


const rotateDegree = ref(0)
const rotate = () => {
    rotateDegree.value += 360
}

const handleRefresh = () => {
    rotate()
}

function generatePreviousMonths() {
    const monthsMap = { all: '全部' };
    const currentDate = new Date();
    for (let i = 0; i < 16; i++) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // 月份从 0 开始
        monthsMap[`month_${year}_${month}`] = `${year}年${month}月`;
        currentDate.setMonth(currentDate.getMonth() - 1); // 往前推一个月
    }

    return monthsMap;
}
const months = ref(generatePreviousMonths());

let selectByStatus = ref("按状态筛选");
let selectByMonth = ref("按月筛选");
const onClickStatus = ({ key }) => {
    selectByStatus.value = statusMap[key];
};

const onClickTime = ({ key }) => {
    selectByMonth.value = months.value[key];
};

const dataSource = [
    {
        rewardTime: '2024-12-28 07:24',
        status: "已支付",
        inviteePhoneNumber: '151****1712',
        rewardAmount: '+$2.00',
    },
    {
        rewardTime: '2024-12-28 07:24',
        status: "已支付",
        inviteePhoneNumber: '151****1712',
        rewardAmount: '+$2.00',
    },
    {
        rewardTime: '2024-12-28 07:24',
        status: "已支付",
        inviteePhoneNumber: '151****1712',
        rewardAmount: '+$2.00',
    }
];

const columns = [
    {
        title: '日期',
        dataIndex: 'rewardTime',
        key: 'rewardTime',
        sorter: true
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '被邀请人',
        dataIndex: 'inviteePhoneNumber',
        key: 'inviteePhoneNumber',
    },
    {
        title: '奖励金额',
        dataIndex: 'rewardAmount',
        key: 'rewardAmount',
    }

]

const isRotating = ref(false);

// 切换旋转状态的方法
const toggleRotation = () => {
    isRotating.value = !isRotating.value;
};

// 复制链接
const handleCopyLink = () => {

}
// 奖励提现
const handleWithdrew = () => {

}

const handleOpenChangeInvitationCode = () => {
    open.value = true;
    inviteCodeModal.value = inviteCode.value;
}
const handleOpenWithdrewRewardAmount = () => {
    openRewardShow.value = true;
}
const handleCloseWithdrewRewardAmount = () => {
    openRewardShow.value = false;
};
</script>


<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-row w-full">
            <div class="flex flex-col w-[40%] border-r-[1px] border-b-[1px] p-10">
                <div class="text-xl">
                    邀请码
                </div>
                <div class="flex flex-row justify-between  py-5">
                    <div class="flex flex-row">
                        <div class="text-3xl font-semibold text-black">{{ inviteCode }}</div>
                        <img src="/invitation/change_code.png" class="w-7 h-7 ml-2 mt-1 cursor-pointer"
                            @click="handleOpenChangeInvitationCode">
                    </div>
                    <div>
                        <button @click="() => copy(inviteCode)"
                            class="bg-[#eeeeee] text-black px-8 py-3 rounded-lg duration-100 cursor-pointer text-xl font-normal">
                            复制链接
                        </button>
                    </div>
                </div>
                <div class="text-[#979797] text-xl font-normal">
                    邀请 1 位用户返 2 美金。
                </div>
            </div>
            <div class="flex flex-col w-[60%] border-b-[1px] p-10">
                <div class="text-black text-xl">
                    邀请奖励余额
                </div>
                <div class="flex flex-row justify-between py-5">
                    <div class="flex flex-row">
                        <div class="text-3xl font-semibold text-black">${{ inviteStatistics.rewardBalance }}</div>
                    </div>
                    <div>
                        <button @click="handleOpenWithdrewRewardAmount"
                            class="bg-[#3189ef] text-white px-6 py-2 rounded-lg duration-100 cursor-pointer">
                            奖励提现
                        </button>
                    </div>
                </div>
                <div class="flex flex-row w-full justify-between mt-5">
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">{{ inviteStatistics.monthlyReferrals }}</div>
                        <div class="text-xl text-[#a59897] font-normal">本月推荐人数</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">{{ inviteStatistics.totalReferrals }}</div>
                        <div class="text-xl text-[#a59897] font-normal">总推荐人数</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">{{ inviteStatistics.rechargedUsers }}</div>
                        <div class="text-xl text-[#a59897] font-normal">已充值人数</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">${{ inviteStatistics.totalRewardAmount }}</div>
                        <div class="text-xl text-[#a59897] font-normal">总奖励金额</div>
                    </div>


                </div>
            </div>
        </div>
        <div class="flex flex-col w-full items-center mt-6">
            <div class="w-[90%] flex flex-row justify-between items-center">
                <div>
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane key="1" tab="支付会员邀请"></a-tab-pane>
                    </a-tabs>
                </div>
                <div class="flex flex-row items-center">
                    <div class="mr-6">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link text-[#3189ef] flex items-center cursor-pointer" @click.prevent>
                                {{ selectByStatus }}
                                <DownOutlined class="ml-2 w-[15px] h-[15px]" />
                            </a>
                            <template #overlay>
                                <a-menu style="max-height: 300px; overflow-y: auto;" @click="onClickStatus">
                                    <a-menu-item v-for="(label, key) in statusMap" :key="key">
                                        <a href="javascript:;">{{ label }}</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                    <div class="mr-6">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link text-[#3189ef] flex items-center cursor-pointer" @click.prevent>
                                {{ selectByMonth }}
                                <DownOutlined class="ml-2 w-[15px] h-[15px]" />
                            </a>
                            <template #overlay>
                                <a-menu style="max-height: 300px; overflow-y: auto;" @Click="onClickTime">
                                    <a-menu-item v-for="(month, index) in months" :key="index">
                                        <a href="javascript:;">{{ month }}</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                    <div @click="handleRefresh" class="flex items-center text-blue-400 gap-x-1 cursor-pointer">

                        <img :style="{ transform: `rotate(${rotateDegree}deg)`, transition: 'transform 0.5s ease' }"
                            :class='` w-4 h-4`' src="/invitation/refresh.png" alt="refresh" />
                        <span class="text-lg">刷新</span>
                    </div>
                </div>
            </div>
            <div class="rounded-lg overflow-hidden shadow-sm w-[90%] ">
                <a-table :dataSource="dataSource" :columns="columns" class="w-full " bordered />
            </div>
        </div>
        <GeneralModal v-model:open='open' width="600px" :centered="false">
            <div class="flex flex-col items-center justify-center gap-y-4 w-full p-6">
                <p class="text-3xl">修改邀请码</p>
                <div class="flex flex-col w-full">
                    <div class="py-4 text-lg">邀请码</div>
                    <div class="h-16">
                        <a-input allowClear v-model:value="inviteCode" placeholder="请填写邀请码" class="h-full" />
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex justify-between gap-4 w-full text-xl px-4 pb-4">
                    <button class="py-4 px-4 rounded-xl bg-[#eeeeee] text-black w-full" @click="open = false">
                        取消
                    </button>
                    <button :class="`py-4 px-4 rounded-xl   w-full ${inviteCode?.length>0?'bg-[#3189ef] hover:bg-blue-400  text-white':'bg-[#eeeeee] cursor-not-allowed '}`">
                        确定
                    </button>
                </div>
            </template>
        </GeneralModal>

        <GeneralModal v-model:open='openRewardShow' width="520px" @close="handleCloseWithdrewRewardAmount" :centered="false">
            <template #default>
                <div class="flex flex-col items-center justify-center gap-y-4 pt-6 px-8">
                    <p class="text-3xl">邀请奖励余额</p>
                    <p class="text-normal">你可提现的奖励金额为</p>
                    <p class="font-bold text-4xl">${{ Number(rewardAmount).toFixed(2) }}</p>
                </div>
            </template>
            <template #footer>
                <div class="flex items-center justify-center pb-6 px-8 mt-8">
                    <button
                        :class='` text-xl mt-4 w-72 py-4  rounded-xl   ${rewardAmount === 0 ? "disabled cursor-not-allowed bg-gray-100 text-gray-400" : " duration-100 bg-blue-500 hover:bg-blue-400 text-white"}`'>全部提现</button>
                </div>
            </template>
        </GeneralModal>

    </div>
</template>
<style scoped>
::v-deep(.ant-table-wrapper .ant-table-thead > tr > th) {
    background-color: white;
    font-size: large;
}


::v-deep(.ant-table-wrapper .ant-table-cell ) {
    background-color: white;
    font-size: medium;
    text-align: center;
}

::v-deep(.ant-input) {
    padding: 5px 27px !important;
    font-weight: bold;
}

.rotate {
    transform: rotate(360deg);
    /* 完整旋转一圈 */
}
</style>

<style scoped>
img {
    will-change: transform;
}

::v-deep(.ant-table-wrapper .ant-table-thead > tr > th) {
    background-color: white;
}
</style>
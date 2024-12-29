<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { Modal } from 'ant-design-vue';

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
    },
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
                        <button @click="handleCopyLink"
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
                    <div class="flex flex-row items-center space-x-2 cursor-pointer" @click="toggleRotation">
                        <!-- 图标 -->
                        <img src="/invitation/refresh.png" class="w-5 h-5 transition-transform duration-500"
                            :class="{ 'rotate': isRotating }" />
                        <!-- 刷新文字 -->
                        <div class="text-[#3189ef]">
                            刷新
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg overflow-hidden shadow-sm w-[90%] ">
                <a-table :dataSource="dataSource" :columns="columns" class="w-full" bordered />
            </div>
        </div>
        <Modal v-model:open='open' width="600px">
            <div class="flex flex-col items-center justify-center gap-y-4 w-full p-6">
                <p class="text-2xl">修改邀请码</p>
                <div class="flex flex-col w-full">
                    <div class="py-4">邀请码</div>
                    <div class="h-16">
                        <a-input v-model:value="inviteCode" placeholder="请填写邀请码" class="h-full" />
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex justify-between gap-4 w-full">
                    <button class="py-2 px-4 rounded-lg bg-[#eeeeee] text-black w-full" @click="open = false">
                        取消
                    </button>
                    <button class="py-2 px-4 rounded-lg bg-[#3189ef] text-white w-full">
                        确定
                    </button>
                </div>
            </template>
        </Modal>
        <Modal v-model:open='openRewardShow' width="400px">
        <div class="flex flex-col items-center justify-center gap-y-4">

            <p class="text-xl">邀请奖励余额</p>
            <p class="text-xs">你可提现的奖励金额为</p>
            <p class="font-bold text-3xl">${{ Number(rewardAmount).toFixed(2) }}</p>
            <button :class='`mt-4 px-10 py-2  rounded-lg   ${rewardAmount === 0 ? "disabled cursor-not-allowed bg-gray-100 text-gray-400" : " duration-100 bg-blue-500 hover:bg-blue-400 text-white"}`'>全部提现</button>

        </div>
        <template #footer>
            
        </template>

    </Modal>
    </div>
</template>
<style scoped>
::v-deep(.ant-table-wrapper .ant-table-thead > tr > th) {
    background-color: white;
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
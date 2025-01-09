<script setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { computed, inject, onMounted, ref, watchEffect } from 'vue';
import { message } from "../components/Message.js"
import URL from '../api/api-list.js';
import { Input, Spin } from 'ant-design-vue';
import { useRouter } from 'vue-router';


import useClipboard from 'vue-clipboard3';
import GeneralModal from '../components/Modal/GeneralModal.vue';
import get from '../api/get.js';
import { Table } from 'ant-design-vue';
import { watch } from 'vue';
import post from '../api/post.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();





const open = ref(false);
const openRewardShow = ref(false);
const inviteCodeModal = ref("");

const loading = ref(true);

const inviteStatistics = ref({
    rewardBalance: 0,
    monthlyReferrals: 0,
    totalReferrals: 0,
    rechargedUsers: 0,
    totalRewardAmount: 0,
    inviteCode: ""
});

const status_to_number = {
    按状态筛选: undefined,
    仅注册: 1,
    未支付: 2,
    已支付: 3
}

const openBonusCashout = ref(false);

async function getinvitationInfo() {
    const res = await get(URL.invitation.summary, null, true)
    return res.data;
}

const date_to_number = (t) => {

    if (t === "按月筛选" || t === "全部") {
        return undefined;
    }
    const [year, month] = t.match(/(\d{4})年(\d{1,2})月/).slice(1, 3);
    return `${year}-${month.padStart(2, '0')}`;
}

const withdrawlLoading = ref(false);

const handleBonusCashout = async () => {

    if (inviteStatistics.value.rewardBalance <= 0) {

        return;
    }

    withdrawlLoading.value = true;

    const res = await get(URL.invitation.rewardRequest, null, true)
    if (!res.err) {
        message.success(t('message.invitationBanner.reward.success'));
    } else {
        message.error(t('message.invitationBanner.reward.failed'));
    }


    inviteStatistics.value = await getinvitationInfo();

    withdrawlLoading.value = false;
    openBonusCashout.value = false;
}



const selectByStatus = ref("按状态筛选");
const selectByMonth = ref("按月筛选");

const pageSize = 10;

const total = ref(0);

const current = ref(1);
const dataSource = ref([
    {
        queryDate: '2024-12-28 07:24',
        status: "已支付",
        invitedPhoneNumber: '151****1712',
        rewardAmount: '+$2.00',
    }
]);


const update = async ([current, selectByStatus, selectByMonth]) => {
    loading.value = true;
    const res = await post(URL.invitation.invitationList, {
        pageSize: pageSize,
        pageNum: current,
        invitationType: status_to_number[selectByStatus],
        month: date_to_number(selectByMonth)

    }, true)
    if (res.err) {
        message.error('获取邀请信息失败')
    } else {
        dataSource.value = res.rows.map((item) => {

            const formattedDate = new Date(item.queryDate);
            const year = formattedDate.getFullYear();
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const day = String(formattedDate.getDate()).padStart(2, '0');
            const hours = String(formattedDate.getHours()).padStart(2, '0');
            const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
            const formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}`;

            return {
                queryDate: formattedDateString,
                status: item.status,
                invitedPhoneNumber: item.invitedPhoneNumber,
                rewardAmount: item.rewardAmount,
            }
        });
        total.value = res.total;
    }
    loading.value = false;
}


watch([current, selectByStatus, selectByMonth], (val) => update(val), { immediate: true })

watchEffect(async () => {
    const res = (await get(URL.invitation.summary, null, true))
    if (res.err) {
        message.error('获取邀请信息失败')
    } else {
        inviteStatistics.value = res.data;
    }
});

const statusMap = {
    all: '全部',
    registered: '仅注册',
    unpaid: '未支付',
    paid: '已支付'
};
const { toClipboard } = useClipboard();

const copyInviteCode = async () => {
    try {
        await toClipboard(`${URL.frontend}?refId=${inviteStatistics.value.inviteCode}`);
        message.success(t('message.invitationBanner.copy.success'));
    } catch (error) {
        message.error(t('message.invitationBanner.copy.failed'));
    }
};


const rotateDegree = ref(0)
const rotate = () => {
    rotateDegree.value += 360
}


const handleOpenChangeInvitationCode = () => {
    open.value = true;
    inviteCodeModal.value = inviteStatistics.value.inviteCode;
}


const handleModifyInviteCode = async () => {

    if (inviteCodeModal.value === inviteStatistics.value.inviteCode) {
        message.error('请输入新的邀请码');
        return;
    }

    const inviteCodePattern = /^[a-zA-Z0-9]{6}$/;
    if (!inviteCodePattern.test(inviteCodeModal.value)) {
        message.error('邀请码必须是6位数字和字母的组合');
        return;
    }

    const res = await post(URL.invitation.changeInvitationCode, { invitationCode: inviteCodeModal.value }, true)
    if (!res.err) {
        message.success('修改成功');

        const res = await get(URL.invitation.summary, null, true)
        if (!res.err) {
            inviteStatistics.value = res.data;
        }


    } else {
        message.error('修改失败');
    }

    open.value = false;
};


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





const invitationTypeNumber = computed(selectByStatus, () => {
    return status_to_number[selectByStatus.value]
}, { immediate: true })

const onClickStatus = ({ key }) => {
    selectByStatus.value = statusMap[key];
};

const onClickTime = ({ key }) => {
    selectByMonth.value = months.value[key];
};


//FIXME: finish i18n here

const columns = ref([
    {
        title: 'message.invitation.table.columns.date',
        dataIndex: 'queryDate',
        key: 'queryDate',
        sorter: (a, b) => a.queryDate.localeCompare(b.queryDate),
      
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '被邀请人',
        dataIndex: 'invitedPhoneNumber',
        key: 'inviteePhoneNumber',
    },
    {
        title: '奖励金额',
        dataIndex: 'rewardAmount',
        key: 'rewardAmount',
    }

])

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


const handleOpenWithdrewRewardAmount = () => {
    openBonusCashout.value = true;
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
                    {{ t('message.invitation.code') }}
                </div>
                <div class="flex flex-row justify-between  py-5">
                    <div class="flex flex-row">
                        <div class="text-3xl font-semibold text-black">{{ inviteStatistics.inviteCode }}</div>
                        <img src="/invitation/change_code.png" class="w-7 h-7 ml-2 mt-1 cursor-pointer"
                            @click="handleOpenChangeInvitationCode">
                    </div>
                    <div>
                        <button @click="() => copyInviteCode()"
                            class="bg-[#eeeeee] text-black px-8 py-3 rounded-lg duration-100 cursor-pointer text-xl font-normal">
                            {{ t('message.invitation.copyLink') }}
                        </button>
                    </div>
                </div>
                <div class="text-[#979797] text-xl font-normal">
                    {{ t('message.invitation.reward') }}
                </div>
            </div>
            <div class="flex flex-col w-[60%] border-b-[1px] p-10">
                <div class="text-black text-xl">
                    {{ t('message.invitation.balance') }}
                </div>
                <div class="flex flex-row justify-between py-5">
                    <div class="flex flex-row">
                        <div class="text-3xl font-semibold text-black">${{ inviteStatistics.rewardBalance }}</div>
                    </div>
                    <div>

                        <button @click="handleOpenWithdrewRewardAmount"
                            class="bg-[#3189ef] text-white px-6 py-2 rounded-lg duration-100 cursor-pointer">
                            {{ t('message.invitation.withdraw') }}
                        </button>

                        <GeneralModal :maskClosable="false" v-model:open='openBonusCashout' width="29.1667vw"
                            :centered="true">
                            <div class="flex flex-col items-center justify-center gap-y-4 pt-8 px-8">
                                <p class="text-[1.458333vw]">{{ t('message.invitationBanner.withdrawal.title') }}</p>
                                <p class="text-[0.8vw]">{{ t('message.invitationBanner.withdrawal.subtitle') }}</p>
                                <p class="font-bold text-[2.08333vw]">${{ Number(
                                    inviteStatistics.rewardBalance.toFixed(2)).toFixed(2) }}</p>
                            </div>
                            <template #footer>
                                <div class="flex flex-row items-center justify-center gap-x-4 mt-12 px-8 pb-8 ">
                                    <Spin :spinning="withdrawlLoading">
                                        <button @click="handleBonusCashout"
                                            :class="`text-[1.04167vw] w-[14.0625vw] h-[2.70833vw]  rounded-xl ${inviteStatistics.rewardBalance <= 0 ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-blue-500 hover:bg-blue-400 text-white'} duration-100 `">{{
                                                t('message.invitationBanner.withdrawal.withdrawAll') }}</button>
                                    </Spin>

                                </div>
                            </template>
                        </GeneralModal>
                    </div>
                </div>
                <div class="flex flex-row w-full justify-between mt-5">
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">{{ inviteStatistics.monthlyReferrals }}</div>
                        <div class="text-xl text-[#979797] font-normal">{{
                            t('message.invitation.stats.monthlyReferrals') }}</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">{{ inviteStatistics.totalReferrals }}</div>
                        <div class="text-xl text-[#979797] font-normal">{{ t('message.invitation.stats.totalReferrals')
                            }}</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">{{ inviteStatistics.rechargedUsers }}</div>
                        <div class="text-xl text-[#979797] font-normal">{{ t('message.invitation.stats.rechargedUsers')
                            }}</div>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-2xl text-black font-bold">${{ inviteStatistics.totalRewardAmount }}</div>
                        <div class="text-xl text-[#979797] font-normal">{{ t('message.invitation.stats.totalReward') }}
                        </div>
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
                        <span @click="() => update([current, selectByStatus, selectByMonth])" class="text-lg">刷新</span>
                    </div>
                </div>
            </div>
            <div class="rounded-lg overflow-hidden shadow-sm w-[90%] ">
                <Table 
                :showSorterTooltip = "false"
                
                :loading="loading" @change="(pagination, filters, sorter, { action, currentDataSource }) => {
                    current = pagination.current
                }" :pagination="{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                }" :dataSource="dataSource" :columns="columns" class="w-full " bordered>


                    <template v-slot:headerCell="{ column }">
                        <div class="text-lg py-2 px-1">
                            {{ t(column.title) }}
                        </div>
                    </template>


                </Table>
            </div>
        </div>


        <GeneralModal width="29.1667vw" v-model:open="open" :centered="true">
            <div class="p-8 flex flex-col gap-y-2 items-center justify-center">
                <div class="text-[1.458333vw]">
                    {{ t('message.invitation.modal.changeCode.title') }}
                </div>
                <div class="flex flex-col items-start gap-y-4 w-full">
                    <div class="text-gray-500 text-[.833333vw]">
                        {{ t('message.invitation.modal.changeCode.label') }}
                    </div>
                    <Input allowClear v-model:value="inviteCodeModal"
                        class="text-[.9375vw] font-semibold customer-input" />

                </div>
            </div>

            <template #footer>
                <div class="flex justify-center items-center gap-x-4 m-4">
                    <button @click="open = false"
                        class="h-[2.708333vw] text-[1.041667vw] w-[100%] rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200">{{
                            t('message.invitation.modal.changeCode.cancel') }}</button>
                    <button @click="handleModifyInviteCode"
                        :class="`h-[2.708333vw] text-[1.041667vw] w-[100%] rounded-xl transition-colors duration-200 ${(inviteStatistics.inviteCode ?? '').length > 0 ? ' bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-200 cursor-not-allowed text-gray-500'}`">{{
                            t('message.invitation.modal.changeCode.confirm') }}</button>
                </div>
            </template>
        </GeneralModal>
        <GeneralModal v-model:open='openRewardShow' width="29.1667vw" @close="handleCloseWithdrewRewardAmount"
            :centered="true">
            <template #default>
                <div class="flex flex-col items-center justify-center gap-y-4 pt-6 px-8">
                    <p class="text-[1.458333vw]">{{ t('message.invitation.modal.withdraw.title') }}</p>
                    <p class="text-[0.8vw]">{{ t('message.invitation.modal.withdraw.available') }}</p>
                    <p class="font-bold text-[2.08333vw]">${{ Number(inviteStatistics.rewardBalance).toFixed(2) }}</p>
                </div>
            </template>
            <template #footer>
                <div class="flex flex-row items-center justify-center gap-x-4 mt-12 px-8 pb-8 ">
                    <button
                        :class='`text-[1.04167vw] w-[14.0625vw] h-[2.70833vw] rounded-xl   ${rewardAmount === 0 ? "disabled cursor-not-allowed bg-gray-100 text-gray-400" : " duration-100 bg-blue-500 hover:bg-blue-400 text-white"}`'>{{
                            t('message.invitation.modal.withdraw.withdrawAll') }}</button>
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


::v-deep(.ant-table-wrapper .ant-table-cell) {
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
<script setup>
import { EditOutlined } from '@ant-design/icons-vue';
import { inject, ref, watch } from 'vue';
import { Input, message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import post from '../../api/post';
import URL from '../../api/api-list';

const circleImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA8CAMAAADi4EJ+AAAAbFBMVEUAAAAgt1kgt1ggtVggt1ogr1Agt1ggtlggtVkgt1ggt1kgt1ggtlgguFkgt1kgt1kguFYgr2Agtlkgr1ggt1ggtlkgtlYgt1n///+Q26zx+/RKxHjV8eAuu2Nv0ZTj9uqd37eC16I8wG1YyYI+hkolAAAAF3RSTlMA3yBA7xCfoIBgv7+Qr0/vMBDPIIBwcDNAAXoAAAFdSURBVEjH3dfLcoMwDAXQgA3BYAhN2sqQhjz6///YRQaUGWlubS9zd1mckeJBWOzeM9XJGDNWGdD41tIztvUmxZr6KTm2NrG2JS2Fy7Lsy/+wJ5QG2vJIOMcS4AJA0T3EmGOMOcaYV4reU2x6iR3F5yujb86hSusbPzUlieDi6aXv8/WhFi8i8BRCuGnFXSQOy/rLqI1jPNGa+kXbVEwHxmM05pw2PaRjcptu0jE12qH9Lhgrx9bRmiWEnwvAnF7RU2AOMbWKfszMJdZ1T1vOzCXW9Z4EV7F+ag1pnDEecUcKx5gG9d3AHGIa1SlhfkO40CeUuYbVCR1IcIxpeNEfVnKBReNgys7X+U4EG+fiJHMBM1um7Ay4NP/zzEv4O0Er21Of0zf3nnz7528emGOMOcaY420P5RNiDy0u38Vs2a7QrYvd0MV9bntRF2XwnV1l503Ox8lojCmr3RvmDwiDwPS6BT/YAAAAAElFTkSuQmCC'

const currentPlan = ref(0);
const { t } = useI18n();

const updateParentInviteCode = inject("updateParentInviteCode");

const yearTerm = inject('yearTerm');


const editMode = ref(false);

const { promo, parentInviteCode } = defineProps(['promo', 'parentInviteCode']);
const newParentInviteCode = ref();


const handleOpenEditMode = ()=>{
    newParentInviteCode.value = parentInviteCode;
    editMode.value = true;
}


const handleExitEditMode = async ()=>{
    if(newParentInviteCode.value === parentInviteCode){
        editMode.value = false;
        return
    }else{
        const res = await post(URL.card.changeInviteRelation, {
            newInviteCode: newParentInviteCode.value
        })
        if(res.err){
            message.error("修改失败")
            return
        }else{
            message.success("修改成功")
            await updateParentInviteCode();

            editMode.value = false;
        }
    }
}

const rate = [
    {
        duration: 2,
        price: 14.99
    },
    {
        duration: 1,
        price: 9.99
    }
]


const handleClick = (idx) => {
    currentPlan.value = idx;
    yearTerm.value = rate[idx].duration;
}

</script>

<template>
    <div class="flex flex-row w-full items-center justify-between h-full ">

        <div class="flex flex-col items-start justify-start w-[45%] gap-y-4 px-12">
            <div class="text-2xl font-bold">
                {{ t('message.cardDurationSelection.title') }}
            </div>

            <div v-for="(item, idx) in rate" :key="idx" class="w-full">
                <div @click="() => handleClick(idx)"
                    :class="`cursor-pointer tracking-wide text-2xl flex border w-full rounded-lg px-12 h-24 justify-between duration-75 items-center ${rate[currentPlan].duration === item.duration ? 'border-blue-500' : 'border-gray-100'}`">
                    <span class="first-letter:font-semibold">{{ item.duration }}{{ t('message.cardDurationSelection.year') }}</span>
                    <span class="font-semibold ">${{ item.price }}</span>
                </div>
            </div>
            <div v-if="promo"
                class="flex mt-6 flex-row items-center justify-between rounded-xl border w-full border-[rgb(238,238,238)] px-6 py-6">
                <template v-if="!editMode">
                    <div class="flex flex-row items-center gap-x-2  text-[#11a560]">
                        <img class="w-[36px] h-[36px]" :src="circleImg" /> {{ t('message.cardDurationSelection.inviteCode.used') }}
                    </div>
                    <div class="font-bold gap-x-2 flex flex-row items-center">
                        {{ parentInviteCode }}
                        <EditOutlined @click="handleOpenEditMode" class="text-blue-500 cursor-pointer" />
                    </div>
                </template>
                <template v-else>
                    <div class="flex flex-row items-center gap-x-10 w-full">
                        <Input size="large" v-model:value="newParentInviteCode" class="w-full flex-grow"/>
                        <!-- <EditOutlined @click="handleExitEditMode" class="text-blue-500 cursor-pointer" /> -->
                    <a  @click="handleExitEditMode" class="cursor-pointer inline text-sky-500 min-w-8 ">{{ t('message.cardDurationSelection.inviteCode.confirm') }}</a>
                    </div>
                    
                </template>

            </div>

        </div>
        <div class="w-[45%] h-full flex flex-col items-center justify-start p-12 py-4 rounded-r-lg"
            style="background: linear-gradient(180deg, rgba(193,236,255,1) 0%, rgba(255,255,255,1) 100%);">
            <img src="/card-wildcard.webp" alt="card-wildcard" class="w-2/3" />
            <div class="flex flex-col items-center justify-center gap-y-2">
                <!-- <div class="font-semibold text-normal">
                    开卡费用
                </div> -->
                <div class="flex flex-col items-center gap-y-4">
                    <div>
                        <span class="font-bold text-4xl">$</span>
                        <span class="font-bold text-5xl">{{ rate[currentPlan].price - (promo ? 1 : 0) }}</span>
                    </div>

                    <div v-if="promo" class="text-lg font-light">
                        {{ t('message.cardDurationSelection.pricing.membershipFee') }} <span class=" font-semibold">${{ rate[currentPlan].price.toFixed(2) }}</span> - {{ t('message.cardDurationSelection.pricing.inviteReward') }} <span
                            class=" font-semibold">$1.00</span>
                    </div>
                    <div class="flex flex-col items-start gap-y-2">
                        <div class="text-xl font-semibold">
                            {{ t('message.cardDurationSelection.pricing.notice.title') }}
                        </div>
                        <div class="text-[#585858] tracking-wider space-y-1">
                            <div class="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                                {{ t('message.cardDurationSelection.pricing.notice.serviceFee.A') }}<span class="text-[#f28d00]">  {{ t('message.cardDurationSelection.pricing.notice.serviceFee.B') }}</span>
                            </div>
                            <div class="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                                {{ t('message.cardDurationSelection.pricing.notice.warning') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>
<script setup>

import { Input } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const firstName = defineModel('firstName');


const lastName = defineModel('lastName');


</script>


<template>

    <div class=" w-full h-full flex items-center justify-center">


        <div
            class=" w-full py-6  flex flex-col items-center justify-center text-xl gap-y-6 rounded-xl">


            <div class="flex flex-col items-center gap-y-2 w-2/3">
                <div class="w-full flex flex-row items-center justify-center">
                    <img src="/userinfo.png" alt="userinfo" class="w-8 h-8" />
                    <div class="text-2xl">
                        {{ t('message.userInfoInput.title') }}
                    </div>
                </div>

                <div class="text-md">
                    {{ t('message.userInfoInput.subtitle') }}
                </div>
            </div>

            <div class="flex flex-col items-start gap-y-2 w-1/3">
                <div>
                    {{ t('message.userInfoInput.firstName.label') }}
                </div>
                <Input v-model:value="firstName"/>
            </div>

            <div class="flex flex-col items-start gap-y-2 w-1/3">
                <div>
                    {{ t('message.userInfoInput.lastName.label') }}
                </div>
                <Input v-model:value="lastName"/>
            </div>


        </div>
    </div>

</template>

<style lang="css" scoped>
.card {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
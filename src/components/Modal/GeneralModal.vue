<template>
    <Modal 
    v-if="innerOpen"
    :maskStyle = "{backgroundColor: 'rgba(0, 0, 0, 0)'}"
    wrapClassName="" 
    :maskClosable="maskClosable"
    :mask="true" v-model:open="innerOpen" :width="width" :centered="centered" :bodyStyle="bodyStyle"
        :class="modalClass" :confirmLoading="true"
        @cancel="handleClose"
        @close="handleClose">
        <template #title>
            <div class="flex flex-col items-center justify-center">
                <p v-if="mainTitle" class="title-style">{{ mainTitle }}</p>
                <p v-if="subTitle" class="subtitle-style">{{ subTitle }}</p>
            </div>
        </template>

        <slot>
            <div class="p-4 text-center"></div>
        </slot>

        <template #footer>
            <slot name="footer"></slot>
           
        </template>
    </Modal>
</template>

<script setup>
import { Modal } from 'ant-design-vue';
import { watch, ref, onMounted } from 'vue';
import { inject } from 'vue';
import ForceLightOff from '../login-register/ForceLightOff.vue';

const {
    turnOnLight,
    turnOffLight
} = inject('lightSwitch');

// const turnOnLight = () => {};
// const turnOffLight = () => {};

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    mainTitle: {
        type: String,
        default: ''
    },
    subTitle: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '400px'
    },
    centered: {
        type: Boolean,
        default: true
    },
    modalClass: {
        type: String,
        default: ''
    },
    bodyStyle: { 
        type: Object,
        default: () => ({})
    },
    maskClosable:{
        type: Boolean,
        default: true
    },
    onClose: {
        type: Function,
        default: () => {}
    }
});

const emit = defineEmits(['update:open', 'close']);

const innerOpen = ref(props.open);




watch(
    () => props.open,
    (newVal) => {
        innerOpen.value = newVal;
        if (newVal) {
            turnOffLight();
        } else {
            turnOnLight();
        }
    },{
        immediate: true
    }
);

function handleClose() {
    innerOpen.value = false;
    turnOnLight();
    emit('update:open', false);
    emit('close');
    props.onClose();
}
</script>

<style lang="less">
.ant-modal .ant-modal-content {
    border-radius: 25px !important;
}

.title-style {
    font-size: 1.458333vw;
    font-weight: 500;
    padding-top: 1vw;
    padding-bottom: 0.5vw;
}

.subtitle-style {
    font-size: 0.8vw;
    font-weight: 500;
    color: grey;
}


// :deep(.ant-modal-root .ant-modal-mask){
//     background-color: rgba(0, 0, 0, 0) !important;
// }
</style>

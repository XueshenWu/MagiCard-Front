<template>


    <Modal  wrapClassName=" " getContainer="#scale-container" :mask="false" v-model:open="innerOpen" :width="width"
        :centered="centered" :class="modalClass" @cancel="handleClose" @close="handleClose" :title="title">

        <slot>
            <div class="p-4 text-center"></div>
        </slot>
        <template #footer>
            <slot name="footer">

            </slot>
        </template>
    </Modal>


</template>

<script setup>
import { Modal } from 'ant-design-vue';
import { watch, ref } from 'vue'
import { inject } from 'vue';

const {
    turnOnLight,
    turnOffLight
} = inject('lightSwitch');

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '400px'
    },
    centered: {
        type: Boolean,
        default: false
    },
    modalClass: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:open'])


const innerOpen = ref(props.open)

watch(
    () => props.open,
    (newVal) => {
        innerOpen.value = newVal;
        (newVal) ? turnOffLight() : turnOnLight()
    }
)

function handleClose() {
    innerOpen.value = false;
    turnOnLight()
    emit('update:open', false)
    emit('close');
}
</script>

<style lang="less">
.ant-modal .ant-modal-content {
    border-radius: 25px !important;
}
</style>
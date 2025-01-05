<template>
    <div class="flex items-center justify-center gap-2">
        <div v-for="(digit, index) in otpArray" :key="index" class="relative">
            <input type="text" :ref="el => inputRefs[index] = el" v-model="otpArray[index]" maxlength="1"
                class="w-[2.29vw] h-[2.29vw] text-center text-lg border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
                @input="handleInput($event, index)" @keydown="handleKeydown($event, index)" @paste="handlePaste"
                @focus="$event.target.select()" inputmode="numeric" pattern="[0-9]*">
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    length: {
        type: Number,
        default: 6
    },
    value: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:value'])

const otpArray = ref(Array(props.length).fill(''))
const inputRefs = ref([])

watch(() => props.value, (newValue) => {
    if (newValue) {
        otpArray.value = newValue.split('').slice(0, props.length)
        while (otpArray.value.length < props.length) {
            otpArray.value.push('')
        }
    } else {
        otpArray.value = Array(props.length).fill('')
    }
}, { immediate: true })

const updatevalue = () => {
    emit('update:value', otpArray.value.join(''))
}

const handleInput = (event, index) => {
    const input = event.target
    let value = input.value

    // Allow only numbers
    value = value.replace(/[^0-9]/g, '')
    otpArray.value[index] = value

    // Move to next input if value is entered
    if (value && index < props.length - 1) {
        inputRefs.value[index + 1].focus()
    }

    updatevalue()
}

const handleKeydown = (event, index) => {
    // Handle backspace
    if (event.key === 'Backspace' && !otpArray.value[index] && index > 0) {
        inputRefs.value[index - 1].focus()
    }
}

const handlePaste = (event) => {
    event.preventDefault()
    const pastedData = event.clipboardData.getData('text')
    const numbers = pastedData.replace(/[^0-9]/g, '').split('')

    for (let i = 0; i < props.length && i < numbers.length; i++) {
        otpArray.value[i] = numbers[i]
    }

    if (numbers.length > 0) {
        inputRefs.value[Math.min(numbers.length, props.length) - 1].focus()
    }

    updatevalue()
}
</script>
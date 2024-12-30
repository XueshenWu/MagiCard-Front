<!-- NumberInput.vue -->
<template>
    <div class="relative">
      <input
        type="number"
        :value="modelValue"
        @input="updateValue($event)"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :class="[
          'w-full px-11 py-2 border rounded-lg outline-none transition-all duration-200',
          'focus:ring-2 focus:ring-blue-200',
          'placeholder:text-gray-400',
          status === 'error'
            ? 'border-red-500 hover:border-red-600'
            : 'border-gray-300 hover:border-gray-400',
          className
        ]"
        step="1"
        min="0"
      />
      <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <slot name="prefix">
          <span class="text-gray-400">$</span>
        </slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: {
      type: [Number, String],
      default: '',
    },
    status: {
      type: String,
      default: '',
      validator: (value) => ['', 'error'].includes(value),
    },
    className: {
      type: String,
      default: '',
    },
    maxLength: {
      type: [Number, String],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const updateValue = (event) => {
    const value = event.target.value
    emit('update:modelValue', value === '' ? '' : Number(value))
  }
  </script>
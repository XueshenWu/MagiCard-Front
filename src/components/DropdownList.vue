<!-- CustomDropdown.vue -->
<template>
    <div class="relative" :class="className">
      <button
        @click="isOpen = !isOpen"
        class="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{'border-gray-300': !isOpen, 'border-blue-500': isOpen}"
      >
        <div class="flex items-center justify-between">
          <slot v-if="value !== null" :value="value">
            {{ value }}
          </slot>
          <span v-else class="text-gray-500">Select an option</span>
          <svg
            class="w-5 h-5 text-gray-400"
            :class="{'transform rotate-180': isOpen}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
  
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
      >
        <ul class="py-1 overflow-auto max-h-60">
          <slot></slot>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref,onMounted, onUnmounted } from 'vue'
  
  const props = defineProps({
    value: {
      type: [String, Number, Object],
      default: null
    },
    className: {
      type: String,
      default: ''
    }
  })
  
  const emit = defineEmits(['update:value'])
  const isOpen = ref(false)
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
      isOpen.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>
  

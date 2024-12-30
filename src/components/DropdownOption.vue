

<!-- DropdownOption.vue -->
  <template>
    <li
      @click="selectOption"
      class="px-4 py-2 cursor-pointer hover:bg-gray-100"
      :class="{'bg-gray-50': isSelected}"
    >
      <slot></slot>
    </li>
  </template>
  
  <script setup>


  import { defineProps, defineEmits } from 'vue'
  

  const props = defineProps({
    value: {
      type: [String, Number, Object],
      required: true
    }
  })
  
  const emit = defineEmits(['select'])
  
  const selectOption = () => {
    emit('select', props.value)
  }
  </script>
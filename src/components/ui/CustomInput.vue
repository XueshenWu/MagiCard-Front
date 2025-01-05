<template>
  <a-input
    v-bind="validInputProps"
    v-model:value="value"
    :allowClear="allowClear"
    class="custom-input"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </a-input>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue';

export default defineComponent({
  name: 'CustomInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    inputProps: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const { value, inputProps } = toRefs(props);

    const validInputProps = computed(() => {
      // 过滤 inputProps，仅保留合法的键名
      return Object.fromEntries(
        Object.entries(inputProps.value || {}).filter(([key]) =>
          /^[a-zA-Z_][\w\-]*$/.test(key)
        )
      );
    });

    const updateValue = (newValue) => {
      emit('update:value', newValue);
    };

    return {
      value,
      validInputProps,
      updateValue,
    };
  },
});
</script>

<style scoped >
.custom-input {
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  ::deep(.ant-input-affix-wrapper:hover) {
    border: 1px solid black;
  border-color: black !important;
}
}
</style>

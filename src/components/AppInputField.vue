<template>
  <label class="group text-gray-500 bg-white border border-gray-500 relative block rounded-2xl">
    <input
        v-bind="attrs"
        v-model="localValue"
        class="relative min-h-[3rem] z-1 block input-field px-4 w-full rounded-[inherit]"
        placeholder=" "
    >
    <span class="absolute text-sm text-gray-400 input-label transition top-1/2 left-4 -translate-y-6">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import {computed, useAttrs} from "vue";

interface AppInputFieldProps {
  label: string;
  modelValue: string;
}

interface AppInputFieldEmits {
  (e: 'update:modelValue', value: string): void;
}

const attrs = useAttrs();
const props = defineProps<AppInputFieldProps>();
const emit = defineEmits<AppInputFieldEmits>();

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
})
</script>

<style lang="scss" scoped>
.input {
  &-field:placeholder-shown:not(:focus) + &-label {
    @apply -translate-y-1/2 text-lg
  }
}
</style>

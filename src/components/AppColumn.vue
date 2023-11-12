<template>
  <div
      class="bg-gray-100 rounded-2xl border border-slate-100 flex"
      :class="{
        'flex-shrink-0 flex-grow-0 w-1/2 lg:w-1/3': appearance === 'small',
        'flex-grow': appearance === 'normal',
      }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface AppColumnProps {
  appearance?: 'small' | 'normal';
}

withDefaults(defineProps<AppColumnProps>(), {
  appearance: 'normal',
});
</script>

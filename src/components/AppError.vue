<template>
  <div class="text-red-500 font-medium px-4 py-10">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
interface AppErrorProps {
  text: string | null;
}

defineProps<AppErrorProps>();
</script>

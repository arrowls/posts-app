<template>
<div class="flex gap-2 text-white font-medium">
  <button
      v-for="number in paginationArray"
      :key="number"
      class="rounded p-4 flex justify-center items-center opacity-90 hover:opacity-80 active:opacity-100 transition"
      :class="[ page === number ? 'bg-sky-800 shadow' : 'bg-sky-700']"
      @click="emit('update:page', number)"
  >
    {{ number + 1 }}
  </button>
</div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

interface AppPaginationProps {
  page: number;
  total: number;
}

interface AppPaginationEmits {
  (e: 'update:page', page: number): void;
}

const props = defineProps<AppPaginationProps>();
const emit = defineEmits<AppPaginationEmits>();

const paginationArray = computed<number[]>(
    () => Array(props.total).fill(0).map((_, id) => id),
)
</script>

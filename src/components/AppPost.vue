<template>
  <div class="shadow bg-white p-4 rounded-xl border border-transparent hover:border-sky-400 transition [&.sortable-chosen]:bg-slate-100">
    <h4 class="font-medium text-2xl" v-html="post.title" />
    <p class="text-lg mt-2 text-gray-500" v-html="post.body" />
  </div>
</template>

<script lang="ts" setup>
import { Post } from "@/stores/posts.ts";

defineProps<{
  post: Post;
}>();
</script>

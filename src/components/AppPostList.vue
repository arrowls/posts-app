<template>
  <div class="p-4">
    <p v-if="label" class="font-medium mb-3 text-2xl">
      {{ label }}
    </p>
    <draggable
        v-model="localPosts"
        group="posts"
        class="h-full"
        tag="transition-group"
        :animation="200"
        @start="isDragged = true"
        @end="isDragged = false"
        :component-data="draggableOptions"
    >
      <template #item="{ element }">
        <div :key="element.id" class="[&.sortable-ghost]:opacity-50">
          <AppPost
            :post="element"
            class="mt-2 cursor-move"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import {Post} from "@/stores/posts.ts";
import AppPost from "@/components/AppPost.vue";
import {computed, ref} from "vue";
import draggable from 'vuedraggable'

interface AppPostListProps {
  posts: Post[];
  label?: string;
}

interface AppPostListEmits {
  (e: 'update:posts', value: Post[]): void;
}

const props = withDefaults(defineProps<AppPostListProps>(), {
  label: '',
});

const emit = defineEmits<AppPostListEmits>();

const localPosts = computed({
  get: () => props.posts,
  set: (value) => emit('update:posts', value),
});

const isDragged = ref(false);
const draggableOptions = computed(() => ({
  tag: 'div',
  duration: 200,
  type: 'transition-group',
  css: isDragged.value,
}))
</script>

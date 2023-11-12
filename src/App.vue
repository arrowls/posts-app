<template>
  <div class="bg-white min-h-screen p-8">
    <div class="container">
      <AppInputField
          v-model="searchText"
          label="Поиск"
      />
      <div class="py-4 lg:py-8 flex gap-4">
        <div class="space-y-3 flex-grow">
          <AppColumn>
            <Transition name="fade" mode="out-in">
              <AppPreloader v-if="store.isLoading" />
              <AppPostList
                  v-else-if="posts.length"
                  v-model:posts="posts"
              />
              <AppError
                  :text="store.error"
                  v-else-if="store.error"
              />
              <div
                  class="font-medium text-gray-500 px-4 py-10"
                  v-else
              >
                Ничего не найдено
              </div>
            </Transition>
          </AppColumn>
          <AppPagination
              v-if="!store.isLoading && !store.error"
              v-model:page="page"
              :total="total"
          />
        </div>
        <AppColumn appearance="small">
          <AppPostList
              v-model:posts="store.favoritePosts"
              label="Избранное"
          />
        </AppColumn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {Post, usePostsStore} from "@/stores/posts.ts";
import AppPostList from "@/components/AppPostList.vue";
import AppPagination from "@/components/AppPagination.vue";
import AppInputField from "@/components/AppInputField.vue";
import AppPreloader from "@/components/AppPreloader.vue";
import AppColumn from "@/components/AppColumn.vue";
import AppError from "@/components/AppError.vue";

const store = usePostsStore();

const page = ref(0);
const total = computed(
    () => Math.ceil(store.posts.length / store.MAX_POSTS_PER_PAGE),
);

const bounds = computed<[number, number]>(() => [
  page.value * store.MAX_POSTS_PER_PAGE,
  (page.value + 1) * store.MAX_POSTS_PER_PAGE - 1
]);

const searchText = ref('');

const posts = computed<Post[]>({
  get: () => store.posts.slice(...bounds.value),
  set: (newValue: Post[]) => store.posts.splice(bounds.value[0], posts.value.length, ...newValue),
});

watch(page, () => window.scrollTo({ top: 0, behavior: 'smooth' }));
watch(searchText, store.updatePosts);
</script>

<style lang="scss">
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease-in;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>

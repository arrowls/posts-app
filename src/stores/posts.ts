import {defineStore} from 'pinia';
import {computed, Ref, ref, toValue} from 'vue';
import {getPosts} from '@/api';
import debounce from 'lodash/debounce';
import useLocalStorage from "@/composables/useLocalStorage.ts";

export interface Post {
    id: number;
    userId: number;
    body: string;
    title: string;
}

interface PostsStore {
    posts: Ref<Post[]>;
    favoritePosts: Ref<Post[]>;
    updatePosts: (title: string) => void;
    error: Ref<Error['message'] | null>;
    isLoading: Ref<boolean>;
    MAX_POSTS_PER_PAGE: number;
}

export const usePostsStore = defineStore('posts', (): PostsStore => {
    const MAX_POSTS_PER_PAGE = 10;

    const allPosts = ref<Post[]>([]);
    const storedPostsIds = useLocalStorage('favoritePosts');
    const posts = ref<Post[]>([]);
    const error = ref<Error['message'] | null>(null);
    const isLoading = ref(false);

    function setPosts(postItems: Post[]): void {
        posts.value = postItems.filter(({ id }) => !storedPostsIds.value.includes(id));
    }

    function updatePosts(title: string = ''): void {
        const postTitle = toValue(title).toLowerCase();
        const filteredPosts = posts.value.filter(
            ({ title, id }) => title.toLowerCase().includes(postTitle) && !storedPostsIds.value.includes(id),
        );

        if (filteredPosts.length >= MAX_POSTS_PER_PAGE) {
            setPosts(filteredPosts);
            return;
        }
        isLoading.value = true;
        getPosts(postTitle)
            .then((newPosts) => {
                if (!title) {
                    allPosts.value = newPosts;
                }
                setPosts(newPosts);
            })
            .catch((e) => error.value = e.message)
            .finally(() => isLoading.value = false);
    }
    updatePosts();

    const favoritePosts = computed<Post[]>({
        get: () => storedPostsIds.value
            .map((id: number) => allPosts.value.find((post) => post.id === id)!)
            .filter(Boolean),
        set: (newValue: Post[]) => {
            storedPostsIds.value = toValue(newValue).map(({ id }) => id);
        },
    });

    return {
        posts,
        favoritePosts,
        error,
        isLoading,
        updatePosts: debounce(updatePosts, 300),
        MAX_POSTS_PER_PAGE,
    };
})

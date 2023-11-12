import {computed, ref} from "vue";

export default function useLocalStorage(key: string) {
    const currentValue = ref<any[]>(JSON.parse(localStorage.getItem(key) || '[]') || []);
    return computed({
        get: () => currentValue.value,
        set: (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
            currentValue.value = newValue;
        },
    });
}

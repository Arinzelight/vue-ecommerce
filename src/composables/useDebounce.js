import { ref } from "vue";

export function useDebounce(fn, delay) {
  const timeout = ref(null);

  return function (...args) {
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

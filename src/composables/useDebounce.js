import { ref, watch} from 'vue';

export const useDebounce = (value, delay = 300) => {
  const debouncedValue = ref(value.value);
  let timer = null;

  watch(value, (newVal) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay);
  });

  return debouncedValue;
};

export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

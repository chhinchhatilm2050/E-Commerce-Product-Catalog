<template>
  <div class="relative w-full " ref="dropdownRef">
    <button type="button" @click="isOpen = !isOpen"
      class="w-full flex justify-between px-3 py-2 rounded-md border text-sm transition-all duration-200 input"
      :class="isOpen
      ? ' ring-2 ring-primary-300 dark:ring-primary-900 bg-white dark:bg-gray-900'
      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'"

    >
      <span class="text-gray-700 dark:text-gray-300">
        {{ selectedLabel }}
      </span>
      <i class="ri-arrow-down-s-line text-gray-400 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
      ></i>
    </button>
      <Transition name="dropdown">
        <ul
          v-if="isOpen"
          class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden"
        >
          <li
            v-for="option in options"
            :key="option.value"
            @click="select(option)"
            class="flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors duration-150"
            :class="option.value === modelValue
              ? 'bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 font-medium'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'"
          >
            {{$t(option.label) }}
            <i v-if="option.value === modelValue" class="ri-check-line text-primary-600 dark:text-primary-400"></i>
          </li>
        </ul>
      </Transition>
  </div>
</template>
<script setup>
  import {ref, computed} from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const props = defineProps({
    modelValue: { type: String, default: ''},
    options: {type: Array, required: true},
  });

  const emit = defineEmits(['update:modelValue'])

  const isOpen = ref(false);
  const dropdownRef = ref(null);

  const selectedLabel = computed(() => {
    const found = props.options.find(o => o.value === props.modelValue)
    return found ? t(found.label) : '';
  })

  const select = (option) => {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }

  onClickOutside(dropdownRef, () => isOpen.value = false)
</script>

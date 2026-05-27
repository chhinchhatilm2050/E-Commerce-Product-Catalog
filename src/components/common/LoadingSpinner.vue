<template>
  <div class="flex flex-col items-center justify-center py-20 gap-4">
    <div class="relative w-14 h-14">
      <div class="absolute inset-0 rounded-full border-4 border-primary-100"></div>
      <div class="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
    </div>
    <p v-if="message" class="text-sm text-gray-500 animate-pulse-soft">{{ message }}</p>
  </div>
</template>

<script setup>
  defineProps({
    message: { type: String, default: '' }
  })
</script>

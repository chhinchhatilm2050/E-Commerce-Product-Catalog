<template>
  <app-navbar />
  <router-view />
  <app-footer />
</template>
<script setup>
  import AppNavbar from './components/common/AppNavbar.vue';
  import AppFooter from './components/common/AppFooter.vue';
</script>

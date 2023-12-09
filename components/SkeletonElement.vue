<template>
  <span :class="{'placeholder animate-pulse': isLoading}">
    <slot />
  </span>
</template>

<script lang="ts" setup>
  const props = defineProps(['isLoading'])
</script>

<style scoped>
  .placeholder {
    background: lightgray;
    display: block;
    color: lightgray;
  }
</style>

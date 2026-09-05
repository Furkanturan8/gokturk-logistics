<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

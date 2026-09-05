<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('trackingCta.headline1')} ${t('trackingCta.headline2')} — GÖKTÜRK LOJİSTİK`,
  description: () => t('trackingCta.body'),
})
</script>

<template>
  <div>
    <AppNavigation />
    <main class="pt-20">
      <ShipmentTracker />
      <FreightCalculator />
    </main>
    <AppFooter />
  </div>
</template>

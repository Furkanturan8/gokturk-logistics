<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
})
</script>

<template>
  <div>
    <AppNavigation />
    <main>
      <HeroSection />
      <BrandStatement />
      <NetworkMap />
      <FleetShowcase />
      <ServicesSection />
      <OperationsDashboard />
      <JourneyTimeline />
      <GeographicNetwork />
      <DriverSection />
      <FinalCTA />
    </main>
    <AppFooter />
  </div>
</template>

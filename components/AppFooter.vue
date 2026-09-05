<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const year = new Date().getFullYear()

const corporateLinks = computed(() => [
  { label: t('footer.corporateLinks.network'), href: '#ag' },
  { label: t('footer.corporateLinks.services'), href: '#hizmetler' },
  { label: t('footer.corporateLinks.fleet'), href: '#filo' },
  { label: t('footer.corporateLinks.about'), href: '#insan' },
  { label: t('footer.corporateLinks.tracking'), href: '/takip-hesaplama' },
])

const regionLinks = computed(() => [
  { label: t('footer.regions.turkey'), href: '#ag' },
  { label: t('footer.regions.europe'), href: '#ag' },
  { label: t('footer.regions.caucasus'), href: '#ag' },
  { label: t('footer.regions.centralAsia'), href: '#ag' },
])

const linkColumns = computed(() => [
  { title: t('footer.corporateTitle'), links: corporateLinks.value },
  { title: t('footer.regionsTitle'), links: regionLinks.value },
])

function goTo(href: string) {
  if (href.startsWith('/')) {
    navigateTo(href)
    return
  }
  if (route.path !== '/') {
    navigateTo(`/${href}`)
    return
  }
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

function displayHref(href: string) {
  return href.startsWith('/') ? useBaseUrl(href) : href
}
</script>

<template>
  <footer id="footer" class="relative border-t border-white/10 bg-ink-900 pt-20">
    <div class="section-pad container-edge">
      <div class="grid gap-12 pb-16 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="font-display text-3xl font-extrabold leading-none text-bone-100">GÖKTÜRK</p>
          <p class="font-display text-sm font-semibold tracking-widest2 text-rust-400">LOJİSTİK</p>
          <p class="mt-6 max-w-xs text-xs uppercase tracking-widest2 text-steel-400">{{ t('footer.tagline') }}</p>
          <p class="mt-8 max-w-sm text-sm leading-relaxed text-bone-300">
            {{ t('footer.body') }}
          </p>
        </div>

        <div v-for="column in linkColumns" :key="column.title" class="lg:col-span-2">
          <p class="text-[0.62rem] uppercase tracking-widest2 text-steel-400">{{ column.title }}</p>
          <ul class="mt-5 space-y-3">
            <li v-for="link in column.links" :key="link.label">
              <a
                :href="displayHref(link.href)"
                class="text-sm text-bone-300 transition-colors duration-300 hover:text-rust-400"
                @click.prevent="goTo(link.href)"
              >{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-3">
          <p class="text-[0.62rem] uppercase tracking-widest2 text-steel-400">{{ t('footer.contactTitle') }}</p>
          <ul class="mt-5 space-y-3 text-sm text-bone-300">
            <li>{{ t('footer.address') }}</li>
            <li>info@gokturklojistik.com.tr</li>
            <li>+90 (224) 000 00 00</li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col gap-4 border-t border-white/10 py-8 text-[0.65rem] uppercase tracking-widest2 text-steel-500 md:flex-row md:items-center md:justify-between">
        <p>© {{ year }} GÖKTÜRK LOJİSTİK. {{ t('footer.rights') }}</p>
        <p>{{ t('footer.bottomTagline') }}</p>
      </div>
    </div>
  </footer>
</template>

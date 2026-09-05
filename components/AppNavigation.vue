<script setup lang="ts">
const { t, locale, setLocale } = useI18n()

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navLinks = computed(() => [
  { label: t('nav.home'), href: '#hero' },
  { label: t('nav.network'), href: '#ag' },
  { label: t('nav.services'), href: '#hizmetler' },
  { label: t('nav.fleet'), href: '#filo' },
  { label: t('nav.tracking'), href: '/takip-hesaplama' },
  { label: t('nav.about'), href: '#insan' },
])

function displayHref(href: string) {
  return href.startsWith('/') ? useBaseUrl(href) : href
}

function toggleLocale() {
  setLocale(locale.value === 'tr' ? 'en' : 'tr')
}

function handleScroll() {
  isScrolled.value = window.scrollY > 40
}

function closeMenu() {
  isMenuOpen.value = false
}

function goTo(href: string) {
  closeMenu()
  if (href.startsWith('/')) {
    navigateTo(href)
    return
  }
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(isMenuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic"
    :class="isScrolled || isMenuOpen ? 'bg-ink-900/85 backdrop-blur-md border-b border-white/5' : 'bg-transparent'"
  >
    <nav class="section-pad container-edge flex h-20 items-center justify-between">
      <a href="#hero" class="flex flex-col leading-none" @click.prevent="goTo('#hero')">
        <span class="font-display text-lg font-extrabold tracking-tight text-bone-100">GÖKTÜRK</span>
        <span class="font-display text-[0.65rem] font-semibold tracking-widest2 text-rust-400">LOJİSTİK</span>
      </a>

      <ul class="hidden items-center gap-9 lg:flex">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="displayHref(link.href)"
            class="text-[0.7rem] font-semibold uppercase tracking-widest2 text-bone-300 transition-colors duration-300 hover:text-rust-400"
            @click.prevent="goTo(link.href)"
          >{{ link.label }}</a>
        </li>
      </ul>

      <div class="flex items-center gap-4">
        <button
          class="hidden items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-widest2 lg:flex"
          type="button"
          @click="toggleLocale"
        >
          <span :class="locale === 'tr' ? 'text-bone-100' : 'text-steel-500 hover:text-bone-300'">TR</span>
          <span class="text-steel-600">/</span>
          <span :class="locale === 'en' ? 'text-bone-100' : 'text-steel-500 hover:text-bone-300'">EN</span>
        </button>

        <a href="#teklif" class="btn-solid !hidden lg:!inline-flex" @click.prevent="goTo('#teklif')">{{ t('nav.cta') }}</a>

        <button
          class="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          :aria-expanded="isMenuOpen"
          :aria-label="t('nav.menuToggle')"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="h-px w-6 bg-bone-100 transition-transform duration-300" :class="isMenuOpen ? 'translate-y-[6.5px] rotate-45' : ''" />
          <span class="h-px w-6 bg-bone-100 transition-opacity duration-300" :class="isMenuOpen ? 'opacity-0' : ''" />
          <span class="h-px w-6 bg-bone-100 transition-transform duration-300" :class="isMenuOpen ? '-translate-y-[6.5px] -rotate-45' : ''" />
        </button>
      </div>
    </nav>
  </header>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-400 ease-cinematic"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-300 ease-cinematic"
      leave-to-class="opacity-0"
    >
      <div v-if="isMenuOpen" class="fixed inset-0 top-20 z-40 flex flex-col justify-between bg-ink-900 lg:hidden">
        <ul class="section-pad flex flex-1 flex-col justify-start gap-2 overflow-y-auto pt-10">
          <li v-for="(link, i) in navLinks" :key="link.href">
            <a
              :href="displayHref(link.href)"
              class="block border-b border-white/5 py-4 font-display text-3xl font-bold text-bone-100 transition-colors duration-300 hover:text-rust-400"
              :style="{ transitionDelay: `${i * 40}ms` }"
              @click.prevent="goTo(link.href)"
            >{{ link.label }}</a>
          </li>
        </ul>
        <div class="section-pad flex items-center justify-between gap-4 pb-10">
          <button
            class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest2"
            type="button"
            @click="toggleLocale"
          >
            <span :class="locale === 'tr' ? 'text-bone-100' : 'text-steel-500'">TR</span>
            <span class="text-steel-600">/</span>
            <span :class="locale === 'en' ? 'text-bone-100' : 'text-steel-500'">EN</span>
          </button>
          <a href="#teklif" class="btn-solid flex-1" @click.prevent="goTo('#teklif')">{{ t('nav.cta') }}</a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

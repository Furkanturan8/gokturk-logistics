<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cities, cityById } from '~/data/cities'
import { routes } from '~/data/routes'
import { smoothPath } from '~/utils/curvePath'
import type { Corridor } from '~/types/logistics'

const { t, tp, locale } = useLocalizedData()

const activeCorridor = ref<Corridor>('bati')
const selectedCityId = ref('bursa')
const sectionEl = ref<HTMLElement | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)
const activePathEl = ref<SVGPathElement | null>(null)
const truckEl = ref<SVGGElement | null>(null)
const headlineEl = ref<HTMLElement | null>(null)

const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

const batiRoute = routes.find(r => r.corridor === 'bati')!
const doguRoute = routes.find(r => r.corridor === 'dogu')!

const pathFor = (route: typeof batiRoute) =>
  smoothPath(route.path.map(id => {
    const c = cityById(id)!
    return { x: c.x, y: c.y }
  }))

const batiPathD = pathFor(batiRoute)
const doguPathD = pathFor(doguRoute)

const activeRoute = computed(() => (activeCorridor.value === 'bati' ? batiRoute : doguRoute))
const activePathD = computed(() => (activeCorridor.value === 'bati' ? batiPathD : doguPathD))
const selectedCity = computed(() => cityById(selectedCityId.value))
const isCityOnActiveRoute = (id: string) => activeRoute.value.path.includes(id)

const activeRouteLabel = computed(() => {
  const route = activeRoute.value
  const origin = cityById(route.path[0])!
  const destination = cityById(route.path[route.path.length - 1])!
  const corridorLabel = route.corridor === 'bati' ? t('network.corridorWest') : t('network.corridorEast')
  return `${tp(origin.name)} — ${tp(destination.name)} ${corridorLabel}`
})

let truckTween: gsap.core.Tween | null = null
let pulseTween: gsap.core.Tween | null = null

function animateTruck() {
  if (!truckEl.value || !activePathEl.value) return
  truckTween?.kill()
  pulseTween?.kill()
  const distance = activeRoute.value.distanceKm
  const duration = gsap.utils.clamp(9, 20, distance / 300)

  gsap.set(truckEl.value, { opacity: 1 })
  truckTween = gsap.to(truckEl.value, {
    duration,
    ease: 'none',
    repeat: -1,
    motionPath: {
      path: activePathEl.value,
      align: activePathEl.value,
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
    },
  })

  // A rhythmic gait pulse — the loping cadence of a horse, carried into the truck's motion.
  const pulseTarget = truckEl.value.querySelector('circle')
  if (pulseTarget) {
    pulseTween = gsap.to(pulseTarget, {
      scale: 1.3,
      transformOrigin: '50% 50%',
      duration: 0.32,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }
}

function selectCorridor(corridor: Corridor) {
  activeCorridor.value = corridor
  selectedCityId.value = corridor === 'bati' ? 'bursa' : 'bursa'
  nextTick(animateTruck)
}

function selectCity(id: string) {
  selectedCityId.value = id
  if (!isCityOnActiveRoute(id)) {
    const other = doguRoute.path.includes(id) ? 'dogu' : 'bati'
    activeCorridor.value = other
    nextTick(animateTruck)
  }
}

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.map-fade'), { y: 24 })

  nextTick(() => {
    if (!activePathEl.value) return
    const len = activePathEl.value.getTotalLength()
    gsap.set(activePathEl.value, { strokeDasharray: len, strokeDashoffset: len })

    ScrollTrigger.create({
      trigger: sectionEl.value,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(activePathEl.value, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' })
        animateTruck()
      },
    })
  })
})

watch(activePathD, () => {
  nextTick(() => {
    if (!activePathEl.value) return
    const len = activePathEl.value.getTotalLength()
    gsap.set(activePathEl.value, { strokeDasharray: len, strokeDashoffset: 0 })
  })
})
</script>

<template>
  <section id="ag" ref="sectionEl" class="relative bg-ink-900 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="map-fade mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="eyebrow mb-6">{{ t('network.eyebrow') }}</p>
          <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
            {{ t('network.headline1') }} <br> {{ t('network.headline2') }}
          </h2>
        </div>

        <div class="flex flex-col items-stretch gap-3">
          <NuxtLink to="/takip-hesaplama" class="btn-solid w-full justify-center text-center">
            {{ t('network.toolButton') }}
          </NuxtLink>

          <div class="flex gap-3">
            <button
              class="border px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-widest2 transition-all duration-300"
              :class="activeCorridor === 'bati' ? 'border-rust-500 bg-rust-500 text-bone-100' : 'border-white/15 text-bone-300 hover:border-white/40'"
              @click="selectCorridor('bati')"
            >
              {{ t('network.corridorWest') }}
            </button>
            <button
              class="border px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-widest2 transition-all duration-300"
              :class="activeCorridor === 'dogu' ? 'border-rust-500 bg-rust-500 text-bone-100' : 'border-white/15 text-bone-300 hover:border-white/40'"
              @click="selectCorridor('dogu')"
            >
              {{ t('network.corridorEast') }}
            </button>
          </div>
        </div>
      </div>

      <div class="map-fade grid gap-8 lg:grid-cols-[1fr_300px]">
        <div class="relative aspect-[16/10] w-full border border-white/10 bg-ink-800/40 md:aspect-[2/1]">
          <svg ref="svgEl" class="absolute inset-0 h-full w-full" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="dotgrid" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.35" fill="#ffffff" fill-opacity="0.06" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100" height="62" fill="url(#dotgrid)" />

            <!-- dim inactive corridor -->
            <path
              :d="activeCorridor === 'bati' ? doguPathD : batiPathD"
              fill="none"
              stroke="#6b6d71"
              stroke-width="0.25"
              stroke-dasharray="0.6 1"
              opacity="0.35"
            />

            <!-- active corridor -->
            <path ref="activePathEl" :d="activePathD" fill="none" stroke="#c23a2c" stroke-width="0.4" stroke-linecap="round" />

            <g ref="truckEl" opacity="0">
              <circle r="1.4" fill="#f3efe9" />
              <circle r="0.55" fill="#0a0a0b" />
            </g>

            <g v-for="city in cities" :key="city.id">
              <circle
                :cx="city.x" :cy="city.y"
                :r="city.isHub ? 1.1 : isCityOnActiveRoute(city.id) ? 0.75 : 0.5"
                :fill="selectedCityId === city.id ? '#c23a2c' : isCityOnActiveRoute(city.id) ? '#f3efe9' : '#6b6d71'"
                class="cursor-pointer transition-all duration-300"
                @click="selectCity(city.id)"
              />
              <circle
                v-if="city.isHub"
                :cx="city.x" :cy="city.y" r="2"
                fill="none" stroke="#c23a2c" stroke-width="0.2" opacity="0.6"
              >
                <animate attributeName="r" values="1.4;2.6;1.4" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>

          <button
            v-for="city in cities"
            :key="`label-${city.id}`"
            class="absolute -translate-x-1/2 whitespace-nowrap text-left text-[0.6rem] font-semibold uppercase tracking-wider transition-colors duration-300"
            :class="[
              city.y > 50 ? '-translate-y-[calc(100%+6px)]' : 'translate-y-[10px]',
              selectedCityId === city.id ? 'text-rust-400' : isCityOnActiveRoute(city.id) ? 'text-bone-200' : 'text-steel-500',
            ]"
            :style="{ left: `${city.x}%`, top: `${city.y}%` }"
            @click="selectCity(city.id)"
          >
            {{ tp(city.name) }}
          </button>
        </div>

        <div class="border border-white/10 bg-ink-800/60 p-8">
          <p class="eyebrow mb-2">{{ tp(selectedCity?.country ?? '') }}</p>
          <h3 class="font-display text-2xl font-extrabold uppercase text-bone-100">{{ tp(selectedCity?.name ?? '') }}</h3>

          <div class="mt-8 space-y-6">
            <div>
              <p class="font-display text-3xl font-bold text-rust-400 num-tabular">{{ selectedCity?.activeRoutes }}</p>
              <p class="mt-1 text-[0.62rem] uppercase tracking-widest2 text-steel-300">{{ t('network.activeRoutes') }}</p>
            </div>
            <div class="line-hair" />
            <div>
              <p class="font-display text-3xl font-bold text-bone-100 num-tabular">{{ selectedCity?.weeklyShipments }}</p>
              <p class="mt-1 text-[0.62rem] uppercase tracking-widest2 text-steel-300">{{ t('network.weeklyShipments') }}</p>
            </div>
          </div>

          <div class="mt-8 border-t border-white/10 pt-6">
            <p class="text-xs uppercase tracking-widest2 text-steel-300">{{ t('network.activeRoute') }}</p>
            <p class="mt-2 text-sm text-bone-300">{{ activeRouteLabel }}</p>
            <p class="mt-1 text-xs text-steel-400">{{ activeRoute.distanceKm.toLocaleString('tr-TR') }} KM · {{ activeRoute.durationMinDays }}-{{ activeRoute.durationMaxDays }} {{ t('units.days') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

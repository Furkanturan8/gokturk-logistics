<script setup lang="ts">
import { cities, cityById } from '~/data/cities'
import { cityToCityRoute } from '~/data/routes'

const { t, tp, locale } = useLocalizedData()

const headlineEl = ref<HTMLElement | null>(null)
const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

const originId = 'bursa'
const destinationId = ref('munih')
const cargoTypeKey = ref('automotive')
const weightKg = ref(12000)
const transportTypeKey = ref('full')

const cargoOptionKeys = ['automotive', 'textile', 'industrial', 'food', 'general']
const transportOptionKeys = ['full', 'partial']
const destinationOptions = cities.filter(c => c.id !== originId)

interface CalculationResult {
  distanceKm: number
  durationMin: number
  durationMax: number
  path: string[]
  co2Kg: number
}

const result = ref<CalculationResult | null>(null)

// Kept separate from `result` so the displayed city names re-translate
// automatically if the visitor switches language after calculating.
const routeLabel = computed(() => result.value?.path.map(id => tp(cityById(id)!.name)).join(' → ') ?? '')

function calculate() {
  const match = cityToCityRoute(originId, destinationId.value)
  if (!match) {
    result.value = null
    return
  }

  const { route, path } = match
  const proportion = (path.length - 1) / (route.path.length - 1)
  const distanceKm = Math.round((route.distanceKm * proportion) / 10) * 10

  const scaledMin = Math.max(1, Math.round(route.durationMinDays * proportion))
  const scaledMax = Math.max(scaledMin, Math.round(route.durationMaxDays * proportion))

  const tons = weightKg.value / 1000
  const co2Kg = Math.round(distanceKm * tons * 0.065)

  result.value = {
    distanceKm,
    durationMin: scaledMin,
    durationMax: scaledMax,
    path,
    co2Kg,
  }
}

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.calc-fade'), { y: 24 })
  calculate()
})
</script>

<template>
  <section class="relative bg-ink-800/40 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="calc-fade mb-14 max-w-2xl">
        <p class="eyebrow mb-6">{{ t('calculator.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('calculator.headline1') }}<br>{{ t('calculator.headline2') }}
        </h2>
      </div>

      <div class="calc-fade grid gap-10 lg:grid-cols-12">
        <form class="grid grid-cols-1 gap-6 border border-white/10 bg-ink-900/60 p-8 sm:grid-cols-2 lg:col-span-5" @submit.prevent="calculate">
          <div>
            <label class="mb-2 block text-[0.62rem] uppercase tracking-widest2 text-steel-300">{{ t('calculator.from') }}</label>
            <div class="border border-white/15 bg-transparent px-4 py-3 text-sm text-bone-100">{{ t('calculator.fromValue') }}</div>
          </div>

          <div>
            <label class="mb-2 block text-[0.62rem] uppercase tracking-widest2 text-steel-300" for="calc-destination">{{ t('calculator.to') }}</label>
            <select id="calc-destination" v-model="destinationId" class="w-full border border-white/15 bg-ink-900 px-4 py-3 text-sm text-bone-100 focus:border-rust-500 focus:outline-none">
              <option v-for="city in destinationOptions" :key="city.id" :value="city.id">{{ tp(city.name) }}</option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-[0.62rem] uppercase tracking-widest2 text-steel-300" for="calc-cargo">{{ t('calculator.cargoType') }}</label>
            <select id="calc-cargo" v-model="cargoTypeKey" class="w-full border border-white/15 bg-ink-900 px-4 py-3 text-sm text-bone-100 focus:border-rust-500 focus:outline-none">
              <option v-for="key in cargoOptionKeys" :key="key" :value="key">{{ t(`calculator.cargoOptions.${key}`) }}</option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-[0.62rem] uppercase tracking-widest2 text-steel-300" for="calc-weight">{{ t('calculator.weight') }}</label>
            <input
              id="calc-weight"
              v-model.number="weightKg"
              type="number"
              min="0"
              max="24000"
              step="100"
              class="w-full border border-white/15 bg-ink-900 px-4 py-3 text-sm text-bone-100 focus:border-rust-500 focus:outline-none"
            >
          </div>

          <div class="sm:col-span-2">
            <label class="mb-2 block text-[0.62rem] uppercase tracking-widest2 text-steel-300" for="calc-transport">{{ t('calculator.transportType') }}</label>
            <select id="calc-transport" v-model="transportTypeKey" class="w-full border border-white/15 bg-ink-900 px-4 py-3 text-sm text-bone-100 focus:border-rust-500 focus:outline-none">
              <option v-for="key in transportOptionKeys" :key="key" :value="key">{{ t(`calculator.transportOptions.${key}`) }}</option>
            </select>
          </div>

          <button type="submit" class="btn-solid sm:col-span-2">{{ t('calculator.submit') }}</button>
        </form>

        <div class="border border-white/10 bg-ink-900/60 p-8 lg:col-span-7">
          <template v-if="result">
            <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p class="font-display text-3xl font-bold text-bone-100 num-tabular">{{ result.distanceKm.toLocaleString('tr-TR') }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('calculator.distanceLabel') }}</p>
              </div>
              <div>
                <p class="font-display text-3xl font-bold text-bone-100">{{ result.durationMin }}-{{ result.durationMax }} {{ t('units.days') }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('calculator.durationLabel') }}</p>
              </div>
              <div>
                <p class="font-display text-3xl font-bold text-rust-400 num-tabular">{{ result.co2Kg.toLocaleString('tr-TR') }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('calculator.co2Label') }}</p>
              </div>
            </div>

            <div class="mt-8 border-t border-white/10 pt-6">
              <p class="text-[0.62rem] uppercase tracking-widest2 text-steel-300">{{ t('calculator.suggestedRoute') }}</p>
              <p class="mt-2 text-sm leading-relaxed text-bone-300">{{ routeLabel }}</p>
            </div>

            <p class="mt-8 text-[0.62rem] uppercase tracking-widest2 text-steel-500">{{ t('calculator.disclaimer') }}</p>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

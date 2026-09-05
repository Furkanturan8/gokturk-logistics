<script setup lang="ts">
import { fleet } from '~/data/fleet'

const { t, dl, locale } = useLocalizedData()

const activeIndex = ref(0)
const headlineEl = ref<HTMLElement | null>(null)

const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

const activeVehicle = computed(() => fleet[activeIndex.value])

function select(index: number) {
  activeIndex.value = index
}

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.fleet-fade'), { y: 24 })
})
</script>

<template>
  <section id="filo" class="relative overflow-hidden bg-ink-900 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="fleet-fade mb-14">
        <p class="eyebrow mb-6">{{ t('fleet.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('fleet.headline') }}
        </h2>
      </div>
    </div>

    <div class="fleet-fade relative h-[62vh] min-h-[420px] w-full md:h-[74vh]">
      <img
        v-for="(vehicle, i) in fleet"
        :key="vehicle.id"
        :src="useBaseUrl(vehicle.image)"
        :alt="`${vehicle.brand} ${vehicle.model}`"
        class="absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-cinematic"
        :class="i === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.06]'"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-ink-900/10" />
      <div class="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-transparent to-transparent" />

      <div class="section-pad container-edge absolute inset-x-0 bottom-0 pb-10 md:pb-14">
        <Transition
          name="spec-fade"
          mode="out-in"
        >
          <div :key="activeVehicle.id">
            <p class="text-xs uppercase tracking-widest2 text-rust-400">{{ dl(`data.fleet.${activeVehicle.id}.tagline`, activeVehicle.tagline) }}</p>
            <h3 class="mt-3 font-display text-4xl font-black uppercase leading-none text-bone-100 md:text-6xl">
              {{ activeVehicle.brand }} <span class="text-steel-300">{{ activeVehicle.model }}</span>
            </h3>
            <p class="mt-4 max-w-md text-sm text-bone-300">{{ dl(`data.fleet.${activeVehicle.id}.description`, activeVehicle.description) }}</p>

            <div class="mt-8 flex flex-wrap gap-8 border-t border-white/10 pt-6">
              <div>
                <p class="font-display text-2xl font-bold text-bone-100 num-tabular">{{ activeVehicle.horsePower }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('fleet.hp') }}</p>
              </div>
              <div>
                <p class="font-display text-2xl font-bold text-bone-100">{{ activeVehicle.emissionStandard }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('fleet.emission') }}</p>
              </div>
              <div>
                <p class="font-display text-2xl font-bold text-bone-100 num-tabular">{{ activeVehicle.tonnage }} TON</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('fleet.capacity') }}</p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="section-pad container-edge mt-8">
      <div class="flex flex-wrap gap-2 border-t border-white/10 pt-6">
        <button
          v-for="(vehicle, i) in fleet"
          :key="vehicle.id"
          class="border px-6 py-3 text-xs font-semibold uppercase tracking-widest2 transition-all duration-300"
          :class="i === activeIndex ? 'border-rust-500 bg-rust-500 text-bone-100' : 'border-white/15 text-bone-300 hover:border-white/40'"
          @click="select(i)"
        >
          {{ vehicle.brand }} {{ vehicle.model }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.spec-fade-enter-active {
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}
.spec-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.spec-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.spec-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

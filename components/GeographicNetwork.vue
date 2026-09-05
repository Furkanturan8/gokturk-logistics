<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { geographyNodes } from '~/data/statistics'

const { t, dl, tp, locale } = useLocalizedData()

const headlineEl = ref<HTMLElement | null>(null)
const sectionEl = ref<HTMLElement | null>(null)
const selectedId = ref('turkiye')

const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

const hub = geographyNodes.find(n => n.id === 'turkiye')!
const spokes = geographyNodes.filter(n => n.id !== 'turkiye')

function arcPath(node: typeof spokes[number]) {
  const midX = (hub.x + node.x) / 2
  const midY = (hub.y + node.y) / 2 - 6
  return `M ${hub.x} ${hub.y} Q ${midX} ${midY} ${node.x} ${node.y}`
}

const selectedNode = computed(() => geographyNodes.find(n => n.id === selectedId.value) ?? hub)

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.geo-fade'), { y: 24 })

  nextTick(() => {
    const paths = document.querySelectorAll<SVGPathElement>('.geo-route-path')
    paths.forEach((path) => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    })

    ScrollTrigger.create({
      trigger: sectionEl.value,
      start: 'top 65%',
      once: true,
      onEnter: () => {
        gsap.to(paths, { strokeDashoffset: 0, duration: 1.8, stagger: 0.15, ease: 'power2.inOut' })
      },
    })
  })
})
</script>

<template>
  <section ref="sectionEl" class="relative bg-ink-800/40 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="geo-fade mb-14 max-w-2xl">
        <p class="eyebrow mb-6">{{ t('geo.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('geo.headline1') }}<br>{{ t('geo.headline2') }}
        </h2>
      </div>

      <div class="geo-fade grid gap-8 lg:grid-cols-[1fr_280px]">
        <div class="relative aspect-[16/10] w-full border border-white/10 bg-ink-900/60 md:aspect-[2/1]">
          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet">
            <path
              v-for="node in spokes"
              :key="node.id"
              class="geo-route-path"
              :d="arcPath(node)"
              fill="none"
              :stroke="selectedId === node.id ? '#c23a2c' : '#4d4f53'"
              stroke-width="0.3"
              stroke-linecap="round"
            />

            <circle :cx="hub.x" :cy="hub.y" r="2.2" fill="#c23a2c" />
            <circle :cx="hub.x" :cy="hub.y" r="3.6" fill="none" stroke="#c23a2c" stroke-width="0.2" opacity="0.5">
              <animate attributeName="r" values="2.2;4.2;2.2" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
            </circle>

            <g v-for="node in spokes" :key="`n-${node.id}`">
              <circle
                :cx="node.x" :cy="node.y"
                :r="selectedId === node.id ? 1.6 : 1.1"
                :fill="selectedId === node.id ? '#c23a2c' : '#f3efe9'"
                class="cursor-pointer transition-all duration-300"
                @click="selectedId = node.id"
              />
            </g>
          </svg>

          <button
            v-for="node in geographyNodes"
            :key="`label-${node.id}`"
            class="absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-widest2 transition-colors duration-300"
            :class="selectedId === node.id ? 'text-rust-400' : 'text-bone-300 hover:text-bone-100'"
            :style="{ left: `${node.x}%`, top: `${node.y}%` }"
            @click="selectedId = node.id"
          >
            {{ dl(`data.geography.${node.id}.label`, node.label) }}
          </button>
        </div>

        <div class="border border-white/10 bg-ink-900/60 p-8">
          <p class="eyebrow mb-2">{{ t('geo.regionLabel') }}</p>
          <h3 class="font-display text-2xl font-extrabold uppercase text-bone-100">{{ dl(`data.geography.${selectedNode.id}.label`, selectedNode.label) }}</h3>

          <ul class="mt-8 space-y-3">
            <li
              v-for="country in selectedNode.countries"
              :key="country"
              class="border-b border-white/10 pb-3 text-sm text-bone-300"
            >
              {{ tp(country) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

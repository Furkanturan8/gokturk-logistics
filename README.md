# GÖKTÜRK LOJİSTİK

> ⚠️ **Not:** Bu proje gerçek bir lojistik firması için tasarlanmadı. Bir uluslararası karayolu taşımacılığı firmasının kurumsal tanıtım sitesini gerçekçi bir marka konsepti üzerinden inşa etmek için hazırlanmış bir **portföy/demo çalışmasıdır**.

Türkiye, Avrupa, Kafkasya ve Orta Asya arasında karayolu taşımacılığı yapan kurgusal bir lojistik firması için tasarlanmış, sinematik animasyonlarla zenginleştirilmiş, çift dilli (TR/EN) bir kurumsal web sitesi. "Yolculuk değişti, ruh aynı" temasıyla bozkırın atından bugünün TIR'ına uzanan bir marka anlatısı kurar; ağ haritası, filo tanıtımı, gönderi takibi ve navlun hesaplama gibi gerçek bir lojistik sitesinde beklenecek etkileşimli modülleri simüle eder.

## Özellikler

- **Sinematik anasayfa** — GSAP destekli scroll animasyonları, satır satır beliren başlıklar, video hero.
- **Lojistik ağ haritası** — Batı/Doğu koridor seçimiyle canlanan SVG rota çizimi ve şehir verileri.
- **Filo vitrini, hizmetler ve operasyon paneli** — sahte ama gerçekçi verilerle beslenen kartlar/istatistikler.
- **Gönderi takip + navlun hesaplama** aracı — kendi sayfasında (`/takip-hesaplama`), anasayfadan ayrı bir CTA ile erişilir.
- **"Fabrikadan Hedef Noktaya" yolculuk anlatımı** — masaüstünde ve mobilde aynı şekilde çalışan, scroll ile pinlenen yatay slider.
- **TR / EN dil desteği** (`@nuxtjs/i18n`, `no_prefix` stratejisi).
- **Statik export** ile GitHub Pages üzerinden yayınlanabilir yapı (`baseURL` ve medya yolları alt-path'e duyarlı).

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Framework | [Nuxt 3](https://nuxt.com) (Vue 3) |
| Stil | [Tailwind CSS](https://tailwindcss.com) |
| Animasyon | [GSAP](https://gsap.com) (ScrollTrigger, SplitText, MotionPath) |
| Çoklu dil | `@nuxtjs/i18n` |
| Fontlar | `@nuxtjs/google-fonts` (Archivo + Inter) |

## Proje Yapısı

```
├── app.vue                    # Kök layout (NuxtPage sarmalayıcı)
├── pages/
│   ├── index.vue               # Anasayfa — tüm bölümlerin sıralandığı yer
│   └── takip-hesaplama.vue     # Gönderi takip + navlun hesaplama sayfası
├── components/
│   ├── AppNavigation.vue        # Sabit üst menü + mobil tost menü
│   ├── AppFooter.vue
│   ├── HeroSection.vue          # Video arka planlı giriş bölümü
│   ├── BrandStatement.vue       # Marka felsefesi
│   ├── NetworkMap.vue           # Batı/Doğu koridor haritası
│   ├── FleetShowcase.vue        # Filo vitrini
│   ├── ServicesSection.vue      # Hizmetler listesi
│   ├── ShipmentTracker.vue      # Gönderi takip formu
│   ├── FreightCalculator.vue    # Navlun/rota hesaplama formu
│   ├── OperationsDashboard.vue  # Canlı operasyon paneli (simüle)
│   ├── JourneyTimeline.vue      # "Fabrikadan Hedef Noktaya" yatay slider
│   ├── GeographicNetwork.vue    # Bölgesel bağlantı görselleştirmesi
│   ├── DriverSection.vue        # İnsan faktörü / sürücü anlatısı
│   └── FinalCTA.vue             # Kapanış çağrısı
├── composables/
│   ├── useLocalizedData.ts      # i18n + veri-tabanlı çeviri yardımcıları
│   ├── useRevealText.ts         # GSAP SplitText ile satır/karakter animasyonu
│   ├── useScrollFade.ts         # Scroll'a bağlı fade-in
│   ├── useCountUp.ts            # Sayaç animasyonu
│   └── useBaseUrl.ts            # Alt-path (base URL) duyarlı asset/link üretimi
├── data/                        # Statik demo verileri (şehirler, filo, rotalar, sevkiyatlar...)
├── types/logistics.ts           # Paylaşılan TypeScript tipleri
├── utils/curvePath.ts           # SVG rota eğrisi hesaplama
├── i18n/locales/                # tr.json / en.json çeviri dosyaları
├── plugins/gsap.client.ts       # GSAP eklentilerinin (ScrollTrigger vb.) kaydı
└── assets/css/main.css          # Tailwind katmanları + genel stiller
```

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

`http://localhost:3000` adresinde açılır.

## Prodüksiyon Build'i

```bash
npm run build   # Node sunucusu için
npm run preview # Build'i yerelde önizle
```

## Statik Export (GitHub Pages)

Site tamamen istemci tarafında çalışan, sunucu gerektirmeyen bir yapıya sahip olduğundan statik olarak da üretilebilir:

```bash
npm run generate
```

`main` dalına yapılan her push, `.github/workflows/deploy.yml` üzerinden otomatik olarak build alıp GitHub Pages'e deploy eder.

## Dil Değiştirme

Sağ üstteki `TR / EN` düğmesiyle anlık dil değişimi yapılabilir; çeviriler `i18n/locales/*.json` dosyalarında tutulur, veri-tabanlı metinler (şehir isimleri, hizmet açıklamaları vb.) `useLocalizedData` composable'ı üzerinden çözülür.

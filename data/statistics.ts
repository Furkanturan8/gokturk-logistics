import type { StatisticItem, LiveShipment, JourneyStage, GeographyNode } from '~/types/logistics'

export const heroStatistics: StatisticItem[] = [
  { key: 'countries', label: 'Ülke Ağı', value: 18 },
  { key: 'routes', label: 'Aktif Rota', value: 42 },
  { key: 'shipments', label: 'Yıllık Sevkiyat', value: 12400, suffix: '+' },
]

export const operationsStatistics: StatisticItem[] = [
  { key: 'active', label: 'Aktif Sevkiyat', value: 248 },
  { key: 'transit', label: 'Transit', value: 182 },
  { key: 'delivered', label: 'Teslim Edildi', value: 51 },
  { key: 'border', label: 'Sınırda', value: 15 },
]

export const liveShipments: LiveShipment[] = [
  { code: 'GKT-4821', from: 'Bursa', to: 'Berlin', status: 'transit', progress: 0.58 },
  { code: 'GKT-1923', from: 'İstanbul', to: 'Paris', status: 'transit', progress: 0.34 },
  { code: 'GKT-5521', from: 'Bakü', to: 'Budapeşte', status: 'sinirda', progress: 0.71 },
  { code: 'GKT-7742', from: 'Ankara', to: 'Tiflis', status: 'transit', progress: 0.19 },
  { code: 'GKT-3390', from: 'Bursa', to: 'Milano', status: 'teslim', progress: 1 },
]

export const journeyStages: JourneyStage[] = [
  {
    id: 'fabrika',
    label: '01',
    title: 'FABRİKA',
    description: 'Yük, üretim tesisinde hazırlanır ve sevkiyat planına dahil edilir.',
    stat: { label: 'Hazırlık Süresi', value: '4 SAAT' },
    image: '/media/images/truck-side-profile.jpeg',
  },
  {
    id: 'depo',
    label: '02',
    title: 'DEPO',
    description: 'Konsolidasyon ve kontrol için stratejik depo noktasına taşınır.',
    stat: { label: 'Depo Süresi', value: '1 GÜN' },
    image: '/media/images/truck-vertical-sunset.jpeg',
  },
  {
    id: 'tir',
    label: '03',
    title: 'TIR',
    description: 'Filo aracına yüklenir ve uzun mesafe yolculuğu başlar.',
    stat: { label: 'Kalkış Hızı', value: '90 KM/S' },
    image: '/media/images/hero-highway-sunset.jpeg',
  },
  {
    id: 'sinir',
    label: '04',
    title: 'SINIR KAPISI',
    description: 'Gümrük işlemleri operasyon ekibimiz tarafından koordine edilir.',
    stat: { label: 'Ortalama Bekleme', value: '3 SAAT' },
    image: '/media/images/truck-vertical-sunset.jpeg',
  },
  {
    id: 'dagitim',
    label: '05',
    title: 'DAĞITIM MERKEZİ',
    description: 'Varış ülkesindeki dağıtım merkezine ulaşır ve son teslimat planlanır.',
    stat: { label: 'Aktarma Süresi', value: '6 SAAT' },
    image: '/media/images/truck-side-profile.jpeg',
  },
  {
    id: 'varis',
    label: '06',
    title: 'VARIŞ',
    description: 'Yük, alıcısına güvenle ve zamanında teslim edilir.',
    stat: { label: 'Teslimat Doğruluğu', value: '%99.2' },
    image: '/media/images/hero-highway-sunset.jpeg',
  },
]

export const geographyNodes: GeographyNode[] = [
  { id: 'avrupa', label: 'AVRUPA', countries: ['Almanya', 'Fransa', 'İtalya', 'Avusturya'], x: 14, y: 30 },
  { id: 'balkanlar', label: 'BALKANLAR', countries: ['Sırbistan', 'Bulgaristan', 'Macaristan'], x: 36, y: 45 },
  { id: 'turkiye', label: 'TÜRKİYE', countries: ['Türkiye'], x: 54, y: 55 },
  { id: 'kafkasya', label: 'KAFKASYA', countries: ['Gürcistan', 'Azerbaycan'], x: 76, y: 42 },
  { id: 'orta-asya', label: 'ORTA ASYA', countries: ['Kazakistan', 'Özbekistan', 'Kırgızistan'], x: 94, y: 40 },
]

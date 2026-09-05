import type { Shipment } from '~/types/logistics'

export const mockShipments: Record<string, Shipment> = {
  'GKT-284921': {
    trackingCode: 'GKT-284921',
    origin: { city: 'Bursa', country: 'Türkiye' },
    destination: { city: 'Münih', country: 'Almanya' },
    cargoType: 'Otomotiv Parçaları',
    distanceKm: 2140,
    durationEstimate: '2-3 gün',
    progress: 0.42,
    stops: [
      { location: 'Bursa', status: 'Yüklendi', state: 'done' },
      { location: 'İstanbul', status: 'Çıkış Yaptı', state: 'done' },
      { location: 'Sofya', status: 'Transit', state: 'active' },
      { location: 'Budapeşte', status: 'Bekleniyor', state: 'pending' },
      { location: 'Münih', status: 'Varış', state: 'pending' },
    ],
  },
  'GKT-119843': {
    trackingCode: 'GKT-119843',
    origin: { city: 'İstanbul', country: 'Türkiye' },
    destination: { city: 'Paris', country: 'Fransa' },
    cargoType: 'Tekstil Ürünleri',
    distanceKm: 3120,
    durationEstimate: '4-5 gün',
    progress: 0.65,
    stops: [
      { location: 'İstanbul', status: 'Yüklendi', state: 'done' },
      { location: 'Belgrad', status: 'Çıkış Yaptı', state: 'done' },
      { location: 'Viyana', status: 'Transit', state: 'done' },
      { location: 'Münih', status: 'Transit', state: 'active' },
      { location: 'Paris', status: 'Varış', state: 'pending' },
    ],
  },
  'GKT-552017': {
    trackingCode: 'GKT-552017',
    origin: { city: 'Bursa', country: 'Türkiye' },
    destination: { city: 'Bakü', country: 'Azerbaycan' },
    cargoType: 'Endüstriyel Ekipman',
    distanceKm: 2260,
    durationEstimate: '3-4 gün',
    progress: 0.28,
    stops: [
      { location: 'Bursa', status: 'Yüklendi', state: 'done' },
      { location: 'Ankara', status: 'Transit', state: 'active' },
      { location: 'Erzurum', status: 'Bekleniyor', state: 'pending' },
      { location: 'Tiflis', status: 'Sınır Kapısı', state: 'pending' },
      { location: 'Bakü', status: 'Varış', state: 'pending' },
    ],
  },
}

export const defaultTrackingCode = 'GKT-284921'

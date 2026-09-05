import type { City } from '~/types/logistics'

export const cities: City[] = [
  // Batı koridoru — Avrupa
  { id: 'paris', name: 'Paris', country: 'Fransa', region: 'avrupa', x: 4, y: 40, activeRoutes: 18, weeklyShipments: 64 },
  { id: 'milan', name: 'Milano', country: 'İtalya', region: 'avrupa', x: 15, y: 48, activeRoutes: 21, weeklyShipments: 79 },
  { id: 'berlin', name: 'Berlin', country: 'Almanya', region: 'avrupa', x: 27, y: 17, activeRoutes: 26, weeklyShipments: 92 },
  { id: 'munih', name: 'Münih', country: 'Almanya', region: 'avrupa', x: 21, y: 41, activeRoutes: 34, weeklyShipments: 141 },
  { id: 'viyana', name: 'Viyana', country: 'Avusturya', region: 'avrupa', x: 25, y: 31, activeRoutes: 29, weeklyShipments: 108 },
  { id: 'budapeste', name: 'Budapeşte', country: 'Macaristan', region: 'avrupa', x: 31, y: 35, activeRoutes: 24, weeklyShipments: 97 },

  // Balkanlar
  { id: 'belgrad', name: 'Belgrad', country: 'Sırbistan', region: 'balkanlar', x: 37, y: 43, activeRoutes: 19, weeklyShipments: 71 },
  { id: 'sofya', name: 'Sofya', country: 'Bulgaristan', region: 'balkanlar', x: 43, y: 51, activeRoutes: 22, weeklyShipments: 88 },

  // Türkiye — merkez
  { id: 'edirne', name: 'Edirne', country: 'Türkiye', region: 'turkiye', x: 48, y: 55, activeRoutes: 16, weeklyShipments: 54 },
  { id: 'istanbul', name: 'İstanbul', country: 'Türkiye', region: 'turkiye', x: 52, y: 51, activeRoutes: 58, weeklyShipments: 214 },
  { id: 'bursa', name: 'Bursa', country: 'Türkiye', region: 'turkiye', x: 50, y: 59, isHub: true, activeRoutes: 42, weeklyShipments: 186 },
  { id: 'ankara', name: 'Ankara', country: 'Türkiye', region: 'turkiye', x: 59, y: 53, activeRoutes: 31, weeklyShipments: 122 },
  { id: 'erzurum', name: 'Erzurum', country: 'Türkiye', region: 'turkiye', x: 69, y: 47, activeRoutes: 14, weeklyShipments: 41 },

  // Kafkasya
  { id: 'tiflis', name: 'Tiflis', country: 'Gürcistan', region: 'kafkasya', x: 75, y: 41, activeRoutes: 11, weeklyShipments: 33 },
  { id: 'baku', name: 'Bakü', country: 'Azerbaycan', region: 'kafkasya', x: 81, y: 45, activeRoutes: 13, weeklyShipments: 38 },

  // Orta Asya
  { id: 'aktau', name: 'Aktau', country: 'Kazakistan', region: 'orta-asya', x: 87, y: 51, activeRoutes: 8, weeklyShipments: 22 },
  { id: 'tashkent', name: 'Taşkent', country: 'Özbekistan', region: 'orta-asya', x: 93, y: 45, activeRoutes: 9, weeklyShipments: 27 },
  { id: 'almati', name: 'Almatı', country: 'Kazakistan', region: 'orta-asya', x: 99, y: 39, activeRoutes: 7, weeklyShipments: 19 },
]

export const cityById = (id: string) => cities.find(city => city.id === id)

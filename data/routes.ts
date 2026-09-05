import type { RouteDefinition } from '~/types/logistics'

export const routes: RouteDefinition[] = [
  {
    id: 'bati-avrupa',
    corridor: 'bati',
    path: ['bursa', 'istanbul', 'edirne', 'sofya', 'belgrad', 'budapeste', 'viyana', 'munih', 'berlin', 'milan', 'paris'],
    distanceKm: 3120,
    durationMinDays: 4,
    durationMaxDays: 5,
    cargoFocus: 'Otomotiv, sanayi ve konteyner yükleri',
  },
  {
    id: 'dogu-orta-asya',
    corridor: 'dogu',
    path: ['bursa', 'ankara', 'erzurum', 'tiflis', 'baku', 'aktau', 'tashkent', 'almati'],
    distanceKm: 4380,
    durationMinDays: 7,
    durationMaxDays: 9,
    cargoFocus: 'Proje yükleri ve parsiyel taşımacılık',
  },
]

export const cityToCityRoute = (fromId: string, toId: string) => {
  for (const route of routes) {
    const fromIndex = route.path.indexOf(fromId)
    const toIndex = route.path.indexOf(toId)
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
      return {
        route,
        path: route.path.slice(fromIndex, toIndex + 1),
      }
    }
  }
  return null
}

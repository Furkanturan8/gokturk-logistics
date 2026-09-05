export type Region = 'turkiye' | 'avrupa' | 'balkanlar' | 'kafkasya' | 'orta-asya'

export type Corridor = 'bati' | 'dogu'

export interface City {
  id: string
  name: string
  country: string
  region: Region
  /** Position on the abstract stylised route canvas, percentage 0-100 */
  x: number
  y: number
  isHub?: boolean
  activeRoutes: number
  weeklyShipments: number
}

export interface RouteDefinition {
  id: string
  corridor: Corridor
  /** Ordered list of city ids the route travels through */
  path: string[]
  distanceKm: number
  durationMinDays: number
  durationMaxDays: number
  cargoFocus: string
}

export type ShipmentStopState = 'done' | 'active' | 'pending'

export interface ShipmentStop {
  location: string
  status: string
  state: ShipmentStopState
}

export interface Shipment {
  trackingCode: string
  origin: { city: string; country: string }
  destination: { city: string; country: string }
  cargoType: string
  distanceKm: number
  durationEstimate: string
  progress: number
  stops: ShipmentStop[]
}

export interface FleetVehicle {
  id: string
  brand: string
  model: string
  horsePower: number
  emissionStandard: string
  tonnage: number
  image: string
  tagline: string
  description: string
}

export interface Service {
  id: string
  title: string
  description: string
  index: string
}

export interface StatisticItem {
  key: string
  label: string
  value: number
  suffix?: string
  prefix?: string
}

export type LiveShipmentStatus = 'transit' | 'sinirda' | 'teslim'

export interface LiveShipment {
  code: string
  from: string
  to: string
  status: LiveShipmentStatus
  progress: number
}

export interface JourneyStage {
  id: string
  label: string
  title: string
  description: string
  stat: { label: string; value: string }
  image: string
}

export interface GeographyNode {
  id: string
  label: string
  countries: string[]
  x: number
  y: number
}

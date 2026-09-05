import type { FleetVehicle } from '~/types/logistics'

export const fleet: FleetVehicle[] = [
  {
    id: 'volvo-fh',
    brand: 'VOLVO',
    model: 'FH',
    horsePower: 500,
    emissionStandard: 'EURO 6',
    tonnage: 40,
    image: '/media/images/hero-highway-sunset.jpeg',
    tagline: 'Uzun mesafenin sessiz gücü.',
    description: 'Avrupa hatlarında maksimum yakıt verimliliği ve sürücü konforu için tasarlanmış çekici filomuzun omurgası.',
  },
  {
    id: 'mercedes-actros',
    brand: 'MERCEDES',
    model: 'ACTROS',
    horsePower: 530,
    emissionStandard: 'EURO 6',
    tonnage: 40,
    image: '/media/images/truck-vertical-sunset.jpeg',
    tagline: 'Hassasiyetle tasarlanmış performans.',
    description: 'Otomotiv ve sanayi yükleri için üstün güç aktarımı ve gelişmiş güvenlik sistemleriyle donatılmıştır.',
  },
  {
    id: 'scania-r',
    brand: 'SCANIA',
    model: 'R SERIES',
    horsePower: 500,
    emissionStandard: 'EURO 6',
    tonnage: 40,
    image: '/media/images/truck-side-profile.jpeg',
    tagline: 'Doğu koridorunun dayanıklı yoldaşı.',
    description: 'Zorlu coğrafyalarda ve uzun sınır geçişlerinde kesintisiz operasyon için optimize edilmiş dayanıklılık.',
  },
]

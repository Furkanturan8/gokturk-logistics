import type { Service } from '~/types/logistics'

export const services: Service[] = [
  {
    id: 'karayolu',
    index: '01',
    title: 'Karayolu Taşımacılığı',
    description: 'Türkiye ve Avrupa arasında komple ve parsiyel yük taşımacılığı.',
  },
  {
    id: 'express',
    index: '02',
    title: 'Express Taşımacılık',
    description: 'Zaman kritik gönderiler için hızlı ve güvenilir çözümler.',
  },
  {
    id: 'soguk-zincir',
    index: '03',
    title: 'Soğuk Zincir',
    description: 'Sıcaklık kontrollü taşıma çözümleri.',
  },
  {
    id: 'depolama',
    index: '04',
    title: 'Depolama',
    description: 'Stratejik konumlarda güvenli depolama ve dağıtım.',
  },
  {
    id: 'otomotiv',
    index: '05',
    title: 'Otomotiv Lojistiği',
    description: 'Otomotiv ve sanayi tedarik zincirleri için özel taşıma çözümleri.',
  },
]

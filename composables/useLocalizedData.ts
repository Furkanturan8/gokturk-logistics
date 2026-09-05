/**
 * Data files hold the canonical Turkish strings directly (no restructuring needed
 * for the default locale). This helper resolves the English override from the
 * `data.*` tree in en.json when the active locale is English, and falls back to
 * the Turkish value from the data file otherwise — so data/*.ts stays the single
 * source of truth for Turkish content.
 */
export function useLocalizedData() {
  const { t, tm, rt, locale } = useI18n()

  const dl = (key: string, trValue: string): string => (locale.value === 'en' ? t(key) : trValue)

  const placeNames: Record<string, string> = {
    'İstanbul': 'Istanbul',
    'Sofya': 'Sofia',
    'Belgrad': 'Belgrade',
    'Budapeşte': 'Budapest',
    'Viyana': 'Vienna',
    'Münih': 'Munich',
    'Milano': 'Milan',
    'Tiflis': 'Tbilisi',
    'Bakü': 'Baku',
    'Taşkent': 'Tashkent',
    'Almatı': 'Almaty',
    'Türkiye': 'Turkey',
    'Fransa': 'France',
    'İtalya': 'Italy',
    'Almanya': 'Germany',
    'Avusturya': 'Austria',
    'Macaristan': 'Hungary',
    'Sırbistan': 'Serbia',
    'Bulgaristan': 'Bulgaria',
    'Gürcistan': 'Georgia',
    'Azerbaycan': 'Azerbaijan',
    'Kazakistan': 'Kazakhstan',
    'Özbekistan': 'Uzbekistan',
    'Kırgızistan': 'Kyrgyzstan',
  }

  const tp = (name: string): string => (locale.value === 'en' ? (placeNames[name] ?? name) : name)

  return { dl, tp, t, tm, rt, locale }
}

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0b',
          900: '#0a0a0b',
          800: '#131315',
          700: '#1c1c1f',
          600: '#28282c',
          500: '#3a3a3f',
        },
        bone: {
          DEFAULT: '#f3efe9',
          100: '#f8f5f1',
          200: '#f3efe9',
          300: '#e8e2d8',
          400: '#c9c2b6',
        },
        rust: {
          DEFAULT: '#a3241f',
          400: '#c23a2c',
          500: '#a3241f',
          600: '#841b18',
          700: '#5e1311',
        },
        steel: {
          DEFAULT: '#6b6d71',
          300: '#9a9ca1',
          400: '#7d7f84',
          500: '#6b6d71',
          600: '#4d4f53',
        },
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-3': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

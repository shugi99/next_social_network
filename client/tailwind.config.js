module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        puertorico: '#3FBCAA',
        whitesmoke: '#F5F5F5',
        nightrider: '#2B2B2B',
        matterhorn: '#4C4C4C',
        summersky: '#2AB2FA',
        mantis: '#75B562',
      },
      boxShadow: {
        base: '0px 2px 11px 1px rgba(0,0,0,0.12)',
      },
      transitionDuration: {
        800: '800ms',
        900: '900ms',
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwindcss-important')()],
}

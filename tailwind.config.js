module.exports = {
  content: [
    './dist/*.{html,js}',
    './src/*.{html,js}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logoSite': "url('../assets/images/logo-citylink.svg')", 
        'categories': "url('../assets/images/forma-scores.svg')",
        'mobile': "url('../assets/images/sfondo-mobile.jpg')",
        'desktop': "url('../assets/images/background-desktop.jpg')",
        'mobile-top':"url('../assets/images/onda-top.svg')",
        'overall':"url('../assets/images/overall.svg')",
        'stats':"url('../assets/images/Illustrazione-stats.png')",
        'lente':"url('../assets/images/lente.svg')",
        'aereo':"url('../assets/images/aeroplanino.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

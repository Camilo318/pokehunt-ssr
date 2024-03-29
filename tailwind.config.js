/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '500px'
      }
    }
  },
  plugins: []
}

// colors: {
//   dragon: '#0076ff',
//   electric: '#ffde00',
//   fairy: '#ff76ff',
//   fighting: '#ff215b',
//   fire: '#ff9900',
//   flying: '#89bdff',
//   ghost: '#4e6aff',
//   grass: '#1cd80e',
//   ground: '#ff6b0d',
//   ice: '#2ee4c6',
//   normal: '#9fa39d',
//   poison: '#f149ff',
//   psychic: '#ff6c64',
//   rock: '#d8bc5a',
//   steel: '#23a1bd',
//   water: '#14a8ff'
// },

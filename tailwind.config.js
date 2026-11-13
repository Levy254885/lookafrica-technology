export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#3B3B3B', mute: '#5E5E5E', cream: '#FBFCF6', soft: '#F4F1D9', line: '#E6E3D0', navy: '#17185C',
      copper: '#E02020', red: '#B71C2B', teal: '#1F9E8F', blue: '#1E4F9E', orange: '#F28C28', butter: '#FBE8A6' },
    fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'], display: ['"Montserrat Variable"', 'Montserrat', 'system-ui', 'sans-serif'] },
    maxWidth: { page: '76rem' },
  } },
  plugins: [],
}

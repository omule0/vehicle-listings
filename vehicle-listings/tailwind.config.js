/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			border: {
  				DEFAULT: '#e5e5e5',
  			},
  			background: '#ffffff',
  			foreground: '#000000',
  			primary: '#fca311',
  			secondary: '#14213d',
  			muted: {
  				DEFAULT: '#e5e5e5',
  				foreground: '#666666',
  			},
  			accent: {
  				DEFAULT: '#14213d',
  				foreground: '#ffffff',
  			},
  			destructive: {
  				DEFAULT: '#ff0000',
  				foreground: '#ffffff',
  			},
  			card: {
  				DEFAULT: '#ffffff',
  				foreground: '#000000',
  			},
  			popover: {
  				DEFAULT: '#ffffff',
  				foreground: '#000000',
  			},
  		}
  	}
  },
  plugins: [],
}

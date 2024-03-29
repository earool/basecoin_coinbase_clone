/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'my-blue': '#0052FF',
        'my-blue-darker': '#0A46E4',
        'my-blue-disabled': '#80A9FF',
        'gray-light': '#F0F3FA',
        'gray-light-hover': '#E2E5EC',
        'gray-border': '#ECEFF1',
        'gray-border-darker': '#5B616EAB',
        'gray-bg-modal': '#1A3650',
        'gray-bg-main': '#003ec108',
        'gray-placeholder': '#e2e8f0',
      },
      gridTemplateColumns: {
        lgGrid: '200px 1fr',
        smGrid: '80px 1fr',
        lgGridHome: 'min(800px, 960px) 360px',
      },
      gridTemplateRows: {
        smGridHdr: '64px 1fr',
        smGridHome: '120px 1fr',
      },
      screens: {
        c2: '160px',
        c3: '240px',
        c4: '340px',
        c5: '440px',
        c6: '560px',
        sm: '680px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
};

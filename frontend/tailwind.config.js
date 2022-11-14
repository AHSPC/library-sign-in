const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Inter var', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				zinc: colors.zinc,
				sky: colors.sky,
				cyan: colors.cyan,
				lime: colors.lime,
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				bug: '#aedf78',
				dark: '#2d221c',
				dragon: '#29036a',
				electric: '#f9be00',
				fairy: '#f87ea7',
				fighting: '#e81319',
				fire: '#e95c4d',
				flying: '#5eb9b2',
				ghost: '#8e55a4',
				grass: '#00ca91',
				ground: '#bfac21',
				ice: '#66d1e5',
				normal: '#a5a5a5',
				poison: '#611380',
				psychic: '#8a0532',
				rock: '#776a3e',
				steel: '#7b8e8a',
				unknown: '#454545',
				water: '#43ccff',
			},
			keyframes: {
				ripple: {
					'0%': { opacity: '0' },
					'25%': { opacity: '0.25' },
					'100%': {
						width: '200%',
						'padding-bottom': '200%',
						opacity: '0',
					},
				},
			},
			animation: {
				ripple: 'ripple 300ms ease-in',
				'spin-fast': 'spin 1s linear infinite',
				spin: 'spin 3s linear infinite',
				'spin-slow': 'spin 5s linear infinite',
			},
		},
	},
	plugins: [require('daisyui')],
}

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fill: (theme) => ({
            red: theme('colors.red.primary'),
        }),
        extend: {
            colors: {
                red: {
                    primary: '#ed4956',
                },
                black: {
                    light: '#262626',
                },
                gray: {
                    primary: '#dbdbdb',
                    base: '#616161',
                    background: '#fafafa',
                },
                blue: {
                    medium: '#0095f6',
                },
            },
        },
    },
    plugins: [],
}

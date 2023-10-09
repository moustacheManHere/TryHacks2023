/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        colors: {
            "medical": {
                "light": "#01263D",
                "DEFAULT": "#628FA6",
                "dark": "#C2DFF0"
            },
        },
        extend: {
            colors: {
                background: "#f5f5f5",
                foreground: "#1a1a1a",
                primary: {
                    DEFAULT: "#d78873",
                    foreground: "#1a1a1a"
                },
                secondary: {
                    DEFAULT: "#F4B888",
                    foreground: "#1a1a1a"
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
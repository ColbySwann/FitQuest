/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#0A0A12",
                muted: "#12121A",
                card: "#1A1A24",
                "card-foreground": "#FFFFFF",
                "muted-foreground": "#A1A1AA",
                primary: "#D4AF37",
                "primary-foreground": "#000000",
                secondary: "#262635",
                "secondary-foreground": "#FFFFFF",
                border: "#3F3F46",
                accent: "#FACC15",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            boxShadow: {
                gold: "0 0 15px rgba(212,175,55,0.3)",
                soft: "0 2px 6px rgba(0,0,0,0.3)",
            },
            borderRadius: {
                xl: "16px",
                lg: "12px",
                md: "8px",
            },
        },
    },
    plugins: [],
};

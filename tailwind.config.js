export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(at 40% 20%, #60a5fa 0px, transparent 50%), radial-gradient(at 80% 0%, #f472b6 0px, transparent 50%), radial-gradient(at 0% 50%, #a78bfa 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
}

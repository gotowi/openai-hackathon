module.exports = {
  theme: {
    extend: {
      animation: {
        "text-gradient": "text-gradient 1s linear infinite reverse",
        "fade-in": "fade-in 100ms ease-in-out",
      },
      keyframes: {
        "text-gradient": {
          "0%": { "background-position": "0 50%" },
          "15%": { "background-position": "0 50%" },
          "85%": { "background-position": "100% 100%" },
          "100%": { "background-position": "100% 100%" },
        },
        "fade-in": {
          "0%": { opacity: 0, marginTop: "-10px" },
          "100%": { opacity: 1, marginTop: "0px" },
        },
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */

/* ------------------------------------------------------------------
 * MATERIAL+ INSPIRED DESIGN LANGUAGE SYSTEM — SINGLE SOURCE OF TRUTH
 * ------------------------------------------------------------------
 * Every raw value the UI consumes lives in this one block. A Figma MCP
 * sync should rewrite `mp` (color), `space` and `type` only — no other
 * file in the project contains a hardcoded hex, px or rem value.
 *
 * Token naming maps 1:1 to Figma variable paths:
 *   Figma  color/ink/base        ->  theme.colors.mp.ink.base   -> bg-mp-ink-base
 *   Figma  space/gutter          ->  theme.spacing.gutter       -> p-gutter
 *   Figma  type/display-xl       ->  theme.fontSize['display-xl']
 * ------------------------------------------------------------------ */

const mp = {
  /* Canvas — high-contrast agency near-black, never pure #000 */
  ink: {
    base: "#0B0B0C", // page canvas
    raised: "#141416", // cards / tiles
    hover: "#1C1C20", // tile hover
    line: "#2A2A2F", // hairline borders
    muted: "#6E6E78", // de-emphasised copy, completed tiles
  },
  /* Paper — the light side of the palette */
  paper: {
    base: "#F4F4F0", // primary type on dark
    dim: "#C9C9C2", // secondary copy
    pure: "#FFFFFF",
  },
  /* Accents — bold, saturated, used sparingly and at scale */
  accent: {
    DEFAULT: "#FF3B47", // red — primary brand accent
    press: "#E62F3A",
    soft: "rgba(255, 59, 71, 0.12)",
  },
  hot: {
    DEFAULT: "#C41E3A", // darker red — category eyebrows, host cues
    soft: "rgba(196, 30, 58, 0.12)",
  },
  /* Semantic — answer feedback */
  correct: {
    DEFAULT: "#16E07E",
    ink: "#04120B",
    soft: "rgba(22, 224, 126, 0.14)",
  },
  wrong: {
    DEFAULT: "#FF3B47",
    soft: "rgba(255, 59, 71, 0.14)",
  },
};

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { mp },

      fontFamily: {
        /* Material+ runs a clean geometric-leaning grotesk. Inter is the
           closest freely-licensed stand-in; swap the first entry only. */
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      /* Projector-first type ramp: everything is one to two steps larger
         than a normal web scale so the back row can read it. */
      fontSize: {
        "display-xl": ["clamp(3.5rem, 7vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.04em", fontWeight: "900" }],
        "display-lg": ["clamp(2.5rem, 4.5vw, 4.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-md": ["clamp(1.75rem, 2.6vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-xl": ["clamp(1.25rem, 1.5vw, 1.75rem)", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "body-lg": ["clamp(1.05rem, 1.2vw, 1.35rem)", { lineHeight: "1.5" }],
        eyebrow: ["clamp(0.8rem, 0.9vw, 1rem)", { lineHeight: "1", letterSpacing: "0.22em", fontWeight: "700" }],
      },

      /* 8pt base grid + named layout tokens shared with Figma */
      spacing: {
        gutter: "2rem", // 32 — card padding
        "gutter-lg": "3rem", // 48 — section padding
        stage: "4.5rem", // 72 — outer stage padding
        tile: "13.5rem", // 216 — category tile min height
        answer: "8.5rem", // 136 — answer button min height
      },

      borderRadius: {
        tile: "1.5rem",
        card: "1.25rem",
        pill: "999px",
      },

      boxShadow: {
        tile: "0 1px 0 0 rgba(255,255,255,0.04) inset",
        "tile-hover": "0 24px 60px -20px rgba(0,0,0,0.8)",
        accent: "0 0 0 3px rgba(255,59,71,0.35)",
        correct: "0 0 0 3px rgba(22,224,126,0.35), 0 24px 60px -24px rgba(22,224,126,0.5)",
        wrong: "0 0 0 3px rgba(255,59,71,0.35)",
      },

      transitionTimingFunction: {
        stage: "cubic-bezier(0.22, 1, 0.36, 1)", // the house easing
      },

      keyframes: {
        "board-in": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "stage-in": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "expand-down": {
          "0%": { opacity: "0", maxHeight: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", maxHeight: "40rem", transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "15%, 55%": { transform: "translateX(-12px)" },
          "35%, 75%": { transform: "translateX(12px)" },
          "90%": { transform: "translateX(-4px)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(-16px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pulse-accent": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },

      animation: {
        "board-in": "board-in 0.45s cubic-bezier(0.22,1,0.36,1) both",
        "stage-in": "stage-in 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "expand-down": "expand-down 0.5s cubic-bezier(0.22,1,0.36,1) both",
        shake: "shake 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both",
        pop: "pop 0.35s cubic-bezier(0.22,1,0.36,1) both",
        "toast-in": "toast-in 0.3s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-accent": "pulse-accent 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

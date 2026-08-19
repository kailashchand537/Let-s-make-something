import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge can't tell a custom font-size token (`text-display-md`) from a
 * custom color token (`text-mp-paper-base`) — left to guess it drops one of
 * them. Teach it the DLS scales explicitly so `cn()` merges instead of eats.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "display-md",
            "body-xl",
            "body-lg",
            "eyebrow",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

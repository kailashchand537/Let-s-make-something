# Pick Me Behavior

A host-driven comedy trivia board for a live UI/UX team meeting. Five
provocative-sounding categories each turn out to be a real piece of design
history. The host screen-shares, the team shouts, the host clicks.

## Run it

```bash
npm install
npm run dev
```

## Hosting the game

| Key     | Board view          | Question view                     |
| ------- | ------------------- | --------------------------------- |
| `1`–`5` | Open that category  | Lock in options 1–4               |
| `A`–`D` | —                   | Lock in that option               |
| `Esc`   | —                   | Back to the board                 |

Everything is clickable too — the shortcuts just save hunting for a trackpad
mid-presentation.

- **Wrong guess:** the option shakes, locks red, and the question stays live.
- **Correct guess:** the option turns green and the real story expands below.
- **Back to board:** the played category greys out and locks.

## Design tokens

`tailwind.config.js` is the single source of truth for every color, type step,
spacing value, and animation in the project — no hex or px value lives anywhere
else. Token names map 1:1 to Figma variable paths, so a Figma MCP sync rewrites
that one block:

| Figma path        | Tailwind token           | Utility             |
| ----------------- | ------------------------ | ------------------- |
| `color/ink/base`  | `theme.colors.mp.ink.base` | `bg-mp-ink-base`  |
| `space/gutter`    | `theme.spacing.gutter`     | `p-gutter`        |
| `type/display-xl` | `theme.fontSize['display-xl']` | `text-display-xl` |

Two values are stand-ins pending the real Material+ specs: the accent palette
and `fontFamily.sans` (currently Inter). Swap them in the config and the whole
UI follows.

## Content

`src/data/pickMeBehavior.js` holds the categories, in the board's reading
order. Each entry carries an `edgyTitle` (what the board shows), a
`realSubject` (the bait-and-switch reveal), the question, four options, the
`correctOptionIndex`, and the `factExplanation` that expands on a correct guess.

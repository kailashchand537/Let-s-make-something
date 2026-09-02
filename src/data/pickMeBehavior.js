/**
 * Board content for "Pick Me Behavior" — UX/Design/Branding/Accessibility quiz.
 *
 * Order below is the on-screen reading order from the wireframe
 * (row 1: Inspiration / Market Fit / Design History,
 *  row 2: Quick Tap / Colour Vision); the `id` field stays
 * canonical so content can be re-sorted without breaking state.
 */
export const categories = [
  {
    id: "c1",
    edgyTitle: "Design History",
    realSubject: "The Apple Command Key (⌘)",
    question:
      "Where did original Mac designer Susan Kare actually find the famous Apple Command (⌘) symbol?",
    options: [
      "A spilled coffee ring on a napkin from a late-night design sprint",
      "A Celtic knot tattoo she saw on Steve Jobs' favorite barista",
      "A Swedish campground sign in an international symbol dictionary",
      "Two overlapping infinity loops representing infinite client revisions",
    ],
    correctOptionIndex: 2,
    factExplanation:
      "True story! Susan Kare was looking for a replacement for the Apple logo on the keyboard. She flipped through an international symbol dictionary and found the Swedish sign for a 'place of interest' or campground.",
  },
  {
    id: "c4",
    edgyTitle: "Market Fit",
    realSubject: "Internet Explorer 6",
    question:
      "What unusual action did web designers take in 2010 when Internet Explorer 6 finally started losing popularity?",
    options: [
      "They sent a giant cake to Microsoft headquarters",
      "They held an actual funeral for the browser in Denver with a casket",
      "They created a tool that replaced IE6 with Firefox",
      "They presented a petition to make IE6 usage illegal",
    ],
    correctOptionIndex: 1,
    factExplanation:
      "Designers hated fixing IE6 bugs so much that a design agency in Colorado threw a real funeral for it. Microsoft actually sent flowers with a note saying thank you.",
  },
  {
    id: "c2",
    edgyTitle: "Inspiration",
    realSubject: "The 2010 Pepsi Rebrand",
    question:
      "A design company charged Pepsi one million dollars for a logo redesign. Their 27-page strategy document claimed the new logo was inspired by what?",
    options: [
      "The Earth's magnetic field, the Mona Lisa, feng shui, and the Parthenon",
      "A focus group of 400 people describing circles they saw in dreams",
      "The exact shape of a Coca-Cola bottle, flipped upside down",
      "The CEO's handwriting scanned and smoothed by hand",
    ],
    correctOptionIndex: 0,
    factExplanation:
      "The document traced the Pepsi globe through the golden ratio, Earth's magnetic field, feng shui, the Mona Lisa and the Parthenon. It even said the smile should widen on Diet Pepsi and widen more on Pepsi Max. The internet found it and has laughed ever since.",
  },
  {
    id: "c5",
    edgyTitle: "Colour Vision",
    realSubject: "Designing for Colour Blindness",
    question:
      "Roughly how many men cannot tell red and green apart?",
    options: [
      "About 1 in 12",
      "About 1 in 100",
      "About 1 in 500",
      "About 1 in 2,000",
    ],
    correctOptionIndex: 0,
    factExplanation:
      "About 1 in 12 men and 1 in 200 women. In a room of 24 men, two cannot read red error messages next to green success messages. That is why good design never uses colour alone to mean something—it adds an icon, a label, or a shape.",
  },
  {
    id: "c3",
    edgyTitle: "Quick Tap",
    realSubject: "Mobile Touch Target Size",
    question:
      "On a phone or tablet, what is the minimum size a button should be so people can tap it without missing?",
    options: [
      "24 pixels by 24 pixels",
      "44 pixels by 44 pixels",
      "64 pixels by 64 pixels",
      "16 pixels by 16 pixels",
    ],
    correctOptionIndex: 1,
    factExplanation:
      "44 by 44 pixels is the standard for iOS and Android. It is big enough for an adult finger. Smaller buttons make people tap the wrong thing. That is why bad mobile apps feel frustrating—often the buttons are just too small.",
  },
];

export default categories;

/**
 * Board content for "Pick Me Behavior".
 *
 * Order below is the on-screen reading order from the wireframe
 * (row 1: Violent Content / Toxic Ex / Getting Dirty,
 *  row 2: Frontal Nudity / Unsolicited DPs); the `id` field stays
 * canonical so content can be re-sorted without breaking state.
 */
export const categories = [
  {
    id: "c2",
    edgyTitle: "Violent Content",
    realSubject: "Legacy HTML Color Parsing",
    question:
      'Due to a weird quirk in how legacy Netscape parsed HTML color codes, what actually happens if you type `<body bgcolor="chucknorris">`?',
    options: [
      "The browser translates the text into valid hex values and renders a blood red background",
      "The browser immediately crashes and deletes your CSS file",
      "It forces all your typography into the Impact font",
      "A hidden Easter egg GIF of a roundhouse kick appears on hover",
    ],
    correctOptionIndex: 0,
    factExplanation:
      "Because 'chucknorris' isn't a valid hex code, legacy browsers replace non-hex characters with 0s, mathematically grouping them into 'C00000', which renders as a deep blood red!",
  },
  {
    id: "c4",
    edgyTitle: "Toxic Ex",
    realSubject: "Internet Explorer 6",
    question:
      "What bizarre action did the web design community take in 2010 when Internet Explorer 6 finally started dropping in market share?",
    options: [
      "They sent a giant 'Sorry for your loss' cake to Microsoft headquarters",
      "They held a literal funeral for the browser in Denver, complete with a casket and eulogies",
      "They created a virus that replaced IE6 icons with the Firefox logo",
      "They successfully lobbied the UN to classify IE6 as a human rights violation",
    ],
    correctOptionIndex: 1,
    factExplanation:
      "Web designers hated designing around IE6 bugs so much that a design agency in Colorado threw a literal funeral for it. Microsoft even sent flowers to the funeral with a note saying 'Thanks for the good times.'",
  },
  {
    id: "c1",
    edgyTitle: "Getting Dirty in the Woods",
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
      "True story! Susan Kare was frantically looking for a replacement for the Apple logo on the keyboard. She flipped through an international symbol dictionary and found the Swedish sign for a 'place of interest' or campground.",
  },
  {
    id: "c3",
    edgyTitle: "Frontal Nudity",
    realSubject: "Front-End Dev Before CSS",
    question:
      "In 1993, before CSS was invented, how did the creator of HTML (Tim Berners-Lee) expect designers to style their websites?",
    options: [
      "By using spaces and 'enter' keys repeatedly to manually align everything",
      "He didn't. He thought users would apply their own styles locally, and designers shouldn't dictate how a page looks",
      "By mailing physical 'style' floppy disks to their users",
      "By uploading pixel-perfect images of text instead of typing it out",
    ],
    correctOptionIndex: 1,
    factExplanation:
      "Tim Berners-Lee originally believed web pages were just for pure information. He felt that the user's browser should dictate the fonts and colors, and that 'web design' as a profession shouldn't even exist!",
  },
  {
    id: "c5",
    edgyTitle: "Unsolicited DPs",
    realSubject: "Density-Independent Pixels (DPs)",
    question:
      "Google introduced the 'dp' measurement to fix Android screen fragmentation, but what was their original internal name for the famous Android robot logo?",
    options: ["Bugdroid", "Andy the Android", "Green Bean", "Steve"],
    correctOptionIndex: 0,
    factExplanation:
      "While often called 'Andy' by fans, the internal Google design team originally named the mascot 'Bugdroid'. It was created by designer Irina Blok, who was heavily inspired by the male/female pictograms on restroom doors!",
  },
];

export default categories;

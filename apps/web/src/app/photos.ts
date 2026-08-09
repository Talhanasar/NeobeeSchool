export type Photo = {
  /** Set to the public path (e.g. "/images/class-baby-bees.jpg") once a real
   *  photograph is supplied. While null, a branded placeholder renders. */
  readonly src: string | null;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export const photos = {
  babyBees: {
    src: "/images/class-baby-bees.png",
    alt: "A two-year-old exploring a wooden sensory tray with a teacher at Neobee Preschool",
    width: 800,
    height: 1000,
  },
  explorerBees: {
    src: "/images/class-explorer-bees.png",
    alt: "A three-year-old stacking colourful wooden blocks in the Explorer Bees classroom",
    width: 800,
    height: 1000,
  },
  bumbleBees: {
    src: "/images/class-bumble-bees.png",
    alt: "A four-year-old practising early writing with a chunky pencil at Neobee Preschool",
    width: 800,
    height: 1000,
  },
  honeyBees: {
    src: "/images/class-honey-bees.png",
    alt: "A five-year-old reading a picture book aloud to classmates before Grade 1",
    width: 800,
    height: 1000,
  },
  dayWelcome: {
    src: "/images/day-welcome.png",
    alt: "A child hanging a backpack on a low peg rail at morning welcome",
    width: 600,
    height: 600,
  },
  dayCircle: {
    src: "/images/day-circle.png",
    alt: "Young children sitting in a circle for morning songs and dua",
    width: 600,
    height: 600,
  },
  dayPlay: {
    src: "/images/day-play.png",
    alt: "Children’s hands sorting colourful counting beads during purposeful play",
    width: 600,
    height: 600,
  },
  dayHome: {
    src: "/images/day-home.png",
    alt: "A child holding the daily parent diary at home time",
    width: 600,
    height: 600,
  },
  campusSoftPlay: {
    src: "/images/campus-soft-play.png",
    alt: "Indoor soft play area with padded foam shapes at Neobee Preschool in Panchlaish",
    width: 1600,
    height: 900,
  },
  campusClassroom: {
    src: "/images/campus-classroom.png",
    alt: "A bright child-sized preschool classroom with low open shelving",
    width: 1200,
    height: 900,
  },
  campusReading: {
    src: "/images/library.png",
    alt: "The library corner with baskets of English and Bangla picture books sorted by theme",
    width: 1200,
    height: 900,
  },
  campusGarden: {
    src: "/images/garden.png",
    alt: "Our outdoor play garden with a climbing structure, sandpit, and plants children help tend",
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, Photo>;

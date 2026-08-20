import type { ImageSourcePropType } from 'react-native';

export type PhotoKey =
  | 'babyBees'
  | 'explorerBees'
  | 'bumbleBees'
  | 'honeyBees'
  | 'dayWelcome'
  | 'dayCircle'
  | 'dayPlay'
  | 'dayHome'
  | 'campusSoftPlay'
  | 'campusClassroom'
  | 'campusReading'
  | 'campusGarden';

export type Photo = {
  readonly source: ImageSourcePropType;
  readonly alt: string;
  readonly aspectRatio: number; // width / height
};

export const photos: Record<PhotoKey, Photo> = {
  babyBees: {
    source: require('../assets/images/class-baby-bees.jpg'),
    alt: 'A two-year-old exploring a wooden sensory tray with a teacher at Neobee Preschool',
    aspectRatio: 800 / 1000,
  },
  explorerBees: {
    source: require('../assets/images/class-explorer-bees.jpg'),
    alt: 'A three-year-old stacking colourful wooden blocks in the Explorer Bees classroom',
    aspectRatio: 800 / 1000,
  },
  bumbleBees: {
    source: require('../assets/images/class-bumble-bees.jpg'),
    alt: 'A four-year-old practising early writing with a chunky pencil at Neobee Preschool',
    aspectRatio: 800 / 1000,
  },
  honeyBees: {
    source: require('../assets/images/class-honey-bees.jpg'),
    alt: 'A five-year-old reading a picture book aloud to classmates before Grade 1',
    aspectRatio: 800 / 1000,
  },
  dayWelcome: {
    source: require('../assets/images/day-welcome.jpg'),
    alt: 'A child hanging a backpack on a low peg rail at morning welcome',
    aspectRatio: 1,
  },
  dayCircle: {
    source: require('../assets/images/day-circle.jpg'),
    alt: 'Young children sitting in a circle for morning songs and dua',
    aspectRatio: 1,
  },
  dayPlay: {
    source: require('../assets/images/day-play.jpg'),
    alt: "Children's hands sorting colourful counting beads during purposeful play",
    aspectRatio: 1,
  },
  dayHome: {
    source: require('../assets/images/day-home.jpg'),
    alt: 'A child holding the daily parent diary at home time',
    aspectRatio: 1,
  },
  campusSoftPlay: {
    source: require('../assets/images/campus-soft-play.jpg'),
    alt: 'Indoor soft play area with padded foam shapes at Neobee Preschool in Panchlaish',
    aspectRatio: 1600 / 900,
  },
  campusClassroom: {
    source: require('../assets/images/campus-classroom.jpg'),
    alt: 'A bright child-sized preschool classroom with low open shelving',
    aspectRatio: 1200 / 900,
  },
  campusReading: {
    source: require('../assets/images/library.jpg'),
    alt: 'The library corner with baskets of English and Bangla picture books sorted by theme',
    aspectRatio: 1200 / 900,
  },
  campusGarden: {
    source: require('../assets/images/garden.jpg'),
    alt: 'Our outdoor play garden with a climbing structure, sandpit, and plants children help tend',
    aspectRatio: 1200 / 900,
  },
};

export function getPhoto(key: PhotoKey): Photo {
  return photos[key];
}

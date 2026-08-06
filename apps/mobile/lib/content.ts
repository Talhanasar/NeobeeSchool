export type IconName =
  | 'book'
  | 'heart'
  | 'leaf'
  | 'blocks'
  | 'language'
  | 'moon'
  | 'calendar'
  | 'play'
  | 'shield'
  | 'camera'
  | 'firstAid'
  | 'fire'
  | 'pickup'
  | 'pin'
  | 'phone'
  | 'mail'
  | 'location'
  | 'clock'
  | 'arrow'
  | 'check';

type ClassItem = {
  readonly name: string;
  readonly age: string;
  readonly tagline: string;
  readonly description: string;
  readonly skills: readonly string[];
  readonly color: 'gold' | 'green' | 'blue' | 'rose';
};

export const classes: readonly ClassItem[] = [
  {
    name: 'Baby Bees',
    age: 'Ages 2–3',
    tagline: 'Gentle beginnings',
    description:
      'Nurturing routines, sensory discovery, language-rich play, and patient settling-in support.',
    skills: ['Sensory play', 'Songs & rhymes', 'Colors & shapes', 'Daily dua'],
    color: 'gold',
  },
  {
    name: 'Explorer Bees',
    age: 'Ages 3–4',
    tagline: 'Curiosity takes the lead',
    description:
      'First letters, numbers, creative play, and small experiments that make discovery feel joyful.',
    skills: ['Letters A–Z', 'Counting 1–10', 'Bangla Bornomala', 'Creative play'],
    color: 'green',
  },
  {
    name: 'Bumble Bees',
    age: 'Ages 4–5',
    tagline: 'Confident foundations',
    description:
      'Phonics, pencil control, early maths, and storytelling taught through active, purposeful play.',
    skills: ['Early phonics', 'Numbers 1–20', 'Writing readiness', 'Storytelling'],
    color: 'blue',
  },
  {
    name: 'Honey Bees',
    age: 'Ages 5–6',
    tagline: 'Ready for the next flight',
    description:
      'Reading, sentence building, practical maths, and weekly sharing to prepare children for Grade 1.',
    skills: ['Early reading', 'Sentence building', 'Maths to 20', 'Show & tell'],
    color: 'rose',
  },
] as const;

export const curriculum = [
  {
    icon: 'book' as const,
    title: 'International early-years pathway',
    text: 'Age-aware learning goals across communication, early literacy, numeracy, physical growth, and creativity.',
  },
  {
    icon: 'language' as const,
    title: 'English, Bangla & early phonics',
    text: 'Stories, sound-play, rhymes, and Bangla Bornomala grow confident communicators in both languages.',
  },
  {
    icon: 'blocks' as const,
    title: 'Play with a purpose',
    text: 'Blocks, role-play, art, movement, and discovery tasks place a learning goal inside every activity.',
  },
  {
    icon: 'calendar' as const,
    title: 'A clear family learning journey',
    text: 'Shared monthly themes, daily diaries, and gentle progress observations help families stay connected.',
  },
] as const;

export const dailyRhythm = [
  {
    time: '8:30',
    title: 'Warm welcome',
    text: 'Free play and a gentle transition into the school day.',
  },
  {
    time: '9:00',
    title: 'Circle & dua',
    text: 'Songs, greetings, a short dua, and today’s theme.',
  },
  {
    time: '9:25',
    title: 'Purposeful play',
    text: 'Hands-on English, Bangla, maths, and discovery activities.',
  },
  {
    time: '10:15',
    title: 'Snack & reset',
    text: 'A healthy break, conversation, and calm recharge time.',
  },
  {
    time: '10:45',
    title: 'Create & move',
    text: 'Art, stories, music, soft play, and imaginative movement.',
  },
  {
    time: '11:30',
    title: 'Home-time connection',
    text: 'Closing circle and a diary note to take home.',
  },
] as const;

export const facilities = [
  {
    icon: 'play' as const,
    title: 'Indoor soft play',
    text: 'A padded active-play space for climbing, balancing, jumping, and big-body movement.',
  },
  {
    icon: 'blocks' as const,
    title: 'Child-sized classrooms',
    text: 'Bright learning corners, reachable resources, soft surfaces, and rounded furniture.',
  },
  {
    icon: 'book' as const,
    title: 'Little readers’ corner',
    text: 'English and Bangla picture books children can choose, share, and revisit independently.',
  },
  {
    icon: 'leaf' as const,
    title: 'Calm care spaces',
    text: 'Thoughtful hygiene routines and patient support for the youngest children’s needs.',
  },
] as const;

export const safety = [
  { icon: 'camera' as const, label: 'CCTV-monitored campus' },
  { icon: 'firstAid' as const, label: 'First-aid ready staff' },
  { icon: 'shield' as const, label: 'Child protection practice' },
  { icon: 'fire' as const, label: 'Fire-safety equipment' },
  { icon: 'pickup' as const, label: 'Verified guardian pickup' },
] as const;

export const teachers = [
  {
    initials: 'NJ',
    name: 'Ms. Nusrat Jahan',
    role: 'Baby Bees lead teacher',
    detail: 'Sample qualification · Early childhood education',
  },
  {
    initials: 'SI',
    name: 'Ms. Sadia Islam',
    role: 'Explorer Bees teacher',
    detail: 'Sample qualification · Montessori practice',
  },
  {
    initials: 'FA',
    name: 'Ms. Farzana Akter',
    role: 'Bumble Bees teacher',
    detail: 'Sample qualification · Early phonics training',
  },
  {
    initials: 'MR',
    name: 'Ms. Maimuna Rahman',
    role: 'Honey Bees teacher',
    detail: 'Sample qualification · Early-years practice',
  },
] as const;

export const notices = [
  {
    day: '01',
    month: 'JUL',
    title: 'Admissions open for the 2026–27 founding session',
    note: 'Demo notice · Limited-seat messaging from the approved reference.',
  },
  {
    day: '15',
    month: 'JUL',
    title: 'Campus visits available for interested families',
    note: 'Demo notice · Please call ahead before visiting.',
  },
  {
    day: '01',
    month: 'NOV',
    title: 'Planned first day of the founding session',
    note: 'Demo notice · Dates require confirmation before launch.',
  },
] as const;

export const stats = [
  { value: '4', label: 'class levels' },
  { value: '12', label: 'shared themes' },
  { value: '2–6', label: 'years old' },
  { value: '5', label: 'growth areas' },
] as const;

export const contact = {
  address:
    'Panchlaish R/A, opposite Halda Officers Apartment, Panchlaish, Chattogram, Bangladesh',
  phone: '+88 013 4744 9472',
  email: 'neobeepreschool@gmail.com',
  hours: 'Sunday–Thursday · Call ahead\nFriday & Saturday · Closed',
  mapQuery: 'Panchlaish Residential Area Chattogram',
} as const;

export const admissionSteps = [
  {
    step: 1,
    title: 'Talk or visit',
    text: 'Call the school or arrange a campus visit to meet the team and explore your questions.',
  },
  {
    step: 2,
    title: 'Share child details',
    text: 'Complete the official application process once the child’s age and suitable class are confirmed.',
  },
  {
    step: 3,
    title: 'Prepare for welcome day',
    text: 'Receive confirmed schedules, documents, book information, and settling-in guidance.',
  },
] as const;

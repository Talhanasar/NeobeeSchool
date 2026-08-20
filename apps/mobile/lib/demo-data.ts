// Demo data for the parent portal dashboard.
// All names, students, attendance, diary entries, and invoices are fictional.
// Shape mirrors what a Supabase schema might look like later.

export type AttendanceStatus = 'present' | 'absent' | 'late';
export type Mood = 'happy' | 'calm' | 'tired' | 'playful' | 'thoughtful';
export type InvoiceStatus = 'paid' | 'due' | 'overdue';

export type Student = {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly className: string;
  readonly classColor: 'gold' | 'green' | 'blue' | 'rose';
  readonly teacherName: string;
  readonly guardianName: string;
  readonly relation: string;
};

export type AttendanceRecord = {
  readonly date: string; // ISO date
  readonly status: AttendanceStatus;
};

export type DiaryEntry = {
  readonly date: string; // ISO date
  readonly meals: string;
  readonly nap: string;
  readonly activities: string;
  readonly mood: Mood;
  readonly note: string;
};

export type GrowthSummary = {
  readonly heightCm: number;
  readonly weightKg: number;
  readonly lastChecked: string; // ISO date
  readonly milestones: readonly string[];
};

export type Invoice = {
  readonly id: string;
  readonly month: string;
  readonly item: string;
  readonly amountBdt: number;
  readonly status: InvoiceStatus;
  readonly dueDate: string; // ISO date
  readonly paidOn: string | null; // ISO date or null
};

export type PortalNotice = {
  readonly id: string;
  readonly date: string; // ISO date
  readonly title: string;
  readonly body: string;
  readonly tag: 'Admissions' | 'Event' | 'Reminder' | 'Holiday';
};

// -- Linked child (the parent's child) ---------------------------------------

export const linkedChild: Student = {
  id: 'stu-ariaan',
  name: 'Ariaan Hossain',
  initials: 'AH',
  className: 'Honey Bees',
  classColor: 'rose',
  teacherName: 'Ms. Farhana Akter',
  guardianName: 'Mrs. Tahmina Hossain',
  relation: 'Mother',
};

// -- Attendance (last 7 days) -------------------------------------------------

export const attendance: readonly AttendanceRecord[] = [
  { date: '2026-07-25', status: 'present' },
  { date: '2026-07-24', status: 'present' },
  { date: '2026-07-23', status: 'present' },
  { date: '2026-07-22', status: 'late' },
  { date: '2026-07-21', status: 'present' },
  { date: '2026-07-20', status: 'absent' },
  { date: '2026-07-19', status: 'present' },
];

// -- Diary entries -------------------------------------------------------------

export const diaryEntries: readonly DiaryEntry[] = [
  {
    date: '2026-07-25',
    meals: 'Breakfast: oats & banana · Lunch: rice, dal, mixed veg',
    nap: 'Did not nap',
    activities: 'Show & tell · CVC word reading · Number bonds to 10',
    mood: 'happy',
    note: 'Read a full sentence aloud today, mashaAllah — very proud.',
  },
  {
    date: '2026-07-24',
    meals: 'Breakfast: paratha & egg · Lunch: khichuri & salad',
    nap: 'Rested 20 minutes',
    activities: 'Story: The Very Hungry Caterpillar · Soft play zone',
    mood: 'playful',
    note: 'Joined group singing confidently.',
  },
  {
    date: '2026-07-23',
    meals: 'Breakfast: milk & toast · Lunch: rice, fish curry, cucumber',
    nap: 'Napped 30 minutes',
    activities: 'Phonics blend review · Bangla Bornomala খ-গ',
    mood: 'calm',
    note: 'Helped a friend tidy the reading corner.',
  },
];

// -- Growth summary -----------------------------------------------------------

export const growth: GrowthSummary = {
  heightCm: 112,
  weightKg: 19.4,
  lastChecked: '2026-07-15',
  milestones: [
    'Reads three-word sentences independently',
    'Counts reliably to 20',
    'Recognises Bangla letters খ, গ, ঘ',
    'Ties shoelaces with minimal help',
  ],
};

// -- Invoices -----------------------------------------------------------------

export const invoices: readonly Invoice[] = [
  {
    id: 'inv-2026-06',
    month: 'June 2026',
    item: 'Monthly tuition · Honey Bees',
    amountBdt: 8500,
    status: 'paid',
    dueDate: '2026-06-10',
    paidOn: '2026-06-08',
  },
  {
    id: 'inv-2026-07',
    month: 'July 2026',
    item: 'Monthly tuition · Honey Bees',
    amountBdt: 8500,
    status: 'due',
    dueDate: '2026-07-10',
    paidOn: null,
  },
  {
    id: 'inv-2026-07-book',
    month: 'July 2026',
    item: 'Term book set · Honey Bees',
    amountBdt: 2200,
    status: 'paid',
    dueDate: '2026-07-05',
    paidOn: '2026-07-04',
  },
];

// -- Notices ------------------------------------------------------------------

export const portalNotices: readonly PortalNotice[] = [
  {
    id: 'n-001',
    date: '2026-07-01',
    title: 'Admissions open for the 2026–27 founding session',
    body: 'Demo notice · Limited-seat messaging from the approved reference.',
    tag: 'Admissions',
  },
  {
    id: 'n-002',
    date: '2026-07-15',
    title: 'Campus visits available for interested families',
    body: 'Demo notice · Please call ahead before visiting.',
    tag: 'Event',
  },
  {
    id: 'n-003',
    date: '2026-11-01',
    title: 'Planned first day of the founding session',
    body: 'Demo notice · Dates require confirmation before launch.',
    tag: 'Holiday',
  },
  {
    id: 'n-004',
    date: '2026-07-28',
    title: 'Parent orientation evening',
    body: 'Demo notice · All guardians welcome, details shared via SMS.',
    tag: 'Reminder',
  },
];

// -- Persona -------------------------------------------------------------------

export const parentPersona = {
  name: 'Mrs. Tahmina Hossain',
  subtitle: 'Guardian of Ariaan · Demo parent persona',
} as const;

// -- Helpers -------------------------------------------------------------------

export function formatBdt(amount: number): string {
  return `\u09F3 ${amount.toLocaleString('en-BD')}`;
}

export function attendanceSummary(records: readonly AttendanceRecord[]): {
  present: number;
  absent: number;
  late: number;
} {
  return {
    present: records.filter((r) => r.status === 'present').length,
    absent: records.filter((r) => r.status === 'absent').length,
    late: records.filter((r) => r.status === 'late').length,
  };
}

export function dueTotal(items: readonly Invoice[]): number {
  return items
    .filter((i) => i.status === 'due' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amountBdt, 0);
}

// -- Demo credentials ----------------------------------------------------------

// ponytail: client-side demo credentials with no real auth — replace with a real auth call when a backend exists.

import type { Role } from './session';

export const demoCredentials: Record<
  Role,
  { readonly phone: string; readonly password: string; readonly label: string }
> = {
  parent: {
    phone: '01711 000 111',
    password: 'neobee123',
    label: 'Mrs. Tahmina Hossain\u00B7Parent',
  },
  teacher: {
    phone: '01711 000 222',
    password: 'neobee123',
    label: 'Ms. Farhana\u00B7Teacher',
  },
};

export function checkCredentials(
  role: Role,
  phone: string,
  password: string,
): boolean {
  const entry = demoCredentials[role];
  const normalisePhone = (p: string) => p.replace(/\s/g, '');
  return normalisePhone(phone) === normalisePhone(entry.phone) && password === entry.password;
}

// -- Teacher persona -----------------------------------------------------------

export const teacherPersona = {
  name: 'Ms. Farhana Akter',
  subtitle: 'Honey Bees class teacher\u00B7Demo teacher persona',
} as const;

// -- Teacher class & roster ----------------------------------------------------

export type RosterEntry = { readonly student: Student; readonly today: AttendanceStatus };

export const teacherClass: {
  readonly className: string;
  readonly room: string;
  readonly roster: readonly RosterEntry[];
} = {
  className: 'Honey Bees',
  room: 'Room 3',
  roster: [
    { student: linkedChild, today: 'present' },
    {
      student: {
        id: 'stu-fariha',
        name: 'Fariha Islam',
        initials: 'FI',
        className: 'Honey Bees',
        classColor: 'rose',
        teacherName: 'Ms. Farhana Akter',
        guardianName: 'Mr. Rasel Islam',
        relation: 'Father',
      },
      today: 'present',
    },
    {
      student: {
        id: 'stu-rafi',
        name: 'Rafi Ahmed',
        initials: 'RA',
        className: 'Honey Bees',
        classColor: 'rose',
        teacherName: 'Ms. Farhana Akter',
        guardianName: 'Mrs. Samira Ahmed',
        relation: 'Mother',
      },
      today: 'absent',
    },
    {
      student: {
        id: 'stu-tasnia',
        name: 'Tasnia Begum',
        initials: 'TB',
        className: 'Honey Bees',
        classColor: 'rose',
        teacherName: 'Ms. Farhana Akter',
        guardianName: 'Mrs. Layla Begum',
        relation: 'Mother',
      },
      today: 'present',
    },
    {
      student: {
        id: 'stu-imran',
        name: 'Imran Hossain',
        initials: 'IH',
        className: 'Honey Bees',
        classColor: 'rose',
        teacherName: 'Ms. Farhana Akter',
        guardianName: 'Mr. Kamal Hossain',
        relation: 'Father',
      },
      today: 'late',
    },
    {
      student: {
        id: 'stu-zara',
        name: 'Zara Chowdhury',
        initials: 'ZC',
        className: 'Honey Bees',
        classColor: 'rose',
        teacherName: 'Ms. Farhana Akter',
        guardianName: 'Mrs. Nargis Chowdhury',
        relation: 'Mother',
      },
      today: 'present',
    },
  ],
};

export function rosterSummary(roster: readonly RosterEntry[]): {
  present: number;
  absent: number;
  late: number;
} {
  return {
    present: roster.filter((r) => r.today === 'present').length,
    absent: roster.filter((r) => r.today === 'absent').length,
    late: roster.filter((r) => r.today === 'late').length,
  };
}

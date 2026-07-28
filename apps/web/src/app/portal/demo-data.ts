// Local demo data for the role-based portal prototype.
// All names, students, attendance, diary entries, and invoices are fictional
// and only exist in memory. Shape mirrors what a Supabase schema might look
// like later (string ids, foreign-key-style references).

export type Role = "admin" | "teacher" | "parent";

export type ClassId = "baby-bees" | "explorer-bees" | "bumble-bees" | "honey-bees";
export type TeacherId = "nusrat" | "sadia" | "farzana" | "maimuna";
export type StudentId =
  | "stu-ariaan"
  | "stu-mahira"
  | "stu-zara"
  | "stu-saifan"
  | "stu-nusaybah"
  | "stu-rafsan";

export type AttendanceStatus = "present" | "absent" | "late";
export type Mood = "happy" | "calm" | "tired" | "playful" | "thoughtful";
export type InvoiceStatus = "paid" | "due" | "overdue";
export type PipelineStage =
  | "New inquiry"
  | "Tour booked"
  | "Assessment"
  | "Offered"
  | "Enrolled";

export type DemoClass = {
  readonly id: ClassId;
  readonly name: string;
  readonly ageBand: string;
  readonly tagline: string;
  readonly color: "gold" | "green" | "blue" | "rose";
  readonly leadTeacherId: TeacherId;
};

export type Teacher = {
  readonly id: TeacherId;
  readonly name: string;
  readonly initials: string;
  readonly role: string;
  readonly classIds: readonly ClassId[];
  readonly qualification: string;
};

export type Student = {
  readonly id: StudentId;
  readonly name: string;
  readonly initials: string;
  readonly classId: ClassId;
  readonly guardianName: string;
  readonly relation: string;
  readonly enrolledOn: string; // ISO date
};

export type AttendanceRecord = {
  readonly studentId: StudentId;
  readonly date: string; // ISO date
  readonly status: AttendanceStatus;
};

export type DiaryEntry = {
  readonly studentId: StudentId;
  readonly date: string; // ISO date
  readonly meals: string;
  readonly nap: string;
  readonly activities: string;
  readonly mood: Mood;
  readonly note: string;
};

export type GrowthSummary = {
  readonly studentId: StudentId;
  readonly heightCm: number;
  readonly weightKg: number;
  readonly lastChecked: string; // ISO date
  readonly milestones: readonly string[];
};

export type Invoice = {
  readonly id: string;
  readonly studentId: StudentId;
  readonly month: string;
  readonly item: string;
  readonly amountBdt: number;
  readonly status: InvoiceStatus;
  readonly dueDate: string; // ISO date
  readonly paidOn: string | null; // ISO date or null
};

export type Notice = {
  readonly id: string;
  readonly date: string; // ISO date
  readonly title: string;
  readonly body: string;
  readonly tag: "Admissions" | "Event" | "Reminder" | "Holiday";
};

export type PipelineColumn = {
  readonly stage: PipelineStage;
  readonly count: number;
  readonly leads: readonly { name: string; classLabel: string; age: string }[];
};

export type AdminMetric = {
  readonly id: "enrolled" | "attendance" | "inquiries" | "feesDue";
  readonly label: string;
  readonly value: string;
  readonly sub: string;
  readonly tone: "honey" | "leaf" | "rose" | "sky";
};

// -- Classes -----------------------------------------------------------------

export const classes: readonly DemoClass[] = [
  {
    id: "baby-bees",
    name: "Baby Bees",
    ageBand: "Ages 2–3",
    tagline: "Gentle beginnings",
    color: "gold",
    leadTeacherId: "nusrat",
  },
  {
    id: "explorer-bees",
    name: "Explorer Bees",
    ageBand: "Ages 3–4",
    tagline: "Curiosity takes the lead",
    color: "green",
    leadTeacherId: "sadia",
  },
  {
    id: "bumble-bees",
    name: "Bumble Bees",
    ageBand: "Ages 4–5",
    tagline: "Confident foundations",
    color: "blue",
    leadTeacherId: "farzana",
  },
  {
    id: "honey-bees",
    name: "Honey Bees",
    ageBand: "Ages 5–6",
    tagline: "Ready for the next flight",
    color: "rose",
    leadTeacherId: "maimuna",
  },
];

// -- Teachers (names reused from public page) --------------------------------

export const teachers: readonly Teacher[] = [
  {
    id: "nusrat",
    name: "Ms. Nusrat Jahan",
    initials: "NJ",
    role: "Baby Bees lead teacher",
    classIds: ["baby-bees"],
    qualification: "Sample qualification · Early childhood education",
  },
  {
    id: "sadia",
    name: "Ms. Sadia Islam",
    initials: "SI",
    role: "Explorer Bees teacher",
    classIds: ["explorer-bees"],
    qualification: "Sample qualification · Montessori practice",
  },
  {
    id: "farzana",
    name: "Ms. Farzana Akter",
    initials: "FA",
    role: "Bumble Bees teacher",
    classIds: ["bumble-bees"],
    qualification: "Sample qualification · Early phonics training",
  },
  {
    id: "maimuna",
    name: "Ms. Maimuna Rahman",
    initials: "MR",
    role: "Honey Bees teacher",
    classIds: ["honey-bees"],
    qualification: "Sample qualification · Early-years practice",
  },
];

// -- Students (fictional Bangla-appropriate names) ----------------------------

export const students: readonly Student[] = [
  {
    id: "stu-ariaan",
    name: "Ariaan Hossain",
    initials: "AH",
    classId: "honey-bees",
    guardianName: "Mrs. Tahmina Hossain",
    relation: "Mother",
    enrolledOn: "2026-07-08",
  },
  {
    id: "stu-mahira",
    name: "Mahira Khan",
    initials: "MK",
    classId: "explorer-bees",
    guardianName: "Mr. Imran Khan",
    relation: "Father",
    enrolledOn: "2026-07-12",
  },
  {
    id: "stu-zara",
    name: "Zara Tabassum",
    initials: "ZT",
    classId: "bumble-bees",
    guardianName: "Mrs. Sadia Tabassum",
    relation: "Mother",
    enrolledOn: "2026-07-15",
  },
  {
    id: "stu-saifan",
    name: "Saifan Rahman",
    initials: "SR",
    classId: "honey-bees",
    guardianName: "Mr. Tanvir Rahman",
    relation: "Father",
    enrolledOn: "2026-07-18",
  },
  {
    id: "stu-nusaybah",
    name: "Nusaybah Chowdhury",
    initials: "NC",
    classId: "baby-bees",
    guardianName: "Mrs. Rifat Chowdhury",
    relation: "Mother",
    enrolledOn: "2026-07-21",
  },
  {
    id: "stu-rafsan",
    name: "Rafsan Ahmed",
    initials: "RA",
    classId: "explorer-bees",
    guardianName: "Mr. Nazmul Ahmed",
    relation: "Father",
    enrolledOn: "2026-07-22",
  },
];

// The "linked child" shown in the parent demo dashboard.
export const linkedChildId: StudentId = "stu-ariaan";

// -- Attendance --------------------------------------------------------------

export const attendance: readonly AttendanceRecord[] = [
  // Today: 2026-07-25
  { studentId: "stu-ariaan", date: "2026-07-25", status: "present" },
  { studentId: "stu-mahira", date: "2026-07-25", status: "present" },
  { studentId: "stu-zara", date: "2026-07-25", status: "late" },
  { studentId: "stu-saifan", date: "2026-07-25", status: "present" },
  { studentId: "stu-nusaybah", date: "2026-07-25", status: "absent" },
  { studentId: "stu-rafsan", date: "2026-07-25", status: "present" },

  // Recent prior days for the linked child + class peers
  { studentId: "stu-ariaan", date: "2026-07-24", status: "present" },
  { studentId: "stu-ariaan", date: "2026-07-23", status: "present" },
  { studentId: "stu-ariaan", date: "2026-07-22", status: "late" },
  { studentId: "stu-ariaan", date: "2026-07-21", status: "present" },
  { studentId: "stu-ariaan", date: "2026-07-20", status: "absent" },
  { studentId: "stu-ariaan", date: "2026-07-19", status: "present" },

  { studentId: "stu-mahira", date: "2026-07-24", status: "present" },
  { studentId: "stu-mahira", date: "2026-07-23", status: "present" },
  { studentId: "stu-rafsan", date: "2026-07-24", status: "absent" },
  { studentId: "stu-rafsan", date: "2026-07-23", status: "present" },
];

// -- Diary -------------------------------------------------------------------

export const diaryEntries: readonly DiaryEntry[] = [
  {
    studentId: "stu-ariaan",
    date: "2026-07-25",
    meals: "Breakfast: oats & banana · Lunch: rice, dal, mixed veg",
    nap: "Did not nap",
    activities: "Show & tell · CVC word reading · Number bonds to 10",
    mood: "happy",
    note: "Read a full sentence aloud today, mashaAllah — very proud.",
  },
  {
    studentId: "stu-ariaan",
    date: "2026-07-24",
    meals: "Breakfast: paratha & egg · Lunch: khichuri & salad",
    nap: "Rested 20 minutes",
    activities: "Story: The Very Hungry Caterpillar · Soft play zone",
    mood: "playful",
    note: "Joined group singing confidently.",
  },
  {
    studentId: "stu-ariaan",
    date: "2026-07-23",
    meals: "Breakfast: milk & toast · Lunch: rice, fish curry, cucumber",
    nap: "Napped 30 minutes",
    activities: "Phonics blend review · Bangla Bornomala খ-গ",
    mood: "calm",
    note: "Helped a friend tidy the reading corner.",
  },
  {
    studentId: "stu-mahira",
    date: "2026-07-25",
    meals: "Breakfast: cereal & milk · Lunch: rice, chicken curry",
    nap: "Napped 45 minutes",
    activities: "Circle time — ‘My Family’ theme · Block play",
    mood: "happy",
    note: "Shared a story about her younger brother.",
  },
  {
    studentId: "stu-rafsan",
    date: "2026-07-25",
    meals: "Breakfast: banana & toast · Lunch: rice, daal, carrot",
    nap: "Rested 25 minutes",
    activities: "Letter tracing A–E · Outdoor movement game",
    mood: "thoughtful",
    note: "Quiet today — asked lots of questions about insects.",
  },
];

// -- Growth (linked child) ---------------------------------------------------

export const growthSummaries: readonly GrowthSummary[] = [
  {
    studentId: "stu-ariaan",
    heightCm: 112,
    weightKg: 19.4,
    lastChecked: "2026-07-15",
    milestones: [
      "Reads three-word sentences independently",
      "Counts reliably to 20",
      "Recognises Bangla letters খ, গ, ঘ",
      "Ties shoelaces with minimal help",
    ],
  },
];

// -- Invoices ----------------------------------------------------------------

export const invoices: readonly Invoice[] = [
  {
    id: "inv-2026-06",
    studentId: "stu-ariaan",
    month: "June 2026",
    item: "Monthly tuition · Honey Bees",
    amountBdt: 8500,
    status: "paid",
    dueDate: "2026-06-10",
    paidOn: "2026-06-08",
  },
  {
    id: "inv-2026-07",
    studentId: "stu-ariaan",
    month: "July 2026",
    item: "Monthly tuition · Honey Bees",
    amountBdt: 8500,
    status: "due",
    dueDate: "2026-07-10",
    paidOn: null,
  },
  {
    id: "inv-2026-07-book",
    studentId: "stu-ariaan",
    month: "July 2026",
    item: "Term book set · Honey Bees",
    amountBdt: 2200,
    status: "paid",
    dueDate: "2026-07-05",
    paidOn: "2026-07-04",
  },
];

// -- Notices / events --------------------------------------------------------

export const notices: readonly Notice[] = [
  {
    id: "n-001",
    date: "2026-07-01",
    title: "Admissions open for the 2026–27 founding session",
    body: "Demo notice · Limited-seat messaging from the approved reference.",
    tag: "Admissions",
  },
  {
    id: "n-002",
    date: "2026-07-15",
    title: "Campus visits available for interested families",
    body: "Demo notice · Please call ahead before visiting.",
    tag: "Event",
  },
  {
    id: "n-003",
    date: "2026-11-01",
    title: "Planned first day of the founding session",
    body: "Demo notice · Dates require confirmation before launch.",
    tag: "Holiday",
  },
  {
    id: "n-004",
    date: "2026-07-28",
    title: "Parent orientation evening",
    body: "Demo notice · All guardians welcome, details shared via SMS.",
    tag: "Reminder",
  },
];

// -- Admissions pipeline -----------------------------------------------------

export const pipeline: readonly PipelineColumn[] = [
  {
    stage: "New inquiry",
    count: 12,
    leads: [
      { name: "Yusuf & Family", classLabel: "Explorer Bees", age: "3y 4m" },
      { name: "Anaya R.", classLabel: "Baby Bees", age: "2y 7m" },
    ],
  },
  {
    stage: "Tour booked",
    count: 7,
    leads: [
      { name: "Tasnim H.", classLabel: "Honey Bees", age: "5y 2m" },
      { name: "Rayan K.", classLabel: "Bumble Bees", age: "4y 6m" },
    ],
  },
  {
    stage: "Assessment",
    count: 4,
    leads: [
      { name: "Mehnaz S.", classLabel: "Explorer Bees", age: "3y 9m" },
    ],
  },
  {
    stage: "Offered",
    count: 3,
    leads: [
      { name: "Ibrahim C.", classLabel: "Honey Bees", age: "5y 8m" },
    ],
  },
  {
    stage: "Enrolled",
    count: 6,
    leads: [
      { name: "Ariaan H.", classLabel: "Honey Bees", age: "5y 4m" },
      { name: "Mahira K.", classLabel: "Explorer Bees", age: "3y 6m" },
    ],
  },
];

// -- Admin metrics -----------------------------------------------------------

export const adminMetrics: readonly AdminMetric[] = [
  {
    id: "enrolled",
    label: "Students enrolled",
    value: "6",
    sub: "Across all four classes",
    tone: "honey",
  },
  {
    id: "attendance",
    label: "Attendance today",
    value: "83%",
    sub: "5 of 6 present · 1 late",
    tone: "leaf",
  },
  {
    id: "inquiries",
    label: "Pending inquiries",
    value: "26",
    sub: "12 new this week",
    tone: "sky",
  },
  {
    id: "feesDue",
    label: "Invoices due",
    value: "৳ 10,700",
    sub: "1 tuition + 1 book set",
    tone: "rose",
  },
];

// -- Demo personas -----------------------------------------------------------

export type Persona = {
  readonly role: Role;
  readonly name: string;
  readonly subtitle: string;
  readonly teacherId?: TeacherId;
  readonly studentId?: StudentId;
};

export const personas: readonly Persona[] = [
  {
    role: "admin",
    name: "Ms. Rumana Akhter",
    subtitle: "School principal · Demo admin persona",
  },
  {
    role: "teacher",
    name: "Ms. Maimuna Rahman",
    subtitle: "Honey Bees teacher · Sample profile",
    teacherId: "maimuna",
  },
  {
    role: "parent",
    name: "Mrs. Tahmina Hossain",
    subtitle: "Guardian of Ariaan · Demo parent persona",
    studentId: linkedChildId,
  },
];

// -- Helpers -----------------------------------------------------------------

export function findClass(id: ClassId): DemoClass {
  const found = classes.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown class: ${id}`);
  return found;
}

export function findTeacher(id: TeacherId): Teacher {
  const found = teachers.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown teacher: ${id}`);
  return found;
}

export function findStudent(id: StudentId): Student {
  const found = students.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown student: ${id}`);
  return found;
}

export function studentsInClass(classId: ClassId): readonly Student[] {
  return students.filter((s) => s.classId === classId);
}

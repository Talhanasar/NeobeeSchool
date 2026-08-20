import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../../page-hero";
import { SectionHeading } from "../../section-heading";
import { photos } from "../../photos";
import { academicsLinks } from "../../site-config";
import {
  Accordion,
  ProgramCard,
  ProgramGrid,
  FeatureTile,
  FeatureTileGrid,
  QuestionsCta,
  ClosingCta,
} from "../../sections";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Our play-based early years programme for ages 2–6 — Baby Bees, Explorer Bees, Bumble Bees and Honey Bees at Neobee Preschool.",
  alternates: { canonical: "/academics" },
};

const classes = [
  {
    name: "Baby Bees",
    age: "Ages 2–3",
    tagline: "Gentle beginnings",
    photo: photos.babyBees,
    body:
      "A first school year built on feeling held. Children settle into small, predictable routines, learn to separate warmly from a parent, and start to trust the room and the people in it.",
    bullets: [
      "Settling in with a trusted grown-up nearby",
      "Naming feelings, colours, body parts, and familiar objects",
      "First turn-taking and small-group play",
      "Sensory trays, stacking, and pouring — purposeful play, no pressure",
    ],
  },
  {
    name: "Explorer Bees",
    age: "Ages 3–4",
    tagline: "Curiosity takes the lead",
    photo: photos.explorerBees,
    body:
      "Language arrives quickly at this age, and we give it room to grow. Children sort, match, and compare, and start to play alongside — and then with — their classmates.",
    bullets: [
      "Bangla and English through song, story, and conversation",
      "Sorting, matching, patterning, and early counting",
      "Sharing space, taking turns, joining group play",
      "Art, sand, water, and outdoor time every day",
    ],
  },
  {
    name: "Bumble Bees",
    age: "Ages 4–5",
    tagline: "Confident foundations",
    photo: photos.bumbleBees,
    body:
      "A confident year for little hands and busy minds. Children hold a pencil properly, sit for short focused tasks, and start reading the world in letters and numbers.",
    bullets: [
      "Early phonics: letter sounds, blending, simple sight words",
      "Numbers to 20, shapes, and patterns",
      "Pre-writing: pencil grip, tracing, and forming letters",
      "Listening at circle time and following a two-step task",
    ],
  },
  {
    name: "Honey Bees",
    age: "Ages 5–6",
    tagline: "Ready for Grade 1",
    photo: photos.honeyBees,
    body:
      "The bridge year. Children read simple words, write their own name and short sentences, and build the independence a big school day expects.",
    bullets: [
      "Reading short picture books and simple sentences",
      "Early writing: names, lists, and short stories",
      "Number sense to 100, simple addition, and measurement",
      "Self-help skills: packing bags, tying shoes, asking for help",
    ],
  },
] as const;

const learningAreas = [
  {
    title: "Early Learning & Play",
    icon: "play" as const,
    body:
      "Purposeful play is how this age learns. Children choose, build, and repeat — and a teacher is right there to notice, name, and stretch.",
  },
  {
    title: "Language & Literacy",
    icon: "language" as const,
    body:
      "Bangla and English live side by side in the room — songs, stories, and chats — so children grow up hearing both as natural parts of the day.",
  },
  {
    title: "Early Mathematics",
    icon: "blocks" as const,
    body:
      "Counting, sorting, patterning, and shape — first through the hands, then on paper. Real objects before worksheets, always.",
  },
  {
    title: "Science & Discovery",
    icon: "leaf" as const,
    body:
      "Plants, weather, water, insects — questions answered by looking closely. Time outside and simple experiments keep curiosity alive.",
  },
  {
    title: "Creative Arts",
    icon: "camera" as const,
    body:
      "Paint, clay, collage, music, and movement. Process over product — every child finishes a piece, no two the same.",
  },
  {
    title: "Practical Life Skills",
    icon: "shield" as const,
    body:
      "Pouring, tidying, washing hands, packing a bag. Small everyday jobs that quietly build independence and confidence.",
  },
  {
    title: "Social & Emotional Learning",
    icon: "heart" as const,
    body:
      "Naming feelings, waiting for a turn, asking a friend to play, finding a grown-up when something is wrong. Taught the way we teach everything here.",
  },
  {
    title: "Physical Development",
    icon: "fire" as const,
    body:
      "Climbing, balancing, threading, cutting, running. Both sides of the body get a turn every day, indoors and in the garden.",
  },
  {
    title: "Qur'an & Islamic Values",
    icon: "moon" as const,
    body:
      "Qur'an recitation and Hifz time sits inside the daily rhythm for families who want it, alongside the dua and nasheed that already belong to the morning.",
  },
];

const howWeTeach = [
  {
    title: "Learning through play",
    preview: "Hands first, worksheets later.",
    body: (
      <p>
        At this age, play is the work. Teachers plan the room, set up
        provocations, and step in to extend what a child is already doing — so
        every block tower, sand tray, and picture book is doing real learning.
     </p>
    ),
  },
  {
    title: "Small class groups",
    preview: "Every child known by name.",
    body: (
      <p>
        Each class keeps numbers small on purpose. Teachers see who needs a
        quiet word, who needs a challenge, and who needs a cuddle — and
        parents hear about it the same day.
     </p>
    ),
  },
  {
    title: "English and Bangla together",
    preview: "Both languages, every day.",
    body: (
      <p>
        Children hear Bangla and English across the day — songs, stories,
        instructions, and chats. By the time they leave Honey Bees, switching
        between the two feels normal, not special.
     </p>
    ),
  },
  {
    title: "Observation instead of testing",
    preview: "Notes in a diary, not a grade.",
    body: (
      <p>
        We do not test pre-schoolers. Instead, teachers watch, jot down
        what they see, and share it with you. Progress shows in what your
        child can do, not in a number.
     </p>
    ),
  },
  {
    title: "A daily parent diary",
    preview: "A short note home, every day.",
    body: (
      <p>
        Each child goes home with a small diary note — what they ate, when
        they slept, what they played with, and any little moments worth
        remembering. No app to log into, no form to fill.
     </p>
    ),
  },
  {
    title: "Getting ready for Grade 1",
    preview: "A calm bridge to big school.",
    body: (
      <p>
        Honey Bees spend their year practising the small things Grade 1
        expects: packing a bag, sitting at a desk for a short task, reading a
        simple book, writing their name. Confident, not rushed.
     </p>
    ),
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning at Neobee"
        title="Academics"
        lead="Learning through play, structured but never rushed — a year that fits your child, not the other way round."
      />

      <section className="section section-tint honeycomb-bg">
        <div className="container">
          <SectionHeading
            eyebrow="Our classes"
            title={
              <>
                Four classes, one <em>joyful journey</em>
              </>
            }
            lead="Every level moves at the pace your child is ready for."
          />
          <ProgramGrid>
            {classes.map((c) => (
              <ProgramCard
                key={c.name}
                name={c.name}
                age={c.age}
                tagline={c.tagline}
                body={c.body}
                bullets={c.bullets}
                photo={c.photo}
              />
            ))}
         </ProgramGrid>
       </div>
     </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Learning areas"
            title={
              <>
                What your child explores across the <em>week</em>
              </>
            }
            lead="Nine areas of learning, woven into a single day — not split into separate subjects."
          />
          <FeatureTileGrid>
            {learningAreas.map((a) => (
              <FeatureTile
                key={a.title}
                title={a.title}
                body={a.body}
                icon={a.icon}
              />
            ))}
         </FeatureTileGrid>
       </div>
     </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading
            eyebrow="How we teach"
            title={
              <>
                A few <em>quiet principles</em>
              </>
            }
            lead="What stays the same in every classroom, every year."
          />
          <Accordion items={howWeTeach} columns={2} defaultOpenIndex={0} />
       </div>
     </section>

      <section className="section honeycomb-bg">
        <div className="container">
          <SectionHeading
            eyebrow="Go deeper"
            title={
              <>
                Three pages families <em>ask for</em>
              </>
            }
            lead="Read the curriculum in detail, see what books and materials your child will use, and check the term dates for the year."
          />
          <FeatureTileGrid>
            {academicsLinks.map((link) => (
              <FeatureTile
                key={link.href}
                title={link.label}
                body={link.description}
              />
            ))}
         </FeatureTileGrid>
          <p style={{ marginTop: "1.5rem" }}>
            The full year sits on the{" "}
            <Link href="/academics/calendar">academic calendar</Link> — term
            dates, breaks, and events in one place.
         </p>
       </div>
     </section>

      <section className="section">
        <div className="container">
          <QuestionsCta
            heading="Not sure which class fits?"
            sub="Call us, or come and see the campus. We will talk through which year feels right for your child."
            primary={{ label: "Contact us", href: "/contact", icon: "arrow" }}
            secondary={{ label: "Apply now", href: "/admissions", icon: "arrow" }}
          />
       </div>
     </section>

      <ClosingCta
        heading="Ready when you are"
        body="Apply for a place, or book a visit and see the classrooms for yourself."
        primary={{ label: "Apply now", href: "/admissions/apply", icon: "arrow" }}
        secondary={{ label: "Book a campus visit", href: "/contact", icon: "arrow" }}
      />
    </>
  );
}

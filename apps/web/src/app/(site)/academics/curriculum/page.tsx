import type { Metadata } from "next";
import { PageHero } from "../../../page-hero";
import { SectionHeading } from "../../../section-heading";
import { PhotoFrame } from "../../../photo";
import { photos } from "../../../photos";
import {
  Accordion,
  SplitSection,
  StepList,
  CheckList,
  CheckListPair,
  QuestionsCta,
  ClosingCta,
} from "../../../sections";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Our play-based, Montessori-inspired early years curriculum — what each bee class covers at Neobee Preschool.",
  alternates: { canonical: "/academics/curriculum" },
};

const classCurriculum = [
  {
    title: "Baby Bees — Ages 2–3",
    preview: "Settling in, naming the world, first routines.",
    body: (
      <>
        <p>
          A gentle first year. Children learn to feel safe in the room,
          separate warmly from a parent, and begin to trust the people and
          the rhythm around them.
    </p>
        <ul className="program-bullets">
          <li>Settling in with a trusted grown-up nearby</li>
          <li>Naming feelings, colours, body parts, and familiar objects</li>
          <li>First turn-taking and small-group play</li>
          <li>Sensory trays, stacking, pouring, and sand</li>
          <li>Short songs, nursery rhymes, and picture books in Bangla and English</li>
       </ul>
     </>
    ),
  },
  {
    title: "Explorer Bees — Ages 3–4",
    preview: "Language arrives, sorting begins, friends appear.",
    body: (
      <>
        <p>
          A curious year. Children play alongside — and then with — their
          classmates, sorting, matching, and chatting their way into the
          wider world.
    </p>
        <ul className="program-bullets">
          <li>Bangla and English through song, story, and conversation</li>
          <li>Sorting, matching, patterning, and early counting</li>
          <li>Sharing space, taking turns, joining group play</li>
          <li>Art, sand, water, and outdoor time every day</li>
          <li>First picture books children can retell on their own</li>
       </ul>
     </>
    ),
  },
  {
    title: "Bumble Bees — Ages 4–5",
    preview: "Pencil in hand, sitting for a task, letters and numbers.",
    body: (
      <>
        <p>
          A confident year. Little hands learn to hold a pencil properly and
          sit for short, focused tasks. Letters and numbers start to mean
          something on paper.
    </p>
        <ul className="program-bullets">
          <li>Early phonics: letter sounds, blending, simple sight words</li>
          <li>Numbers to 20, shapes, and patterns</li>
          <li>Pre-writing: pencil grip, tracing, and forming letters</li>
          <li>Listening at circle time and following a two-step task</li>
          <li>Simple experiments and looking closely at the garden</li>
       </ul>
     </>
    ),
  },
  {
    title: "Honey Bees — Ages 5–6",
    preview: "Reading, writing, and the independence Grade 1 expects.",
    body: (
      <>
        <p>
          A bridge year. Children read simple words, write short sentences,
          and practise the small daily skills that make a big school day feel
          manageable.
    </p>
        <ul className="program-bullets">
          <li>Reading short picture books and simple sentences</li>
          <li>Early writing: names, lists, and short stories</li>
          <li>Number sense to 100, simple addition, and measurement</li>
          <li>Self-help skills: packing bags, tying shoes, asking for help</li>
          <li>Showing what they know at a small end-of-year share</li>
       </ul>
     </>
    ),
  },
];

const learningDay = [
  {
    label: "8:30",
    title: "Warm welcome",
    body:
      "Children arrive, hang up their bag, and choose their first activity. A calm start means the rest of the morning lands well.",
  },
  {
    label: "9:00",
    title: "Circle and dua",
    body:
      "Everyone sits together for the date, the weather, a short dua or nasheed, and a story that links to the day ahead.",
  },
  {
    label: "9:25",
    title: "Purposeful play",
    body:
      "The longest part of the morning. Children choose between literacy, maths, science, art, sand, water, or the garden — and a teacher is always nearby.",
  },
  {
    label: "11:30",
    title: "Home with a diary note",
    body:
      "A short reflection at circle, then home with a small diary note — what they played, what they learned, anything to share.",
  },
];

export default function CurriculumPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Curriculum"
        lead="A play-based early years curriculum, Montessori-inspired, built around what each age is actually ready for."
      />

      <section className="section">
        <div className="container">
          <SplitSection
            eyebrow="Our approach"
            heading="Play first, teacher-guided, no formal testing"
            body={
              <>
                <p>
                  Our curriculum is play-based and Montessori-inspired: the
                  room is set up for children to choose, the materials are
                  real, and a teacher is always close enough to notice, name,
                  and stretch what is happening.
            </p>
                <p>
                  At this age, formal testing tells you very little and
                  worries parents a lot. We do not test pre-schoolers. Instead,
                  teachers watch, jot down what they see, and share it with
                  you.
            </p>
           </>
            }
            media={<PhotoFrame photo={photos.campusClassroom} />}
          />
      </div>
    </section>

      <section className="section section-tint honeycomb-bg">
        <div className="container">
          <SectionHeading
            eyebrow="By class"
            title={
              <>
                What each bee class <em>actually covers</em>
              </>
            }
            lead="A clear picture of the year, age by age."
          />
          <Accordion
            items={classCurriculum}
            columns={1}
            defaultOpenIndex={0}
          />
      </div>
    </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="The learning day"
            title={
              <>
                A short, steady <em>morning rhythm</em>
              </>
            }
            lead="Four moments that hold the day together — for children and for teachers."
          />
          <StepList steps={learningDay} />
      </div>
    </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Tracking progress"
            title={
              <>
                How we watch, and how you <em>hear about it</em>
              </>
            }
            lead="No grades, no fixed report schedule — just clear, steady communication."
          />
          <CheckListPair>
            <CheckList
              heading="What we watch for"
              items={[
                "Observation notes kept by the class teacher",
                "Milestones for each age band — settling, language, and confidence",
                "How a child plays with friends and joins a group",
                "Language growth in Bangla and English",
                "Small wins worth celebrating, written down the same week",
              ]}
            />
            <CheckList
              heading="How you hear about it"
              items={[
                "A short diary note home every day",
                "Informal chats at pickup whenever you want one",
                "A conversation whenever you ask for one — call, WhatsApp, or visit",
                "An end-of-year share where your child shows what they can do",
              ]}
            />
        </CheckListPair>
      </div>
    </section>

      <section className="section">
        <div className="container">
          <QuestionsCta
            heading="Want to see the curriculum in person?"
            sub="Come for a visit. We will walk you through a day and answer anything you would like to ask."
            primary={{ label: "Book a campus visit", href: "/contact", icon: "arrow" }}
            secondary={{ label: "Apply now", href: "/admissions/apply", icon: "arrow" }}
          />
      </div>
    </section>

      <ClosingCta
        heading="Ready when you are"
        body="Read the books and materials list, or jump straight to an application."
        primary={{ label: "Apply now", href: "/admissions/apply", icon: "arrow" }}
        secondary={{ label: "See the academic calendar", href: "/academics/calendar", icon: "arrow" }}
      />
    </>
  );
}

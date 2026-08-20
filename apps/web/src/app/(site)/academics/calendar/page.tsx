import type { Metadata } from "next";
import { PageHero } from "../../../page-hero";
import { SectionHeading } from "../../../section-heading";
import { FeatureTile, FeatureTileGrid, StepList, QuestionsCta, ClosingCta, CheckList } from "../../../sections";

export const metadata: Metadata = {
  title: "Academic Calendar",
  description: "The shape of the school year at Neobee Preschool — the weekly rhythm, sessions, and family events through the year.",
  alternates: { canonical: "/academics/calendar" },
};

const weekMoments = [
  { time: "8:30", title: "Warm welcome", body: "Children settle in with their teachers and friends." },
  { time: "9:00", title: "Circle and dua", body: "Greeting, songs, stories, and the day's dua together." },
  { time: "9:25", title: "Purposeful play", body: "Play-based learning across the four bee classes, with Qur'an recitation and Hifz time for families who want it." },
  { time: "11:30", title: "Home with a diary note", body: "Children head home with a short note about the day." },
] as const;

const yearShape = [
  {
    title: "Opening stretch",
    body: "The session opens and children settle in. New families are welcomed gently and routines begin to form.",
    icon: "calendar" as const,
  },
  {
    title: "Middle of the year",
    body: "Routines are well established. Children take part in regular events and small showcases through the term.",
    icon: "book" as const,
  },
  {
    title: "Closing stretch",
    body: "The Honey Bees begin preparing for Grade 1. Other classes celebrate the year they have shared.",
    icon: "blocks" as const,
  },
  {
    title: "Breaks and holidays",
    body: "Breaks follow national and religious holidays. Exact dates are confirmed with enrolled families each session.",
    icon: "moon" as const,
  },
];

const events = [
  { kind: "Family", title: "Family open day", body: "An afternoon to see the campus, meet the teachers, and ask anything — a relaxed first look for new families." },
  { kind: "Family", title: "Parents' morning", body: "A short morning in class so parents can see how the day runs and talk with the team." },
  { kind: "Showcase", title: "Art and craft showcase", body: "The children's work goes up around the classroom and parents are invited to come and see what they have made." },
  { kind: "Movement", title: "Sports and movement day", body: "A gentle, playful morning of movement, games, and outdoor activity suited to every age." },
  { kind: "Faith", title: "Qur'an recitation morning", body: "A short morning celebrating the children's Qur'an recitation, shared with families." },
  { kind: "Celebration", title: "Eid celebration", body: "A small gathering to mark Eid with the children — clothes, food, and time together." },
];

const howToStay = [
  "The daily diary goes home each day with the key events for the week ahead",
  "Term dates and event invites are shared with families on the WhatsApp group",
  "Call the team any time on +88 013 4744 9472 if you would like to check a date",
];

export default function CalendarPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Academic Calendar"
        lead="Term dates are confirmed with each session and shared with enrolled families via WhatsApp."
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="The school week" title={<>Five days, one <em>gentle rhythm</em></>} lead="Sunday to Thursday, 8:30 to 11:30. Friday and Saturday closed." />
          <FeatureTileGrid>
            <FeatureTile title="Sunday to Thursday" body="Sessions run from 8:30 to 11:30." icon="calendar" />
            <FeatureTile title="Friday and Saturday" body="The campus is closed." icon="moon" />
            <FeatureTile title="Qur'an recitation and Hifz time" body="A scheduled part of the day for families who want it, alongside purposeful play." icon="book" />
          </FeatureTileGrid>

          <div className="event-moments">
            <StepList
              steps={weekMoments.map((m) => ({
                label: m.time,
                title: m.title,
                body: m.body,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section section-tint honeycomb-bg">
        <div className="container">
          <SectionHeading eyebrow="The year" title={<>The shape of the <em>year</em></>} lead="Exact dates are confirmed each session and shared with families in advance." />
          <FeatureTileGrid>
            {yearShape.map((y) => (
              <FeatureTile key={y.title} title={y.title} body={y.body} icon={y.icon} />
            ))}
          </FeatureTileGrid>
          <p className="calendar-note">We do not publish future term dates here. They are confirmed each session and shared with enrolled families through the daily diary and WhatsApp.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Through the year" title={<>What happens <em>through the year</em></>} lead="A handful of moments families can look forward to. Dates are shared in advance." />
          <div className="events-grid">
            {events.map((e) => (
              <article key={e.title} className="event-card">
                <span className="event-label">{e.kind}</span>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading eyebrow="Staying informed" title={<>Where to <em>look</em></>} lead="Dates go out via the daily diary, the WhatsApp family group, and a quick phone call." />
          <CheckList heading="" items={howToStay} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <QuestionsCta
            heading="A question about the year?"
            sub="Give the team a call and they will be happy to help."
            primary={{ label: "+88 013 4744 9472", href: "tel:+8801347449472", icon: "phone" }}
            secondary={{ label: "Contact us", href: "/contact", icon: "arrow" }}
          />
        </div>
      </section>

      <ClosingCta
        heading="Want to apply?"
        body="The team will share the next term dates with you when you apply."
        primary={{ label: "Start your application", href: "/admissions/apply", icon: "arrow" }}
        secondary={{ label: "Contact us", href: "/contact", icon: "mail" }}
      />
    </>
  );
}
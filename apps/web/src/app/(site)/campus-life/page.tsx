import type { Metadata } from "next";
import { PageHero } from "../../page-hero";
import {
  FeatureTile,
  FeatureTileGrid,
  StepList,
  QuestionsCta,
  ClosingCta,
} from "../../sections";
import { SectionHeading } from "../../section-heading";
import { PhotoFrame } from "../../photo";
import { photos } from "../../photos";
import { Icon, type IconName } from "../../icon-component";

export const metadata: Metadata = {
  title: "Campus Life",
  description:
    "Calm, colourful, child-sized spaces designed for curious learners aged two to six in Panchlaish, Chattogram.",
  alternates: { canonical: "/campus-life" },
};

const spaces = [
  {
    photo: photos.campusSoftPlay,
    label: "Indoor soft play",
    desc: "Padded foam shapes and safe climbing give children room to burn energy, even on humid or rainy days.",
    icon: "play" as IconName,
  },
  {
    photo: photos.campusClassroom,
    label: "Child-sized classrooms",
    desc: "Low shelves and tables let children choose activities independently, building confidence and decision-making.",
    icon: "blocks" as IconName,
  },
  {
    photo: photos.campusReading,
    label: "Little readers' corner",
    desc: "A cosy space filled with English and Bangla picture books to nurture a love of reading from an early age.",
    icon: "book" as IconName,
  },
  {
    photo: photos.campusGarden,
    label: "Outdoor garden",
    desc: "Children dig, water plants, and explore nature, building respect for the world around them.",
    icon: "leaf" as IconName,
  },
] as const;

const safetyPoints: readonly [IconName, string][] = [
  ["camera", "CCTV monitored"],
  ["firstAid", "First-aid ready staff"],
  ["shield", "Child protection practice"],
  ["pickup", "Verified guardian pickup"],
];

const dayMoments = [
  {
    time: "8:30",
    title: "Warm welcome",
    body: "Teachers greet every child by name, settling them in with a smiling face and a calm start.",
  },
  {
    time: "9:00",
    title: "Circle & dua",
    body: "Children gather together for songs, stories, and a moment of dua to start the day together.",
  },
  {
    time: "9:25",
    title: "Purposeful play",
    body: "Children choose from carefully prepared activities in the classroom and outdoor areas, guided by their own interests.",
  },
  {
    time: "11:30",
    title: "Home with a diary note",
    body: "The day wraps up with a quick chat and a diary note so parents know the highlights of the day.",
  },
] as const;

export default function CampusLifePage() {
  return (
    <>
      <PageHero
        eyebrow="Campus & care"
        title="Campus Life"
        lead="Calm, colourful, child-sized spaces where the youngest learners feel free to explore."
      />

      <section className="section campus-section">
        <div className="container">
          <SectionHeading
            eyebrow="Our spaces"
            title={
              <>
                Made for small people and <em>big imaginations</em>
              </>
            }
            lead="Every corner of our campus is designed with your child in mind."
            centered
          />
          <div className="campus-mosaic">
            <div className="campus-mosaic-feature">
              <PhotoFrame
                photo={spaces[0].photo}
                sizes="(max-width: 820px) 100vw, 66vw"
              />
            </div>
            {spaces.slice(1).map((s) => (
              <div key={s.label} className="campus-mosaic-item">
                <PhotoFrame
                  photo={s.photo}
                  sizes="(max-width: 820px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
          <FeatureTileGrid>
            {spaces.map((s) => (
              <FeatureTile
                key={s.label}
                title={s.label}
                body={s.desc}
                icon={s.icon}
              />
            ))}
          </FeatureTileGrid>
        </div>
      </section>

      <section className="section rhythm-section">
        <div className="container">
          <SectionHeading
            eyebrow="A day in the life"
            title={
              <>
                A gentle rhythm for <em>busy little hands</em>
              </>
            }
            lead="Short activities, familiar routines, plenty of movement."
            centered
          />
          <StepList
            steps={dayMoments.map((m) => ({
              label: m.time,
              title: m.title,
              body: m.body,
            }))}
          />
        </div>
      </section>

      <section className="section campus-section">
        <div className="container">
          <SectionHeading
            eyebrow="Safety promise"
            title={
              <>
                Care parents can <em>see</em>
              </>
            }
            lead="The everyday practices that keep your child safe on campus."
            centered
          />
          <div className="safety-panel">
            <div>
              <p className="eyebrow light">Every day</p>
              <p>
                Cameras cover our shared spaces, pickup is checked against your
                named guardians, and staff follow our child protection
                practice.
              </p>
            </div>
            <ul>
              {safetyPoints.map(([icon, text]) => (
                <li key={text}>
                  <span className="icon-tile">
                    <Icon name={icon} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="container">
        <QuestionsCta
          heading="Any questions?"
          sub="Come visit our campus or call us to learn how your child can join the hive."
          primary={{ label: "Contact Us", href: "/contact", icon: "arrow" }}
          secondary={{ label: "See Admissions", href: "/admissions" }}
        />
      </div>

      <ClosingCta
        heading="Ready to join the hive?"
        body="Give your child a warm, nurturing start at Neobee."
        primary={{
          label: "Apply Now",
          href: "/admissions/apply",
          icon: "arrow",
        }}
        secondary={{ label: "Book a Campus Visit", href: "/contact" }}
      />
    </>
  );
}
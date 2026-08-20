import type { Metadata } from "next";
import { PageHero } from "../../page-hero";
import {
  Accordion,
  SplitSection,
  FeatureTile,
  FeatureTileGrid,
  QuestionsCta,
  ClosingCta,
} from "../../sections";
import { SectionHeading } from "../../section-heading";
import { PhotoFrame } from "../../photo";
import { photos } from "../../photos";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A warm, play-based preschool in Panchlaish where children aged two to six learn through play in small groups.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="About Neobee"
        lead="A warm, play-based preschool in Panchlaish where children aged two to six learn through play in small groups."
      />

      <section className="section">
        <div className="container">
          <SplitSection
            eyebrow="Our Mission"
            heading="Learning through play"
            body={
              <p>
                Our mission is to provide a calm, safe, and stimulating
                environment where children can learn and grow at their own pace.
                We believe that play is the most important work of early
                childhood, and we foster a love of learning by encouraging
                curiosity and exploration. We see families as partners in this
                journey.
              </p>
            }
            media={<PhotoFrame photo={photos.dayCircle} priority={true} />}
          />
          <SplitSection
            eyebrow="Our Vision"
            heading="Ready for the next step"
            body={
              <p>
                Our vision is for every child to leave Neobee as a curious,
                kind, and confident learner, fully prepared for the adventures
                of Grade 1 and beyond.
              </p>
            }
            media={<PhotoFrame photo={photos.campusClassroom} />}
            flip
          />
        </div>
      </section>

      <section className="section section-tint honeycomb-bg">
        <div className="container">
          <SectionHeading
            eyebrow="Features and benefits"
            title={
              <>
                Designed for your <em>child’s success</em>
              </>
            }
            lead="Our approach combines proven early-years methods with a focus on individual needs."
            centered
          />
          <Accordion
            columns={2}
            defaultOpenIndex={0}
            items={[
              {
                title: "Play-based, Montessori-inspired",
                preview: "Learning through hands-on discovery",
                body: "We use a play-based approach with Montessori-inspired materials. This means your child learns by doing, exploring concepts through activities that feel like fun.",
              },
              {
                title: "Teachers who know your child",
                preview: "Patient, attentive, here for every child",
                body: "Our teachers take time to know each child by name, settling them in patiently and letting each child move at their own pace. They pay close attention to how a child is feeling and shape the day around them.",
              },
              {
                title: "Qur'an recitation and Hifz time",
                preview: "Integrated Islamic learning",
                body: "For families who wish, we offer dedicated time for Qur'an recitation and Hifz practice. This is a gentle, scheduled part of our daily rhythm.",
              },
              {
                title: "Islamic values and everyday adab",
                preview: "Building character and kindness",
                body: "We gently introduce core Islamic values and adab (etiquette) into daily interactions. This helps children develop a strong moral compass and respect for others.",
              },
              {
                title: "Daily parent diary",
                preview: "Stay connected to your child's day",
                body: "You will receive a daily diary note about your child’s activities, mood, and play. This keeps you connected and helps us work together to support their growth.",
              },
              {
                title: "Getting ready for Grade 1",
                preview: "A smooth transition to primary school",
                body: "Our curriculum is designed to build the social, emotional, and academic skills needed for a confident start to Grade 1. Children leave Neobee prepared and excited for the next stage.",
              },
            ]}
          />
       </div>
     </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our core values"
            title={
              <>
                The heart of <em>our hive</em>
              </>
            }
            lead="These six principles guide everything we do, from our curriculum to our classroom culture."
            centered
          />
          <Accordion
            columns={2}
            items={[
              {
                title: "Curiosity",
                body: "We encourage children to ask questions, explore ideas, and discover the world around them.",
              },
              {
                title: "Kindness",
                body: "We teach empathy, compassion, and respect for others, creating a caring community.",
              },
              {
                title: "Confidence",
                body: "We help children believe in themselves and their abilities, empowering them to take on new challenges.",
              },
              {
                title: "Character",
                body: "We nurture honesty, responsibility, and integrity as the foundation for a meaningful life.",
              },
              {
                title: "Partnership",
                body: "We build strong relationships with families, working together to support each child’s development.",
              },
              {
                title: "Well-being",
                body: "We prioritise a safe, healthy, and emotionally supportive environment for every child.",
              },
            ]}
          />
       </div>
     </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Why families choose Neobee"
            title={
              <>
                A place to <em>belong and thrive</em>
              </>
            }
            lead="Parents tell us these are some of the reasons they feel at home with us."
            centered
          />
          <FeatureTileGrid>
            <FeatureTile
              icon="blocks"
              title="Small class groups"
              body="Groups stay small, so every child is known and noticed, and gets time with a teacher when they need it."
            />
            <FeatureTile
              icon="play"
              title="Child-sized campus"
              body="Our campus is designed for little learners, including a dedicated indoor soft play area for safe, active fun."
            />
            <FeatureTile
              icon="language"
              title="English and Bangla"
              body="We use both English and Bangla naturally through the day, in lessons and in play."
            />
            <FeatureTile
              icon="moon"
              title="Qur'an recitation and Hifz time"
              body="A dedicated part of our daily rhythm for families who want their children to grow their connection to the Qur'an."
            />
            <FeatureTile
              icon="book"
              title="The daily parent diary"
              body="Stay closely connected with your child’s day-to-day progress, activities, and well-being through our detailed diary notes."
            />
            <FeatureTile
              icon="shield"
              title="Safety you can see"
              body="Our commitment to safety is clear in our practices, from verified pickups to first-aid ready staff."
            />
          </FeatureTileGrid>
        </div>
      </section>

      <div className="container">
        <QuestionsCta
          heading="Any questions?"
          sub="We're here to help. Call or visit us to learn more about our preschool."
          primary={{ label: "Contact Us", href: "/contact", icon: "arrow" }}
          secondary={{ label: "See Admissions", href: "/admissions" }}
        />
      </div>

      <ClosingCta
        heading="Ready to join the hive?"
        body="Choose Neobee for a warm, nurturing, and joyful start to your child’s learning adventure."
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
import type { Metadata } from "next";
import { PageHero } from "../../../page-hero";
import { ApplicationForm } from "./application-form";
import { StepList, QuestionsCta } from "../../../sections";
import { SectionHeading } from "../../../section-heading";

export const metadata: Metadata = {
  title: "Apply Now",
  description: "Apply to Neobee Preschool — share your child's details and the team will confirm the class by age.",
  alternates: { canonical: "/admissions/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Apply to Neobee"
        lead="A short form — the team will confirm the class and walk you through the rest."
      />

      <section className="section">
        <div className="container">
          <p style={{ maxWidth: "60ch", color: "var(--hive-soft)", fontSize: "var(--text-base)", lineHeight: 1.6, margin: "0 0 var(--space-7)" }}>
            This form asks for your child&apos;s details and a parent or guardian&apos;s contact — roughly five minutes.
            You can also apply by phone:{" "}
            <a href="tel:+8801347449472" style={{ color: "var(--honey-deep)", fontWeight: 800 }}>+88 013 4744 9472</a>.
          </p>
          <ApplicationForm />
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading eyebrow="Next" title={<>What happens <em>after</em> you apply</>} lead="Three honest steps — no guesswork." />
          <StepList
            steps={[
              {
                title: "Call or WhatsApp to confirm",
                body: "After submitting, phone or WhatsApp +88 013 4744 9472 so the team knows your application has come through.",
              },
              {
                title: "The team checks the class by age",
                body: "Your child's class is confirmed by their age. The team will let you know which level and answer any questions.",
              },
              {
                title: "A welcome day is arranged",
                body: "You will be invited in for a welcome visit so your child can settle in gently with you nearby.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <QuestionsCta
            heading="Need help?"
            sub="Call or WhatsApp — the team is happy to talk you through it."
            primary={{ label: "+88 013 4744 9472", href: "tel:+8801347449472", icon: "phone" }}
            secondary={{ label: "Contact us", href: "/contact", icon: "arrow" }}
          />
        </div>
      </section>
    </>
  );
}
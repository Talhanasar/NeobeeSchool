import type { Metadata } from "next";
import { PageHero } from "../../page-hero";
import { SectionHeading } from "../../section-heading";
import { QuestionsCta, ClosingCta, StepList, CheckList, CheckListPair, Accordion } from "../../sections";
import { school } from "../../site-config";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Joining Neobee Preschool is simple. Find class ages, the application steps, what to bring, and answers to common questions.",
  alternates: { canonical: "/admissions" },
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Admissions"
        lead="Joining the hive is simple and the team will walk you through it."
      />

      <section className="section">
        <div className="container">
          <div className="admissions-status">
            <span className="status-pill"><span />{school.admissions.statusLabel}</span>
            <h3>{school.admissions.headline}</h3>
            <p>{school.admissions.lead}</p>
            <a className="button button-primary" href="/admissions/apply">{school.admissions.ctaLabel.replace("inquiry", "application")}<span aria-hidden="true"> →</span></a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Classes" title={<>Four classes, by <em>age</em></>} lead="Every child joins the level that matches their age and stage." />
          <div className="age-guide" aria-label="Class by age">
            <span className="age-guide-item"><strong>Ages 2–3</strong><span>Baby Bees</span></span>
            <span className="age-guide-item"><strong>Ages 3–4</strong><span>Explorer Bees</span></span>
            <span className="age-guide-item"><strong>Ages 4–5</strong><span>Bumble Bees</span></span>
            <span className="age-guide-item"><strong>Ages 5–6</strong><span>Honey Bees</span></span>
          </div>
        </div>
      </section>

      <section className="section section-tint honeycomb-bg">
        <div className="container">
          <SectionHeading eyebrow="How to apply" title={<><em>Four</em> steps</>} lead="The team is here to make every step easy." />
          <StepList
            steps={[
              {
                title: "Talk or visit",
                body: "Give us a call or come and see the campus. A quick conversation is the best way to start.",
              },
              {
                title: "Share your child's details",
                body: "We will ask for your child's name, age, and a few basics so we can prepare for your visit.",
              },
              {
                title: "Confirm the class and documents",
                body: "The team confirms the right class by age and lets you know which documents to bring.",
              },
              {
                title: "Welcome day and settling in",
                body: "You will be invited in for a welcome day so your child can meet the teachers and explore the space with you.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="What to bring" title={<>Ready for <em>day one</em></>} lead="A short checklist so nothing catches you by surprise." />
          <CheckListPair>
            <CheckList
              heading="Documents"
              items={[
                "Your child's birth certificate",
                "A parent or guardian NID",
                "Recent passport-size photographs",
                "Previous school records, if your child has attended one",
              ]}
            />
            <CheckList
              heading="Good to know"
              items={[
                "Bring your child along if you can — it helps everyone feel at home",
                "Call before visiting so the team can set aside time for you",
                "Ask about anything, big or small",
                "The class is confirmed by age, not by a test",
              ]}
            />
          </CheckListPair>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading eyebrow="Frequently asked" title={<>What families <em>ask</em></>} lead="Straight answers to the most common questions." />
          <Accordion
            columns={2}
            defaultOpenIndex={0}
            items={[
              {
                title: "When can my child start?",
                preview: "There is no fixed intake — enrolments are open throughout the session.",
                body: "Enrolments are open throughout the session. Call or visit and the team will let you know about current availability in the right class.",
              },
              {
                title: "Which class will my child be in?",
                preview: "The right class is confirmed by age.",
                body: "The team confirms the class by your child's age on the day they join. If you are close to a boundary, a short conversation helps everyone decide together.",
              },
              {
                title: "What are the school hours?",
                preview: "Sunday to Thursday, 8:30 to 11:30.",
                body: "Sessions run Sunday to Thursday, 8:30 to 11:30. The campus is closed on Friday and Saturday.",
              },
              {
                title: "Is there an entrance test?",
                preview: "No — it is a conversation, then the class is confirmed by age.",
                body: "There is no entrance test or assessment. A casual visit and a conversation are all that is needed. Once you have spoken with the team, the class is confirmed by your child's age.",
              },
              {
                title: "What if my child has never been to school before?",
                preview: "That is perfectly fine — many children start here as their first experience.",
                body: "Many children join as their very first school experience. The team supports each family through the settling-in weeks so the transition feels gentle for your child and for you.",
              },
              {
                title: "Can we visit before applying?",
                preview: "Yes — visits are welcome at any time.",
                body: "Yes, absolutely. Call ahead so the team can set aside time to show you around and answer your questions in person.",
              },
              {
                title: "What are the fees?",
                preview: "Fees are discussed directly with each family.",
                body: "Fees are discussed directly with each family. Call or WhatsApp the team on +88 013 4744 9472 and they will walk you through the details.",
              },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <QuestionsCta
            heading="Questions?"
            sub="Call or WhatsApp the team — they are happy to help."
            primary={{ label: "+88 013 4744 9472", href: "tel:+8801347449472", icon: "phone" }}
            secondary={{ label: "Contact us", href: "/contact", icon: "arrow" }}
          />
        </div>
      </section>

      <ClosingCta
        heading="Ready to join the hive?"
        body="Start your application today — the team will be with you at every step."
        primary={{ label: "Start your application", href: "/admissions/apply", icon: "arrow" }}
        secondary={{ label: "Contact us", href: "/contact", icon: "mail" }}
      />
    </>
  );
}
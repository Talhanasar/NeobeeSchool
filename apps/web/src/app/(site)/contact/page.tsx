import type { Metadata } from "next";
import { PageHero } from "../../page-hero";
import { QuestionsCta } from "../../sections";
import { SectionHeading, ContactItem } from "../../section-heading";
import { Icon } from "../../icon-component";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit, call or email Neobee Preschool in Panchlaish, Chattogram. Open Sunday to Thursday, call ahead.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come say hello"
        lead="Book ahead so we can welcome your family properly."
      />

      <section className="section">
        <div className="container contact-layout">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title={
                <>
                  Ways to <em>reach us</em>
                </>
              }
              lead="Reach us in whatever way is easiest for your family."
            />
            <div className="contact-list">
              <ContactItem icon="location" title="Preschool campus">
                <p>
                  Panchlaish R/A, opposite Halda Officers Apartment,
                  <br />
                  Panchlaish, Chattogram, Bangladesh
                </p>
              </ContactItem>
              <ContactItem icon="phone" title="Phone / WhatsApp">
                <a href="tel:+8801347449472">+88 013 4744 9472</a>
                <p>Quick answers and to arrange a visit.</p>
              </ContactItem>
              <ContactItem icon="mail" title="Email">
                <a href="mailto:neobeepreschool@gmail.com">
                  neobeepreschool@gmail.com
                </a>
                <p>Best for documents and detailed enquiries.</p>
              </ContactItem>
              <ContactItem icon="clock" title="Visit hours">
                <p>
                  Sunday–Thursday · Call ahead
                  <br />
                  Friday &amp; Saturday · Closed
                </p>
              </ContactItem>
            </div>
            <p>
              Please give us a quick call before visiting so a member of our
              team is free to show you around the campus and answer your
              questions in person.
            </p>
          </div>
          <div className="map-card" aria-label="Campus location summary">
            <div className="map-pattern" aria-hidden="true">
              <span className="map-pin">
                <Icon name="location" />
              </span>
              <i className="road road-one" />
              <i className="road road-two" />
              <i className="road road-three" />
            </div>
            <div>
              <p className="eyebrow">Panchlaish, Chattogram</p>
              <h3>Find the hive</h3>
              <p>
                Opposite Halda Officers Apartment in Panchlaish Residential
                Area.
              </p>
              <a
                className="text-link"
                href="https://www.google.com/maps/search/?api=1&query=Panchlaish%20Residential%20Area%20Chattogram"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <QuestionsCta
          heading="Any questions?"
          sub="Reach out and we'll be happy to help your family get started."
          primary={{
            label: "Apply Now",
            href: "/admissions/apply",
            icon: "arrow",
          }}
          secondary={{ label: "Call Us", href: "tel:+8801347449472" }}
        />
      </div>
    </>
  );
}

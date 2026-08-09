import type { ReactNode } from "react";
import { InquiryForm } from "./inquiry-form";
import { BeeIcon, SiteHeader } from "./site-header";
import Hero from "./hero";
import { PhotoFrame } from "./photo";
import { photos } from "./photos";

type IconName =
  | "book"
  | "heart"
  | "leaf"
  | "blocks"
  | "language"
  | "moon"
  | "calendar"
  | "play"
  | "shield"
  | "camera"
  | "firstAid"
  | "fire"
  | "pickup"
  | "pin"
  | "phone"
  | "mail"
  | "location"
  | "clock"
  | "arrow"
  | "check";

const classes = [
  { name: "Baby Bees", age: "Ages 2–3", tagline: "Gentle beginnings", photo: photos.babyBees },
  { name: "Explorer Bees", age: "Ages 3–4", tagline: "Curiosity takes the lead", photo: photos.explorerBees },
  { name: "Bumble Bees", age: "Ages 4–5", tagline: "Confident foundations", photo: photos.bumbleBees },
  { name: "Honey Bees", age: "Ages 5–6", tagline: "Ready for Grade 1", photo: photos.honeyBees },
] as const;

const day = [
  { time: "8:30", title: "Warm welcome", photo: photos.dayWelcome },
  { time: "9:00", title: "Circle & dua", photo: photos.dayCircle },
  { time: "9:25", title: "Purposeful play", photo: photos.dayPlay },
  { time: "11:30", title: "Home with a diary note", photo: photos.dayHome },
] as const;

const safety = [
  ["camera", "CCTV monitored"],
  ["firstAid", "First-aid ready staff"],
  ["shield", "Child protection practice"],
  ["pickup", "Verified guardian pickup"],
] as const satisfies readonly (readonly [IconName, string])[];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />

      <main id="main-content">
        <h1 className="sr-only">
          Neobee Preschool — play-based early years in Panchlaish, Chattogram
        </h1>
        <Hero />

        <div className="feature-strip" aria-label="Why families choose Neobee">
          <div className="container feature-strip-inner">
            {["Ages 2–6", "Small class groups", "Sun–Thu, 8:30–11:30", "Panchlaish, Chattogram"].map((item) => (
              <span key={item}><i aria-hidden="true" />{item}</span>
            ))}
          </div>
        </div>

        <section className="section section-tint honeycomb-bg" id="classes">
          <div className="container">
            <SectionHeading eyebrow="Our classes" title={<>Four classes, one <em>joyful journey</em></>} lead="Every level moves at the pace your child is ready for." />
            <div className="class-photo-grid">
              {classes.map((c) => (
                <article className="class-photo-card" key={c.name}>
                  <PhotoFrame photo={c.photo} sizes="(max-width: 820px) 100vw, 25vw" />
                  <h3>{c.name}</h3>
                  <p>{c.age}</p>
                  <p>{c.tagline}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section rhythm-section" id="day">
          <div className="container">
            <SectionHeading eyebrow="A day at Neobee" title={<>A gentle rhythm for <em>busy little hands</em></>} lead="Short activities, familiar routines, plenty of movement." />
            <div className="day-grid">
              {day.map((d) => (
                <article className="day-card" key={d.title}>
                  <PhotoFrame photo={d.photo} sizes="(max-width: 820px) 50vw, 25vw" />
                  <time>{d.time}</time>
                  <h3>{d.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section campus-section" id="campus">
          <div className="container">
            <SectionHeading eyebrow="Campus & care" title={<>Made for small people and <em>big imaginations</em></>} lead="Calm, colourful, child-sized spaces." />
            <div className="campus-mosaic">
              <div className="campus-mosaic-feature">
                <PhotoFrame photo={photos.campusSoftPlay} sizes="(max-width: 820px) 100vw, 66vw" />
                <span className="campus-mosaic-label">Indoor soft play</span>
              </div>
              <div className="campus-mosaic-item">
                <PhotoFrame photo={photos.campusClassroom} sizes="(max-width: 820px) 50vw, 33vw" />
                <span className="campus-mosaic-label">Child-sized classrooms</span>
              </div>
              <div className="campus-mosaic-item">
                <PhotoFrame photo={photos.campusReading} sizes="(max-width: 820px) 50vw, 33vw" />
                <span className="campus-mosaic-label">Little readers’ corner</span>
              </div>
              <div className="campus-mosaic-item">
                <PhotoFrame photo={photos.campusGarden} sizes="(max-width: 820px) 50vw, 33vw" />
                <span className="campus-mosaic-label">Outdoor garden</span>
              </div>
            </div>
            <div className="safety-panel">
              <div>
                <p className="eyebrow light">Safety promise</p>
                <h3>Care parents can see</h3>
              </div>
              <ul>
                {safety.map(([icon, text]) => (
                  <li key={text}>
                    <span className="icon-tile"><Icon name={icon} /></span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section admissions-section honeycomb-bg" id="admissions">
          <div className="container">
            <SectionHeading eyebrow="Admissions" title={<>Joining the hive is <em>simple</em></>} lead="Three friendly steps." />
            <ol className="admission-steps">
              <li><span>1</span><h3>Talk or visit</h3><p>Call us, or come and see the campus.</p></li>
              <li><span>2</span><h3>Share details</h3><p>We confirm your child’s class by age.</p></li>
              <li><span>3</span><h3>Welcome day</h3><p>Schedules, documents, and settling-in support.</p></li>
            </ol>
            <div className="inquiry-layout" id="inquiry">
              <aside className="inquiry-copy">
                <p className="eyebrow">Let’s talk</p>
                <h2>Start with a simple inquiry</h2>
                <p>Tell us about your child and we will call you back.</p>
                <div className="contact-mini">
                  <span><Icon name="phone" /></span>
                  <div>
                    <small>Prefer to call?</small>
                    <a href="tel:+8801347449472">+88 013 4744 9472</a>
                  </div>
                </div>
              </aside>
              <InquiryForm />
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-layout">
            <div>
              <SectionHeading eyebrow="Contact" title={<>Come say <em>hello</em></>} lead="Book ahead so we can welcome your family." />
              <div className="contact-list">
                <ContactItem icon="location" title="Preschool campus">
                  <p>Panchlaish R/A, opposite Halda Officers Apartment,<br />Panchlaish, Chattogram, Bangladesh</p>
                </ContactItem>
                <ContactItem icon="phone" title="Phone / WhatsApp">
                  <a href="tel:+8801347449472">+88 013 4744 9472</a>
                </ContactItem>
                <ContactItem icon="mail" title="Email">
                  <a href="mailto:neobeepreschool@gmail.com">neobeepreschool@gmail.com</a>
                </ContactItem>
                <ContactItem icon="clock" title="Visit hours">
                  <p>Sunday–Thursday · Call ahead<br />Friday & Saturday · Closed</p>
                </ContactItem>
              </div>
            </div>
            <div className="map-card" aria-label="Campus location summary">
              <div className="map-pattern" aria-hidden="true">
                <span className="map-pin"><Icon name="location" /></span>
                <i className="road road-one" />
                <i className="road road-two" />
                <i className="road road-three" />
              </div>
              <div>
                <p className="eyebrow">Panchlaish, Chattogram</p>
                <h3>Find the hive</h3>
                <p>Opposite Halda Officers Apartment in Panchlaish Residential Area.</p>
                <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Panchlaish%20Residential%20Area%20Chattogram" target="_blank" rel="noreferrer">Open in Google Maps <Icon name="arrow" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand brand-inverse" href="#main-content">
              <span className="brand-mark" aria-hidden="true"><BeeIcon /></span>
              <span className="brand-copy"><strong>Neobee Preschool</strong><small>part of Neobee International School</small></span>
            </a>
            <p>Play-based early learning for ages 2–6 in Panchlaish, Chattogram.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <a href="#classes">Classes</a>
            <a href="#day">A day here</a>
            <a href="#campus">Campus</a>
            <a href="#admissions">Admissions</a>
          </div>
          <div>
            <h2>Families</h2>
            <a href="#admissions">Admissions</a>
            <a href="#inquiry">Inquiry</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h2>Contact</h2>
            <a href="tel:+8801347449472">+88 013 4744 9472</a>
            <a href="mailto:neobeepreschool@gmail.com">neobeepreschool@gmail.com</a>
            <p>Panchlaish R/A<br />Chattogram, Bangladesh</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2026 Neobee International School</p>
          <a href="#main-content">Back to top <Icon name="arrow" /></a>
        </div>
      </footer>

      <a className="floating-cta" href="#contact" aria-label="Contact the school">
        <Icon name="phone" />
        <span>Contact</span>
      </a>
    </>
  );
}

function SectionHeading({ eyebrow, title, lead, centered = false }: Readonly<{ eyebrow: string; title: ReactNode; lead: string; centered?: boolean }>) {
  return (
    <div className={`section-heading${centered ? " centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{lead}</p>
    </div>
  );
}

function ContactItem({ icon, title, children }: Readonly<{ icon: IconName; title: string; children: ReactNode }>) {
  return (
    <div className="contact-item">
      <span className="hex-icon"><Icon name={icon} /></span>
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

function Icon({ name }: Readonly<{ name: IconName }>) {
  const paths: Record<IconName, ReactNode> = {
    book: <><path d="M4 5.5c3.2-.8 5.8-.2 8 1.7v12.3c-2.2-1.9-4.8-2.5-8-1.7V5.5Zm16 0c-3.2-.8-5.8-.2-8 1.7v12.3c2.2-1.9 4.8-2.5 8-1.7V5.5Z" /></>,
    heart: <path d="M12 20S4 15.7 4 9.5C4 5 9.5 3.3 12 7c2.5-3.7 8-2 8 2.5C20 15.7 12 20 12 20Z" />,
    leaf: <><path d="M19.5 4.5C11 4.5 5.5 8.4 5.5 14.2c0 3.1 2.4 5.3 5.4 5.3 6.1 0 8.6-6.1 8.6-15Z" /><path d="M5 20c2.2-5.2 5.8-8.4 11-10.2" /></>,
    blocks: <><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /><path d="m12 3 5 8H7l5-8Z" /></>,
    language: <><path d="M4 5h10M9 5c0 6-2 9-5 11m4-7c1 3 3 5 6 7m2-5 4 9m0-9-4 9m1.2-3h5.6" /></>,
    moon: <path d="M19.5 15.5A8 8 0 0 1 8.5 4.4 8 8 0 1 0 19.5 15.5Z" />,
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M8 3v4m8-4v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01" /></>,
    play: <><path d="M5 16c0-5 2.5-8 7-8s7 3 7 8" /><path d="M7 16v2m10-2v2M9 8l-1-4m7 4 1-4M8 13h8M12 13v7" /></>,
    shield: <path d="M12 3 20 6v5c0 5.2-3.4 8.5-8 10-4.6-1.5-8-4.8-8-10V6l8-3Zm-3 9 2 2 4-5" />,
    camera: <><rect x="3" y="7" width="18" height="12" rx="2" /><circle cx="12" cy="13" r="3.5" /><path d="m8 7 1-3h6l1 3" /></>,
    firstAid: <><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M9 6V4h6v2m-3 4v6m-3-3h6" /></>,
    fire: <path d="M13 3c1 5-4 5-2 9 1-2 3-2 4-4 3 3 4 7 2 10-2.5 3.8-9.5 3.2-11-1.4C4.8 13 7 10 9 8c0 3 1 3 1 3s-1-5 3-8Z" />,
    pickup: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3.5 20c.5-4.2 2.3-6 5.5-6s5 1.8 5.5 6m0-5c3-.2 4.8 1.5 5 5" /></>,
    pin: <><path d="M9 4h6l-.8 5 3.3 3H6.5l3.3-3L9 4Z" /><path d="M12 12v9" /></>,
    phone: <path d="M7 3 4 5c0 8.3 6.7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2-3-5Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    location: <><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <><path d="M5 12h14m-5-5 5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

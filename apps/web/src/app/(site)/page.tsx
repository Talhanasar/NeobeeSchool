import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "../inquiry-form";
import { Icon } from "../icon-component";
import type { IconName } from "../icon-component";
import { SectionHeading, ContactItem } from "../section-heading";
import { RevealGrid, RevealItem } from "../reveal";
import Hero from "../hero";
import { PhotoFrame } from "../photo";
import { photos } from "../photos";
import { school } from "../site-config";

const academics = [
  { title: "Play & Discovery", art: "/illustrations/play-discovery.svg", width: 127, height: 101, body: "Purposeful play is how this age learns. Children choose, build, and repeat — and a teacher is right there to notice, name, and stretch.", href: "/academics" },
  { title: "Science & Curiosity", art: "/illustrations/science-curiosity.svg", width: 93, height: 112, body: "Plants, weather, water, insects — questions answered by looking closely. Time outside and simple experiments keep curiosity alive.", href: "/academics" },
  { title: "Move & Grow", art: "/illustrations/move-grow.svg", width: 99, height: 102, body: "Climbing, balancing, threading, cutting, running. Both sides of the body get a turn every day, indoors and in the garden.", href: "/academics" },
  { title: "Qur’an & Hifz", art: "/illustrations/quran-hifz.svg", width: 91, height: 71, body: "Qur'an recitation and Hifz time sits inside the daily rhythm, alongside the dua and nasheed that already belong to the morning.", href: "/academics/curriculum" },
] as const;

const news = [
  { label: "Neobee is now in", title: "Panchlaish", art: "/illustrations/news-panchlaish.svg", width: 127, height: 128, badge: null, body: "Enrol your child at our Panchlaish campus, opposite Halda Officers Apartment.", href: "/contact" },
  { label: "Offer for new students", title: "25% waiver", art: null, width: 91, height: 71, badge: "25%", body: "A special rate on the enrolment fee for the 2026–27 founding session.", href: "/admissions" },
  { label: "Our journey", title: "Newsletter", art: "/illustrations/news-newsletter.svg", width: 120, height: 112, badge: null, body: "Get to know the latest updates from Neobee.", href: "/contact" },
  { label: "Pay less, get more", title: "Bundle offer", art: "/illustrations/news-bundle.svg", width: 111, height: 97, badge: null, body: "Enrol for school and receive an offer on the soft-play zone.", href: "/admissions" },
] as const;


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

      <section className="section academics-section" id="academics">
        <div className="container">
          <SectionHeading centered eyebrow="Our academics" title={<>What your child <em>learns with us</em></>} lead="Nine areas of learning, woven into one gentle day — not split into separate subjects." />
          <RevealGrid className="academics-grid">
            {academics.map((a) => (
              <RevealItem key={a.title}>
                <Link className="academics-card" href={a.href}>
                  <span className="academics-card-art" aria-hidden="true"><Image src={a.art} alt="" aria-hidden="true" width={a.width} height={a.height} unoptimized /></span>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                  <span className="academics-card-more">Explore <Icon name="arrow" /></span>
                </Link>
              </RevealItem>
            ))}
          </RevealGrid>
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

      <section className="section news-section" id="news">
        <div className="container">
          <SectionHeading centered eyebrow="What’s new" title={<>News and <em>offers for families</em></>} lead="Stay informed on new updates and special offers at Neobee." />
          <RevealGrid className="news-grid">
            {news.map((n) => (
              <RevealItem key={n.title}>
                <article className="news-card">
                  {n.art ? (
                    <span className="news-card-art" aria-hidden="true"><Image src={n.art} alt="" aria-hidden="true" width={n.width} height={n.height} unoptimized /></span>
                  ) : (
                    <span className="news-card-art news-card-art-badge" aria-hidden="true"><strong>{n.badge}</strong></span>
                  )}
                  <p className="news-card-label">{n.label}</p>
                  <h3>{n.title}</h3>
                  <p>{n.body}</p>
                  <Link className="text-link" href={n.href}>Learn more <Icon name="arrow" /></Link>
                </article>
              </RevealItem>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="section admissions-section honeycomb-bg" id="admissions">
        <div className="container">
          <SectionHeading eyebrow="Admissions" title={<>Joining the hive is <em>simple</em></>} lead="Three friendly steps." />
          <div className="admissions-status">
            <span className="status-pill"><span />{school.admissions.statusLabel}</span>
            <h3>{school.admissions.headline}</h3>
            <p>{school.admissions.lead}</p>
            <a className="button button-primary" href="#inquiry">{school.admissions.ctaLabel} <Icon name="arrow" /></a>
          </div>
          <div className="age-guide" aria-label="Class by age">
            {classes.map((c) => (
              <span key={c.name} className="age-guide-item">
                <strong>{c.age}</strong>
                <span>{c.name}</span>
              </span>
            ))}
          </div>
          <ol className="admission-steps">
            <li><span>1</span><h3>Talk or visit</h3><p>Call us, or come and see the campus.</p></li>
            <li><span>2</span><h3>Share details</h3><p>We confirm your child’s class by age.</p></li>
            <li><span>3</span><h3>Welcome day</h3><p>Schedules, documents, and settling-in support.</p></li>
          </ol>
          <div className="inquiry-layout" id="inquiry">
            <aside className="inquiry-copy">
              <p className="eyebrow light">Let’s talk</p>
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
    </>
  );
}

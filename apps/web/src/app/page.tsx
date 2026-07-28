import type { ReactNode } from "react";
import { InquiryForm } from "./inquiry-form";
import { BeeIcon, SiteHeader } from "./site-header";
import Hero from "./hero";

type IconName = "book" | "heart" | "leaf" | "blocks" | "language" | "moon" | "calendar" | "play" | "shield" | "camera" | "firstAid" | "fire" | "pickup" | "pin" | "phone" | "mail" | "location" | "clock" | "arrow" | "check";

type ClassItem = {
  name: string;
  age: string;
  tagline: string;
  description: string;
  skills: readonly string[];
  color: "gold" | "green" | "blue" | "rose";
};

const classes: readonly ClassItem[] = [
  { name: "Baby Bees", age: "Ages 2–3", tagline: "Gentle beginnings", description: "Nurturing routines, sensory discovery, language-rich play, and patient settling-in support.", skills: ["Sensory play", "Songs & rhymes", "Colors & shapes", "Daily dua"], color: "gold" },
  { name: "Explorer Bees", age: "Ages 3–4", tagline: "Curiosity takes the lead", description: "First letters, numbers, creative play, and small experiments that make discovery feel joyful.", skills: ["Letters A–Z", "Counting 1–10", "Bangla Bornomala", "Creative play"], color: "green" },
  { name: "Bumble Bees", age: "Ages 4–5", tagline: "Confident foundations", description: "Phonics, pencil control, early maths, and storytelling taught through active, purposeful play.", skills: ["Early phonics", "Numbers 1–20", "Writing readiness", "Storytelling"], color: "blue" },
  { name: "Honey Bees", age: "Ages 5–6", tagline: "Ready for the next flight", description: "Reading, sentence building, practical maths, and weekly sharing to prepare children for Grade 1.", skills: ["Early reading", "Sentence building", "Maths to 20", "Show & tell"], color: "rose" },
];

const curriculum = [
  { icon: "book" as const, title: "International early-years pathway", text: "Age-aware learning goals across communication, early literacy, numeracy, physical growth, and creativity." },
  { icon: "language" as const, title: "English, Bangla & early phonics", text: "Stories, sound-play, rhymes, and Bangla Bornomala grow confident communicators in both languages." },
  { icon: "blocks" as const, title: "Play with a purpose", text: "Blocks, role-play, art, movement, and discovery tasks place a learning goal inside every activity." },
  { icon: "calendar" as const, title: "A clear family learning journey", text: "Shared monthly themes, daily diaries, and gentle progress observations help families stay connected." },
] as const;

const day = [
  ["8:30", "Warm welcome", "Free play and a gentle transition into the school day."],
  ["9:00", "Circle & dua", "Songs, greetings, a short dua, and today’s theme."],
  ["9:25", "Purposeful play", "Hands-on English, Bangla, maths, and discovery activities."],
  ["10:15", "Snack & reset", "A healthy break, conversation, and calm recharge time."],
  ["10:45", "Create & move", "Art, stories, music, soft play, and imaginative movement."],
  ["11:30", "Home-time connection", "Closing circle and a diary note to take home."],
] as const;

const facilities = [
  { icon: "play" as const, title: "Indoor soft play", text: "A padded active-play space for climbing, balancing, jumping, and big-body movement." },
  { icon: "blocks" as const, title: "Child-sized classrooms", text: "Bright learning corners, reachable resources, soft surfaces, and rounded furniture." },
  { icon: "book" as const, title: "Little readers’ corner", text: "English and Bangla picture books children can choose, share, and revisit independently." },
  { icon: "leaf" as const, title: "Calm care spaces", text: "Thoughtful hygiene routines and patient support for the youngest children’s needs." },
] as const;

const safety = [
  ["camera", "CCTV-monitored campus"],
  ["firstAid", "First-aid ready staff"],
  ["shield", "Child protection practice"],
  ["fire", "Fire-safety equipment"],
  ["pickup", "Verified guardian pickup"],
] as const satisfies readonly (readonly [IconName, string])[];

const teachers = [
  { initials: "NJ", name: "Ms. Nusrat Jahan", role: "Baby Bees lead teacher", detail: "Sample qualification · Early childhood education" },
  { initials: "SI", name: "Ms. Sadia Islam", role: "Explorer Bees teacher", detail: "Sample qualification · Montessori practice" },
  { initials: "FA", name: "Ms. Farzana Akter", role: "Bumble Bees teacher", detail: "Sample qualification · Early phonics training" },
  { initials: "MR", name: "Ms. Maimuna Rahman", role: "Honey Bees teacher", detail: "Sample qualification · Early-years practice" },
] as const;

const notices = [
  { day: "01", month: "JUL", title: "Admissions open for the 2026–27 founding session", note: "Demo notice · Limited-seat messaging from the approved reference." },
  { day: "15", month: "JUL", title: "Campus visits available for interested families", note: "Demo notice · Please call ahead before visiting." },
  { day: "01", month: "NOV", title: "Planned first day of the founding session", note: "Demo notice · Dates require confirmation before launch." },
] as const;

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div id="top" className="announcement" role="status">
        <div className="container announcement-inner">
          <span className="announcement-label"><Icon name="pin" /> Notice</span>
          <p>Admissions demo for the November 2026 founding session · Campus visits Sunday–Thursday</p>
          <a href="#notices">View notices <Icon name="arrow" /></a>
        </div>
      </div>
      <SiteHeader />

      <main id="main-content">
        <Hero />

        <div className="feature-strip" aria-label="Learning highlights">
          <div className="container feature-strip-inner">
            {['Play-based learning', 'Small class groups', 'Daily parent diary', 'No-grades observation', 'Indoor soft play'].map((item) => <span key={item}><i aria-hidden="true" />{item}</span>)}
          </div>
        </div>

        <section className="section" id="about">
          <div className="container">
            <SectionHeading eyebrow="Welcome to the hive" title={<>Three roots, one <em>strong beginning</em></>} lead="Character and curiosity grow together here. Our values are woven into songs, stories, routines, and every invitation to play." />
            <div className="values-grid">
              <article className="value-card"><span className="icon-tile gold"><Icon name="book" /></span><h3>Confident learners</h3><p>Active early-years experiences build language, thinking, movement, and the joy of discovering something new.</p></article>
              <article className="value-card"><span className="icon-tile green"><Icon name="language" /></span><h3>Rooted communicators</h3><p>English learning sits alongside Bangla language and culture so children grow expressive, connected, and proud.</p></article>
              <article className="value-card"><span className="icon-tile dark"><Icon name="heart" /></span><h3>Kind little hearts</h3><p>Daily duas, gentle manners, and stories of compassion help children practise respect in everyday moments.</p></article>
            </div>
            <div className="stats-row" aria-label="Program overview">
              <div><strong>4</strong><span>class levels</span></div><div><strong>12</strong><span>shared themes</span></div><div><strong>2–6</strong><span>years old</span></div><div><strong>5</strong><span>growth areas</span></div>
            </div>
          </div>
        </section>

        <section className="section section-tint honeycomb-bg" id="classes">
          <div className="container">
            <SectionHeading eyebrow="Our classes" title={<>Four classes, one <em>joyful journey</em></>} lead="Every level is designed around what children are ready to explore now, with short activities, familiar rhythms, and plenty of movement." />
            <div className="classes-grid">
              {classes.map((item, index) => (
                <article className={`class-card ${item.color}`} key={item.name}>
                  <div className="class-top"><span className="class-number">0{index + 1}</span><span className="age-pill">{item.age}</span></div>
                  <h3>{item.name}</h3><p className="class-tagline">{item.tagline}</p><p>{item.description}</p>
                  <ul>{item.skills.map((skill) => <li key={skill}><Icon name="check" />{skill}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="curriculum">
          <div className="container">
            <SectionHeading eyebrow="Learning approach" title={<>World-ready methods for <em>little learners</em></>} lead="A clear, balanced foundation delivered with warmth, repetition, and play — never pressure." />
            <div className="curriculum-grid">
              <div className="curriculum-list">
                {curriculum.map((item) => <article key={item.title}><span className="hex-icon"><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
              </div>
              <aside className="theme-panel">
                <div className="theme-bee" aria-hidden="true"><BeeIcon /></div>
                <p className="eyebrow light">Learning together</p>
                <h3>12 themes connect the whole hive</h3>
                <p>Each class explores the same monthly idea at its own level, giving siblings and families something meaningful to share at home.</p>
                <div className="theme-tags">{["Myself", "My family", "Animals", "Nature", "Community", "Our country", "Ramadan", "Eid", "Colors & shapes", "Water", "Space", "Celebrations"].map((theme) => <span key={theme}>{theme}</span>)}</div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section rhythm-section" id="day">
          <div className="container">
            <SectionHeading eyebrow="A day at Neobee" title={<>A gentle rhythm for <em>busy little hands</em></>} lead="Predictable routines help young children feel secure. Activities stay short, varied, and matched to early attention spans." />
            <ol className="timeline">
              {day.map(([time, title, text], index) => <li key={time}><div className="timeline-marker"><span>{index + 1}</span></div><div><time>{time}</time><h3>{title}</h3><p>{text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="section campus-section" id="campus">
          <div className="container">
            <SectionHeading eyebrow="Campus & care" title={<>Made for small people and <em>big imaginations</em></>} lead="The proposed campus experience is calm, colorful, child-sized, and designed to keep care visible at every step." />
            <div className="facility-feature">
              <div className="facility-feature-art" aria-hidden="true"><Icon name="play" /><span /><i /></div>
              <div><span className="mini-label">Student favorite</span><h3>Indoor soft play for every class</h3><p>A fully padded zone for active play gives children room to climb, roll, balance, laugh, and release big energy safely.</p></div>
            </div>
            <div className="facilities-grid">{facilities.map((item) => <article key={item.title}><span className="icon-tile"><Icon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
            <div className="safety-panel">
              <div><p className="eyebrow light">Safety promise</p><h3>Care parents can see</h3></div>
              <ul>{safety.map(([icon, text]) => <li key={text}><Icon name={icon} /><span>{text}</span></li>)}</ul>
            </div>
          </div>
        </section>

        <section className="section" id="teachers">
          <div className="container">
            <SectionHeading eyebrow="Meet the team" title={<>Warm guides for every <em>little bee</em></>} lead="This section demonstrates the intended teacher-card design. All people, roles, initials, and qualifications below are sample content." centered />
            <div className="demo-disclaimer" role="note"><Icon name="pin" /><span><strong>Demo profiles</strong> — replace every name and credential with verified staff information before publishing.</span></div>
            <div className="teachers-grid">
              {teachers.map((teacher, index) => <article className="teacher-card" key={teacher.name}><div className={`teacher-avatar avatar-${index + 1}`}><span>{teacher.initials}</span><i aria-hidden="true" /></div><span className="sample-badge">Sample</span><h3>{teacher.name}</h3><p className="teacher-role">{teacher.role}</p><p>{teacher.detail}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section notices-section" id="notices">
          <div className="container">
            <SectionHeading eyebrow="Stay updated" title={<>Notices from <em>the hive</em></>} lead="Dates and announcements below are typed demo content for the public-site prototype and require school confirmation." />
            <div className="notices-grid">
              <div className="notice-board">
                <div className="board-heading"><span className="icon-tile gold"><Icon name="pin" /></span><div><h3>Notice board</h3><p>Latest demo announcements</p></div></div>
                {notices.map((notice) => <article className="notice-item" key={notice.title}><time dateTime={`2026-${notice.month === "NOV" ? "11" : "07"}-${notice.day}`}><strong>{notice.day}</strong><span>{notice.month}</span></time><div><h4>{notice.title}</h4><p>{notice.note}</p></div></article>)}
              </div>
              <aside className="opening-card"><span className="opening-kicker">Founding session · Demo</span><div className="opening-mark"><BeeIcon /></div><h3>Opening toward November 2026</h3><p>Families can register interest for a campus conversation and a guided visit. Final dates, fees, and seat availability must be confirmed by the school.</p><a className="button button-light" href="#inquiry">Start an inquiry <Icon name="arrow" /></a></aside>
            </div>
          </div>
        </section>

        <section className="section admissions-section honeycomb-bg" id="admissions">
          <div className="container">
            <SectionHeading eyebrow="Admissions" title={<>Joining the hive is <em>simple</em></>} lead="Three friendly steps help families understand the program before making a decision." />
            <ol className="admission-steps">
              <li><span>1</span><h3>Talk or visit</h3><p>Call the school or arrange a campus visit to meet the team and explore your questions.</p></li>
              <li><span>2</span><h3>Share child details</h3><p>Complete the official application process once the child’s age and suitable class are confirmed.</p></li>
              <li><span>3</span><h3>Prepare for welcome day</h3><p>Receive confirmed schedules, documents, book information, and settling-in guidance.</p></li>
            </ol>
            <div className="inquiry-layout" id="inquiry">
              <aside className="inquiry-copy">
                <p className="eyebrow">Let’s talk</p><h2>Start with a simple inquiry</h2><p>Use this local demo to preview validation and success feedback. It does not contact the school or save personal information.</p>
                <ul><li><Icon name="check" />No backend submission</li><li><Icon name="check" />No data storage</li><li><Icon name="check" />Visible, accessible validation</li></ul>
                <div className="contact-mini"><span><Icon name="phone" /></span><div><small>Prefer to call?</small><a href="tel:+8801347449472">+88 013 4744 9472</a></div></div>
              </aside>
              <InquiryForm />
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-layout">
            <div>
              <SectionHeading eyebrow="Contact" title={<>Come say <em>hello</em></>} lead="Book ahead so the team can welcome your family and guide you to the campus." />
              <div className="contact-list">
                <ContactItem icon="location" title="Preschool campus"><p>Panchlaish R/A, opposite Halda Officers Apartment,<br />Panchlaish, Chattogram, Bangladesh</p></ContactItem>
                <ContactItem icon="phone" title="Phone / WhatsApp"><a href="tel:+8801347449472">+88 013 4744 9472</a></ContactItem>
                <ContactItem icon="mail" title="Email"><a href="mailto:neobeepreschool@gmail.com">neobeepreschool@gmail.com</a></ContactItem>
                <ContactItem icon="clock" title="Visit hours"><p>Sunday–Thursday · Call ahead<br />Friday & Saturday · Closed</p></ContactItem>
              </div>
            </div>
            <div className="map-card" aria-label="Campus location summary">
              <div className="map-pattern" aria-hidden="true"><span className="map-pin"><Icon name="location" /></span><i className="road road-one" /><i className="road road-two" /><i className="road road-three" /></div>
              <div><p className="eyebrow">Panchlaish, Chattogram</p><h3>Find the hive</h3><p>Opposite Halda Officers Apartment in Panchlaish Residential Area.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Panchlaish%20Residential%20Area%20Chattogram" target="_blank" rel="noreferrer">Open in Google Maps <Icon name="arrow" /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand"><a className="brand brand-inverse" href="#top"><span className="brand-mark" aria-hidden="true"><BeeIcon /></span><span className="brand-copy"><strong>Neobee</strong><small>International School</small></span></a><p>A public-site demo for a warm, play-based preschool community in Panchlaish, Chattogram.</p></div>
          <div><h2>Explore</h2><a href="#about">About</a><a href="#classes">Classes</a><a href="#curriculum">Curriculum</a><a href="#campus">Campus & care</a></div>
          <div><h2>Families</h2><a href="#notices">Notices</a><a href="#admissions">Admissions</a><a href="#inquiry">Inquiry</a><a href="/portal">Portal demo</a></div>
          <div><h2>Contact</h2><a href="tel:+8801347449472">+88 013 4744 9472</a><a href="mailto:neobeepreschool@gmail.com">neobeepreschool@gmail.com</a><p>Panchlaish R/A<br />Chattogram, Bangladesh</p></div>
        </div>
        <div className="container footer-bottom"><p>© 2026 Neobee International School · Public website demo</p><a href="#top">Back to top <Icon name="arrow" /></a></div>
      </footer>
      <a className="floating-cta" href="#contact" aria-label="Contact the school">
        <Icon name="phone" />
        <span>Contact</span>
      </a>
    </>
  );
}

function SectionHeading({ eyebrow, title, lead, centered = false }: Readonly<{ eyebrow: string; title: ReactNode; lead: string; centered?: boolean }>) {
  return <div className={`section-heading${centered ? " centered" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{lead}</p></div>;
}

function ContactItem({ icon, title, children }: Readonly<{ icon: IconName; title: string; children: ReactNode }>) {
  return <div className="contact-item"><span className="hex-icon"><Icon name={icon} /></span><div><h3>{title}</h3>{children}</div></div>;
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
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

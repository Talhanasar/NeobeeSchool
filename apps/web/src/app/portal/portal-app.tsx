"use client";

import { useCallback, useMemo, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import {
  AttendanceStatus,
  ClassId,
  DiaryEntry,
  Invoice,
  InvoiceStatus,
  Mood,
  Role,
  Student,
  StudentId,
  TeacherId,
  type Notice,
  adminMetrics,
  attendance as attendanceSeed,
  classes as classSeed,
  diaryEntries as diarySeed,
  findClass,
  findStudent,
  findTeacher,
  growthSummaries,
  invoices as invoiceSeed,
  linkedChildId,
  notices,
  personas,
  pipeline,
  students as studentSeed,
  studentsInClass,
} from "./demo-data";
import { PortalIcon, type PortalIconName } from "./icons";
import { useOverlay } from "../overlay";

// ---------- Types ----------------------------------------------------------

type AdminView = "overview" | "admissions" | "attendance" | "students" | "notices";
type TeacherView = "today" | "class" | "notices";
type ParentView = "home" | "diary" | "attendance" | "growth" | "invoices" | "notices";
type AnyView = AdminView | TeacherView | ParentView;

type Toast = { id: number; text: string };

// ---------- Component ------------------------------------------------------

export function PortalApp() {
  const [role, setRole] = useState<Role | null>(null);
  const [view, setView] = useState<AnyView>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastIdRef = useRef(0);

  // Mutable local overrides for the live demo interactions
  const [attendanceOverrides, setAttendanceOverrides] = useState<
    Record<string, AttendanceStatus>
  >({});
  const [diaryOverrides, setDiaryOverrides] = useState<Record<string, DiaryEntry>>({});
  const [invoiceOverrides, setInvoiceOverrides] = useState<Record<string, InvoiceStatus>>({});

  const sidebarRef = useRef<HTMLElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  const closeMobileNav = useCallback(() => setMobileNav(false), []);
  useOverlay({ open: mobileNav, onClose: closeMobileNav, overlayRef: sidebarRef, toggleRef: menuBtnRef });

  function showToast(text: string) {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToast({ id, text });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2200);
  }

  function switchRole(next: Role) {
    setRole(next);
    setMobileNav(false);
    setView(defaultViewFor(next));
    showToast(`Switched to ${labelForRole(next)} view`);
  }

  function signOut() {
    setRole(null);
    setView("overview");
    setMobileNav(false);
  }

  if (!role) {
    return <RolePicker onPick={switchRole} />;
  }

  const persona = personas.find((p) => p.role === role)!;

  return (
    <div className="portal-shell">
      <a className="skip-link" href="#portal-main">Skip to portal content</a>

      <header className="portal-topbar">
        <div className="portal-topbar-inner">
          <button
            type="button"
            ref={menuBtnRef}
            className="button button-ghost button-icon button-sm portal-menu-btn"
            aria-expanded={mobileNav}
            aria-controls="portal-sidebar"
            aria-label={mobileNav ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileNav((v) => !v)}
          >
            <PortalIcon name={mobileNav ? "close" : "menu"} />
          </button>
          <Link className="brand brand-on-dark" href="/" aria-label="Back to Neobee website">
            <span className="brand-mark" aria-hidden="true">
              <PortalBee />
            </span>
            <span className="brand-copy">
              <strong>Neobee Hive</strong>
              <small>Portal demo</small>
            </span>
          </Link>
          <span className="portal-demo-pill" aria-label="Demo only — local data">
            <PortalIcon name="spark" />
            <span>Demo data only</span>
          </span>
          <nav className="portal-role-switcher" aria-label="Switch role">
            {(["admin", "teacher", "parent"] as const).map((r) => (
              <button
                key={r}
                type="button"
                className={`button button-ghost button-sm${r === role ? " is-on" : ""}`}
                aria-current={r === role ? "true" : undefined}
                onClick={() => switchRole(r)}
              >
                <PortalIcon name="switch" />
                <span>{labelForRole(r)}</span>
              </button>
            ))}
          </nav>
          <button type="button" className="button button-ghost button-sm portal-back" onClick={signOut}>
            <PortalIcon name="back" />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      <div className={`portal-layout${mobileNav ? " is-nav-open" : ""}`}>
        <Sidebar
          role={role}
          view={view}
          sidebarRef={sidebarRef}
          modal={mobileNav}
          onPick={(next) => {
            setView(next);
            setMobileNav(false);
          }}
          onCloseMobile={() => setMobileNav(false)}
          personaName={persona.name}
        />

        <main id="portal-main" className="portal-main" tabIndex={-1}>
          <div className="portal-main-inner">
            <PortalBanner />

            {role === "admin" && (
              <AdminDashboard
                view={view as AdminView}
                onJump={setView}
                showToast={showToast}
                attendanceOverrides={attendanceOverrides}
              />
            )}
            {role === "teacher" && (
              <TeacherDashboard
                view={view as TeacherView}
                persona={persona}
                attendanceOverrides={attendanceOverrides}
                setAttendanceOverrides={setAttendanceOverrides}
                diaryOverrides={diaryOverrides}
                setDiaryOverrides={setDiaryOverrides}
                showToast={showToast}
              />
            )}
            {role === "parent" && (
              <ParentDashboard
                view={view as ParentView}
                persona={persona}
                invoiceOverrides={invoiceOverrides}
                setInvoiceOverrides={setInvoiceOverrides}
                attendanceOverrides={attendanceOverrides}
                diaryOverrides={diaryOverrides}
                showToast={showToast}
              />
            )}
          </div>
        </main>
      </div>

      {mobileNav && (
        <button
          type="button"
          className="portal-nav-scrim"
          aria-label="Close navigation"
          onClick={closeMobileNav}
        />
      )}

      {toast && (
        <div className="portal-toast" role="status" aria-live="polite">
          <PortalIcon name="check" />
          <span>{toast.text}</span>
        </div>
      )}

      <Link className="portal-back-website" href="/">
        <PortalIcon name="back" />
        <span>Back to website</span>
      </Link>
    </div>
  );
}

// ---------- Role picker -----------------------------------------------------

function RolePicker({ onPick }: Readonly<{ onPick: (role: Role) => void }>) {
  return (
    <div className="portal-login">
      <aside className="portal-login-art" aria-hidden="true">
        <div className="portal-login-hex">
          <PortalBee />
        </div>
        <p className="eyebrow light">Neobee Hive</p>
        <h1>The portal, just for the demo.</h1>
        <p>
          A role-based preview of how Admin, Teacher, and Parent will land inside the app.
          Every screen runs on local data — no login, no network, no persistence.
        </p>
        <ul className="portal-login-feats">
          <li><span aria-hidden="true">⬡</span> Pick a role to enter the demo</li>
          <li><span aria-hidden="true">⬡</span> Switch roles at any time from the top bar</li>
          <li><span aria-hidden="true">⬡</span> Attendance, diary & invoices update live</li>
          <li><span aria-hidden="true">⬡</span> Refresh the page to reset the demo</li>
        </ul>
      </aside>

      <section className="portal-login-panel" aria-labelledby="login-title">
        <div className="portal-login-card">
          <p className="eyebrow">Demo Portal</p>
          <h2 id="login-title">Choose a role to enter</h2>
          <p className="portal-login-sub">Three demo personas — no passwords required.</p>

          <form
            className="portal-login-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="portal-login-field">
              <label htmlFor="demo-email">Demo email</label>
              <input
                id="demo-email"
                type="email"
                value="demo@neobee.school"
                readOnly
                aria-readonly="true"
              />
            </div>
            <div className="portal-login-field">
              <label htmlFor="demo-pass">Password</label>
              <input
                id="demo-pass"
                type="password"
                value="demo-mode"
                readOnly
                aria-readonly="true"
                disabled
              />
              <p className="portal-login-hint">
                <PortalIcon name="lock" /> Auth disabled in this demo. Pick a role below.
              </p>
            </div>

            <div className="portal-login-roles" role="group" aria-label="Demo roles">
              {personas.map((persona) => (
                <button
                  key={persona.role}
                  type="button"
                  className={`portal-login-role is-${persona.role}`}
                  onClick={() => onPick(persona.role)}
                >
                  <span className="portal-login-avatar" aria-hidden="true">
                    {initialsFromName(persona.name)}
                  </span>
                  <span className="portal-login-role-text">
                    <small>{labelForRole(persona.role)}</small>
                    <strong>{persona.name}</strong>
                    <em>{persona.subtitle}</em>
                  </span>
                  <PortalIcon name="back" />
                </button>
              ))}
            </div>

            <Link className="portal-login-back" href="/">
              <PortalIcon name="back" />
              <span>Back to the website</span>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}

// ---------- Sidebar ---------------------------------------------------------

function Sidebar({
  role,
  view,
  onPick,
  onCloseMobile,
  personaName,
  sidebarRef,
  modal,
}: Readonly<{
  role: Role;
  view: AnyView;
  onPick: (next: AnyView) => void;
  onCloseMobile: () => void;
  personaName: string;
  sidebarRef?: RefObject<HTMLElement | null>;
  modal?: boolean;
}>) {
  const items = useMemo(() => itemsForRole(role), [role]);
  return (
    // Truthful marking: on desktop this aside is a plain persistent nav sidebar.
    // While the mobile drawer is open it behaves as a modal dialog, so it gets
    // both the dialog role and aria-modal for exactly that state — aria-modal
    // without a dialog role is invalid ARIA. The behaviour lives in useOverlay.
    <aside
      id="portal-sidebar"
      ref={sidebarRef}
      className="portal-sidebar"
      aria-label="Portal navigation"
      role={modal ? "dialog" : undefined}
      aria-modal={modal ? "true" : undefined}
    >
      <div className="portal-sidebar-user">
        <span className="portal-sidebar-avatar" aria-hidden="true">
          {initialsFromName(personaName)}
        </span>
        <div>
          <strong>{personaName}</strong>
          <small>{labelForRole(role)} · Demo persona</small>
        </div>
      </div>

      <nav className="portal-sidebar-nav">
        <p className="portal-sidebar-group">{labelForRole(role)}</p>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`button button-ghost button-sm${view === item.id ? " is-on" : ""}`}
            aria-current={view === item.id ? "page" : undefined}
            onClick={() => {
              onPick(item.id);
              onCloseMobile();
            }}
          >
            <PortalIcon name={item.icon} />
            <span>{item.label}</span>
            {item.badge ? <span className="portal-sidebar-pip">{item.badge}</span> : null}
          </button>
        ))}
      </nav>

      <div className="portal-sidebar-foot">
        <Link href="/">
          <PortalIcon name="back" />
          <span>Back to website</span>
        </Link>
        <p>Refresh to reset demo data.</p>
      </div>
    </aside>
  );
}

// ---------- Banner ----------------------------------------------------------

function PortalBanner() {
  return (
    <p className="portal-banner" role="status">
      <PortalIcon name="spark" />
      <span>
        <strong>Demo data only</strong> — Supabase connection comes next.
        Everything resets when the page is reloaded.
      </span>
    </p>
  );
}

// ---------- Admin dashboard -------------------------------------------------

function AdminDashboard({
  view,
  onJump,
  showToast,
  attendanceOverrides,
}: Readonly<{
  view: AdminView;
  onJump: (v: AdminView) => void;
  showToast: (t: string) => void;
  attendanceOverrides: Record<string, AttendanceStatus>;
}>) {
  const attendanceSummary = useMemo(() => {
    const today = "2026-07-25";
    const records = attendanceSeed
      .filter((r) => r.date === today)
      .map((r) => ({ ...r, status: attendanceOverrides[r.studentId] ?? r.status }));
    const present = records.filter((r) => r.status === "present").length;
    const late = records.filter((r) => r.status === "late").length;
    const absent = records.filter((r) => r.status === "absent").length;
    return { present, late, absent, total: records.length };
  }, [attendanceOverrides]);

  const feesDue = useMemo(
    () => invoiceSeed.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amountBdt, 0),
    [],
  );

  return (
    <>
      <PageHeader
        title="Admin overview"
        crumbs={["People", "Overview"]}
        subtitle="A live snapshot of today's hive. Numbers reflect the local demo data only."
      />

      {view === "overview" && (
        <>
          <div className="portal-kpis">
            {adminMetrics.map((metric) => (
              <article key={metric.id} className={`portal-kpi portal-kpi-${metric.tone}`}>
                <small>{metric.label}</small>
                <strong>{metric.id === "feesDue" ? formatBdt(feesDue) : metric.value}</strong>
                <span>{metric.sub}</span>
              </article>
            ))}
          </div>

          <div className="portal-grid-2">
            <section className="portal-card" aria-labelledby="admin-pipe-title">
              <header>
                <h3 id="admin-pipe-title">
                  <PortalIcon name="pipeline" /> Admissions pipeline
                </h3>
                <button
                  type="button"
                  className="portal-card-link"
                  onClick={() => onJump("admissions")}
                >
                  View all <PortalIcon name="back" />
                </button>
              </header>
              <ol className="portal-pipeline">
                {pipeline.map((stage) => (
                  <li key={stage.stage}>
                    <span className="portal-pipeline-label">{stage.stage}</span>
                    <span className="portal-pipeline-count">{stage.count}</span>
                    <span className="portal-pipeline-bar" aria-hidden="true">
                      <i style={{ width: `${Math.min(100, stage.count * 9)}%` }} />
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="portal-card" aria-labelledby="admin-att-title">
              <header>
                <h3 id="admin-att-title">
                  <PortalIcon name="attendance" /> Today’s attendance
                </h3>
                <button
                  type="button"
                  className="portal-card-link"
                  onClick={() => onJump("attendance")}
                >
                  Open <PortalIcon name="back" />
                </button>
              </header>
              <ul className="portal-attendance-summary">
                <li>
                  <span className="dot dot-present" aria-hidden="true" />
                  <span><strong>{attendanceSummary.present}</strong> present</span>
                </li>
                <li>
                  <span className="dot dot-late" aria-hidden="true" />
                  <span><strong>{attendanceSummary.late}</strong> late</span>
                </li>
                <li>
                  <span className="dot dot-absent" aria-hidden="true" />
                  <span><strong>{attendanceSummary.absent}</strong> absent</span>
                </li>
              </ul>
              <p className="portal-card-foot">
                {attendanceSummary.total} children expected today · {attendanceSummary.present + attendanceSummary.late} on campus.
              </p>
            </section>
          </div>

          <section className="portal-card" aria-labelledby="admin-quick-title">
            <header>
              <h3 id="admin-quick-title">
                <PortalIcon name="spark" /> Quick actions
              </h3>
            </header>
            <div className="portal-actions">
              {[
                { label: "Add inquiry", icon: "plus" as const },
                { label: "Send fee reminder", icon: "invoice" as const },
                { label: "Post a notice", icon: "notice" as const },
                { label: "Export roster", icon: "users" as const },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="button button-ghost portal-action"
                  onClick={() => showToast(`${action.label} · Demo only`)}
                >
                  <PortalIcon name={action.icon} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="portal-card" aria-labelledby="admin-notices-title">
            <header>
              <h3 id="admin-notices-title">
                <PortalIcon name="notice" /> Recent notices
              </h3>
              <button
                type="button"
                className="portal-card-link"
                onClick={() => onJump("notices")}
              >
                Open notices <PortalIcon name="back" />
              </button>
            </header>
            <NoticeList notices={notices.slice(0, 3)} />
          </section>
        </>
      )}

      {view === "admissions" && (
        <section className="portal-card portal-card-wide" aria-labelledby="admin-pipe-detail">
          <header>
            <h3 id="admin-pipe-detail">
              <PortalIcon name="pipeline" /> Admissions pipeline
            </h3>
            <span className="portal-card-sub">{pipeline.reduce((s, c) => s + c.count, 0)} active leads</span>
          </header>
          <div className="portal-pipeline-columns">
            {pipeline.map((column) => (
              <article key={column.stage} className="portal-pipe-col">
                <h4>
                  {column.stage}
                  <span className="portal-pipe-count">{column.count}</span>
                </h4>
                {column.leads.length === 0 ? (
                  <p className="portal-pipe-empty">No leads in this stage.</p>
                ) : (
                  <ul>
                    {column.leads.map((lead) => (
                      <li key={lead.name}>
                        <strong>{lead.name}</strong>
                        <small>{lead.classLabel} · {lead.age}</small>
                        <button
                          type="button"
                          className="button button-ghost button-sm"
                          onClick={() => showToast(`Opening ${lead.name} · Demo only`)}
                        >
                          Open lead <PortalIcon name="back" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {view === "attendance" && (
        <section className="portal-card portal-card-wide" aria-labelledby="admin-att-detail">
          <header>
            <h3 id="admin-att-detail">
              <PortalIcon name="attendance" /> Roster — today
            </h3>
            <span className="portal-card-sub">25 Jul 2026 · Live demo data</span>
          </header>
          <AdminRosterTable overrides={attendanceOverrides} showToast={showToast} />
        </section>
      )}

      {view === "students" && (
        <section className="portal-card portal-card-wide" aria-labelledby="admin-students-title">
          <header>
            <h3 id="admin-students-title">
              <PortalIcon name="users" /> Enrolled students
            </h3>
            <span className="portal-card-sub">{studentSeed.length} demo students</span>
          </header>
          <StudentsTable students={studentSeed} />
        </section>
      )}

      {view === "notices" && (
        <section className="portal-card portal-card-wide" aria-labelledby="admin-notices-detail">
          <header>
            <h3 id="admin-notices-detail">
              <PortalIcon name="notice" /> All notices
            </h3>
            <button
              type="button"
              className="button button-ghost portal-action portal-action-inline"
              onClick={() => showToast("Compose notice · Demo only")}
            >
              <PortalIcon name="plus" />
              <span>New notice</span>
            </button>
          </header>
          <NoticeList notices={notices} />
        </section>
      )}
    </>
  );
}

function AdminRosterTable({
  overrides,
  showToast,
}: Readonly<{
  overrides: Record<string, AttendanceStatus>;
  showToast: (t: string) => void;
}>) {
  const today = "2026-07-25";
  return (
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th scope="col">Student</th>
            <th scope="col">Class</th>
            <th scope="col">Today</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentSeed.map((student) => {
            const status =
              overrides[student.id] ??
              attendanceSeed.find((r) => r.studentId === student.id && r.date === today)?.status ??
              "absent";
            return (
              <tr key={student.id}>
                <th scope="row">
                  <span className="portal-student-cell">
                    <span className="portal-hexavatar">{student.initials}</span>
                    <span>
                      <strong>{student.name}</strong>
                      <small>{student.guardianName}</small>
                    </span>
                  </span>
                </th>
                <td>{classSeed.find((c) => c.id === student.classId)?.name}</td>
                <td>
                  <span className={`portal-badge portal-badge-${status}`}>{labelForStatus(status)}</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="portal-card-link"
                    onClick={() => showToast(`Message ${student.guardianName} · Demo only`)}
                  >
                    Message guardian <PortalIcon name="back" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StudentsTable({ students }: Readonly<{ students: readonly Student[] }>) {
  return (
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th scope="col">Student</th>
            <th scope="col">Class</th>
            <th scope="col">Guardian</th>
            <th scope="col">Enrolled</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const klass = classSeed.find((c) => c.id === student.classId);
            return (
              <tr key={student.id}>
                <th scope="row">
                  <span className="portal-student-cell">
                    <span className="portal-hexavatar">{student.initials}</span>
                    <span>
                      <strong>{student.name}</strong>
                      <small>{student.relation}</small>
                    </span>
                  </span>
                </th>
                <td>
                  <span className={`portal-class-tag portal-class-${klass?.color ?? "gold"}`}>
                    {klass?.name}
                  </span>
                </td>
                <td>{student.guardianName}</td>
                <td>{formatDate(student.enrolledOn)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Teacher dashboard -----------------------------------------------

function TeacherDashboard({
  view,
  persona,
  attendanceOverrides,
  setAttendanceOverrides,
  diaryOverrides,
  setDiaryOverrides,
  showToast,
}: Readonly<{
  view: TeacherView;
  persona: (typeof personas)[number];
  attendanceOverrides: Record<string, AttendanceStatus>;
  setAttendanceOverrides: (
    next: Record<string, AttendanceStatus> | ((prev: Record<string, AttendanceStatus>) => Record<string, AttendanceStatus>),
  ) => void;
  diaryOverrides: Record<string, DiaryEntry>;
  setDiaryOverrides: (
    next: Record<string, DiaryEntry> | ((prev: Record<string, DiaryEntry>) => Record<string, DiaryEntry>),
  ) => void;
  showToast: (t: string) => void;
}>) {
  const teacherId = persona.teacherId as TeacherId;
  const teacher = findTeacher(teacherId);
  const teacherClassId: ClassId = teacher.classIds[0]!;
  const klass = classSeed.find((c) => c.id === teacherClassId)!;
  const classStudents = studentsInClass(teacherClassId);

  const today = "2026-07-25";
  const roster = classStudents.map((student) => {
    const seedStatus =
      attendanceSeed.find((r) => r.studentId === student.id && r.date === today)?.status ?? "absent";
    return {
      student,
      status: attendanceOverrides[student.id] ?? seedStatus,
    };
  });

  const summary = {
    present: roster.filter((r) => r.status === "present").length,
    late: roster.filter((r) => r.status === "late").length,
    absent: roster.filter((r) => r.status === "absent").length,
  };

  function setStatus(studentId: StudentId, status: AttendanceStatus) {
    setAttendanceOverrides((prev) => ({ ...prev, [studentId]: status }));
    showToast(`Marked ${findStudent(studentId).name} · ${labelForStatus(status)}`);
  }

  const [selectedDiaryStudentId, setSelectedDiaryStudentId] = useState<StudentId>(classStudents[0]!.id);
  const selectedDiaryStudent = classStudents.find((s) => s.id === selectedDiaryStudentId) ?? classStudents[0]!;
  const seedDiary =
    diarySeed.find((d) => d.studentId === selectedDiaryStudent.id && d.date === today) ?? {
      studentId: selectedDiaryStudent.id,
      date: today,
      meals: "",
      nap: "",
      activities: "",
      mood: "happy" as Mood,
      note: "",
    };
  const diaryEntry = diaryOverrides[selectedDiaryStudent.id] ?? seedDiary;

  function updateDiary(patch: Partial<DiaryEntry>) {
    setDiaryOverrides((prev) => ({
      ...prev,
      [selectedDiaryStudent.id]: { ...diaryEntry, ...patch },
    }));
  }

  function saveDiary() {
    setDiaryOverrides((prev) => ({
      ...prev,
      [selectedDiaryStudent.id]: { ...diaryEntry },
    }));
    showToast(`Diary saved for ${selectedDiaryStudent.name}`);
  }

  return (
    <>
      <PageHeader
        title={`${klass.name} · Today`}
        crumbs={[teacher.name, klass.ageBand]}
        subtitle={`${teacher.role} · ${teacher.qualification.replace("Sample qualification · ", "")}`}
      />

      {view === "today" && (
        <>
          <div className="portal-teacher-grid">
            <section className="portal-card" aria-labelledby="teacher-class-title">
              <header>
                <h3 id="teacher-class-title">
                  <PortalIcon name="users" /> Assigned class
                </h3>
              </header>
              <div className="portal-class-summary">
                <span className={`portal-class-tag portal-class-${klass.color}`}>{klass.name}</span>
                <p className="portal-class-tagline">{klass.tagline}</p>
                <ul className="portal-class-meta">
                  <li><strong>{classStudents.length}</strong> students</li>
                  <li><strong>{summary.present}</strong> present · <strong>{summary.late}</strong> late · <strong>{summary.absent}</strong> absent</li>
                  <li><strong>9:00–11:30</strong> daily rhythm</li>
                </ul>
              </div>
            </section>

            <section className="portal-card" aria-labelledby="teacher-att-title">
              <header>
                <h3 id="teacher-att-title">
                  <PortalIcon name="attendance" /> Today’s attendance
                </h3>
                <span className="portal-card-sub">Tap to update — changes stay local</span>
              </header>
              <ul className="portal-roster">
                {roster.map(({ student, status }) => (
                  <li key={student.id}>
                    <span className="portal-roster-name">
                      <span className="portal-hexavatar">{student.initials}</span>
                      <span>
                        <strong>{student.name}</strong>
                        <small>{findClass(student.classId).name}</small>
                      </span>
                    </span>
                    <div className="portal-attendance-toggle" role="group" aria-label={`Mark attendance for ${student.name}`}>
                      {(["present", "absent", "late"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`button button-ghost button-sm portal-att-btn portal-att-${option}${status === option ? " is-on" : ""}`}
                          aria-pressed={status === option}
                          onClick={() => setStatus(student.id, option)}
                        >
                          {labelForStatus(option)}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="portal-card portal-card-wide" aria-labelledby="teacher-diary-title">
              <header>
                <h3 id="teacher-diary-title">
                  <PortalIcon name="diary" /> Daily diary
                </h3>
                <div className="portal-diary-controls">
                  <label htmlFor="diary-student" className="sr-only">Choose student</label>
                  <select
                    id="diary-student"
                    value={selectedDiaryStudent.id}
                    onChange={(e) => setSelectedDiaryStudentId(e.target.value as StudentId)}
                  >
                    {classStudents.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <span className="portal-diary-saved">
                    {diaryOverrides[selectedDiaryStudent.id] ? "Saved · just now" : "Not yet saved"}
                  </span>
                </div>
              </header>
              <form className="portal-diary" onSubmit={(e) => { e.preventDefault(); saveDiary(); }}>
                <div className="portal-diary-grid">
                  <label htmlFor="diary-meals">
                    <span>Meals</span>
                    <input
                      id="diary-meals"
                      name="diary-meals"
                      value={diaryEntry.meals}
                      onChange={(e) => updateDiary({ meals: e.target.value })}
                      placeholder="Breakfast, lunch, snack"
                    />
                  </label>
                  <label htmlFor="diary-nap">
                    <span>Nap</span>
                    <input
                      id="diary-nap"
                      name="diary-nap"
                      value={diaryEntry.nap}
                      onChange={(e) => updateDiary({ nap: e.target.value })}
                      placeholder="Duration & rest notes"
                    />
                  </label>
                  <label htmlFor="diary-activities" className="portal-diary-wide">
                    <span>Activities</span>
                    <textarea
                      id="diary-activities"
                      name="diary-activities"
                      rows={2}
                      value={diaryEntry.activities}
                      onChange={(e) => updateDiary({ activities: e.target.value })}
                      placeholder="What did the class do today?"
                    />
                  </label>
                  <fieldset className="portal-mood">
                    <legend>Mood</legend>
                    {(["happy", "calm", "tired", "playful", "thoughtful"] as const).map((m) => (
                      <label key={m} className={diaryEntry.mood === m ? "is-on" : undefined}>
                        <input
                          type="radio"
                          name={`mood-${selectedDiaryStudent.id}`}
                          value={m}
                          checked={diaryEntry.mood === m}
                          onChange={() => updateDiary({ mood: m })}
                        />
                        <span>{labelForMood(m)}</span>
                      </label>
                    ))}
                  </fieldset>
                  <label htmlFor="diary-note" className="portal-diary-wide">
                    <span>Note for parents</span>
                    <textarea
                      id="diary-note"
                      name="diary-note"
                      rows={2}
                      value={diaryEntry.note}
                      onChange={(e) => updateDiary({ note: e.target.value })}
                      placeholder="A short, warm message to take home"
                    />
                  </label>
                </div>
                <div className="portal-diary-actions">
                  <button type="submit" className="button button-primary">
                    Save diary entry
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => showToast("Reminder sent to guardian · Demo only")}
                  >
                    Send to parent
                  </button>
                </div>
              </form>
            </section>
          </div>

          <section className="portal-card" aria-labelledby="teacher-notices-title">
            <header>
              <h3 id="teacher-notices-title">
                <PortalIcon name="notice" /> Notices for the team
              </h3>
              <button
                type="button"
                className="portal-card-link"
                onClick={() => showToast("Open staff noticeboard · Demo only")}
              >
                Open noticeboard <PortalIcon name="back" />
              </button>
            </header>
            <NoticeList notices={notices.slice(0, 2)} />
          </section>
        </>
      )}

      {view === "class" && (
        <section className="portal-card portal-card-wide" aria-labelledby="teacher-class-detail">
          <header>
            <h3 id="teacher-class-detail">
              <PortalIcon name="users" /> {klass.name} roster
            </h3>
            <span className="portal-card-sub">{classStudents.length} students · Sample data</span>
          </header>
          <StudentsTable students={classStudents} />
        </section>
      )}

      {view === "notices" && (
        <section className="portal-card portal-card-wide" aria-labelledby="teacher-notices-detail">
          <header>
            <h3 id="teacher-notices-detail">
              <PortalIcon name="notice" /> Staff noticeboard
            </h3>
          </header>
          <NoticeList notices={notices} />
        </section>
      )}
    </>
  );
}

// ---------- Parent dashboard ------------------------------------------------

function ParentDashboard({
  view,
  persona,
  invoiceOverrides,
  setInvoiceOverrides,
  attendanceOverrides,
  diaryOverrides,
  showToast,
}: Readonly<{
  view: ParentView;
  persona: (typeof personas)[number];
  invoiceOverrides: Record<string, InvoiceStatus>;
  setInvoiceOverrides: (
    next: Record<string, InvoiceStatus> | ((prev: Record<string, InvoiceStatus>) => Record<string, InvoiceStatus>),
  ) => void;
  attendanceOverrides: Record<string, AttendanceStatus>;
  diaryOverrides: Record<string, DiaryEntry>;
  showToast: (t: string) => void;
}>) {
  const childId = (persona.studentId ?? linkedChildId) as StudentId;
  const child = findStudent(childId);
  const klass = classSeed.find((c) => c.id === child.classId)!;
  const teacher = findTeacher(klass.leadTeacherId);
  const growth = growthSummaries.find((g) => g.studentId === child.id);
  const childInvoices = invoiceSeed.filter((i) => i.studentId === child.id);
  const today = "2026-07-25";

  const childAttendance = attendanceSeed
    .filter((r) => r.studentId === child.id)
    .map((r) => ({ ...r, status: attendanceOverrides[r.studentId] ?? r.status }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const childDiary = diarySeed
    .filter((d) => d.studentId === child.id)
    .map((d) => diaryOverrides[d.studentId] && d.date === today ? { ...d, ...diaryOverrides[d.studentId] } : d)
    .sort((a, b) => b.date.localeCompare(a.date));

  const totals = childInvoices.reduce(
    (acc, inv) => {
      const status = invoiceOverrides[inv.id] ?? inv.status;
      if (status === "paid") acc.paid += inv.amountBdt;
      else acc.due += inv.amountBdt;
      return acc;
    },
    { paid: 0, due: 0 },
  );

  function markPaid(invoice: Invoice) {
    setInvoiceOverrides((prev) => ({ ...prev, [invoice.id]: "paid" }));
    showToast(`Marked ${invoice.item} as paid · Demo only`);
  }

  return (
    <>
      <PageHeader
        title={`${child.name} · Family view`}
        crumbs={[klass.name, `${teacher.name}`]}
        subtitle={`Parent persona · ${persona.name}`}
      />

      <section className="portal-card portal-child-card" aria-labelledby="parent-hero-title">
        <div className="portal-child-card-top">
          <span className="portal-hexavatar portal-hexavatar-lg">{child.initials}</span>
          <div>
            <p className="eyebrow">{klass.name} · {klass.ageBand}</p>
            <h2 id="parent-hero-title">{child.name}</h2>
            <p className="portal-child-meta">
              Lead teacher: <strong>{teacher.name}</strong> · Guardian: {persona.name}
            </p>
          </div>
        </div>
        <ul className="portal-child-stats">
          <li>
            <small>Today</small>
            <strong>
              {labelForStatus(childAttendance.find((a) => a.date === today)?.status ?? "present")}
            </strong>
          </li>
          <li>
            <small>Diary entries</small>
            <strong>{childDiary.length}</strong>
          </li>
          <li>
            <small>Open invoices</small>
            <strong>{formatBdt(totals.due)}</strong>
          </li>
          <li>
            <small>Paid this term</small>
            <strong>{formatBdt(totals.paid)}</strong>
          </li>
        </ul>
      </section>

      {view === "home" && (
        <>
          <div className="portal-grid-2">
            <section className="portal-card" aria-labelledby="parent-diary-title">
              <header>
                <h3 id="parent-diary-title">
                  <PortalIcon name="diary" /> Recent diary
                </h3>
                <span className="portal-card-sub">Latest from the teacher</span>
              </header>
              <ol className="portal-diary-timeline">
                {childDiary.slice(0, 4).map((entry) => (
                  <li key={entry.date}>
                    <span className="portal-diary-date">{formatDate(entry.date)}</span>
                    <div>
                      <p className="portal-diary-line">
                        <span className="portal-diary-tag">Mood</span>
                        {labelForMood(entry.mood)}
                      </p>
                      <p className="portal-diary-line">
                        <span className="portal-diary-tag">Meals</span>
                        {entry.meals || "—"}
                      </p>
                      <p className="portal-diary-line">
                        <span className="portal-diary-tag">Nap</span>
                        {entry.nap || "—"}
                      </p>
                      {entry.note ? (
                        <p className="portal-diary-note">{entry.note}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="portal-card" aria-labelledby="parent-attendance-title">
              <header>
                <h3 id="parent-attendance-title">
                  <PortalIcon name="attendance" /> Attendance — last week
                </h3>
                <span className="portal-card-sub">{presentCount(childAttendance)} / {childAttendance.length} present</span>
              </header>
              <ul className="portal-heat-strip" aria-label="Attendance heat strip">
                {childAttendance.map((entry) => (
                  <li key={entry.date} title={`${formatDate(entry.date)} · ${labelForStatus(entry.status)}`}>
                    <span className={`portal-heat-cell portal-heat-${entry.status}`} aria-hidden="true" />
                    <small>{formatShortDate(entry.date)}</small>
                  </li>
                ))}
              </ul>
              <ul className="portal-attendance-summary">
                <li><span className="dot dot-present" aria-hidden="true" /> Present</li>
                <li><span className="dot dot-late" aria-hidden="true" /> Late</li>
                <li><span className="dot dot-absent" aria-hidden="true" /> Absent</li>
              </ul>
            </section>
          </div>

          <section className="portal-card" aria-labelledby="parent-notices-title">
            <header>
              <h3 id="parent-notices-title">
                <PortalIcon name="notice" /> Latest notices
              </h3>
            </header>
            <NoticeList notices={notices.slice(0, 3)} />
          </section>
        </>
      )}

      {view === "diary" && (
        <section className="portal-card portal-card-wide" aria-labelledby="parent-diary-full-title">
          <header>
            <h3 id="parent-diary-full-title">
              <PortalIcon name="diary" /> Full diary history
            </h3>
            <span className="portal-card-sub">{childDiary.length} entries</span>
          </header>
          <ol className="portal-diary-timeline">
            {childDiary.map((entry) => (
              <li key={entry.date}>
                <span className="portal-diary-date">{formatDate(entry.date)}</span>
                <div>
                  <p className="portal-diary-line">
                    <span className="portal-diary-tag">Mood</span>
                    {labelForMood(entry.mood)}
                  </p>
                  <p className="portal-diary-line">
                    <span className="portal-diary-tag">Meals</span>
                    {entry.meals || "—"}
                  </p>
                  <p className="portal-diary-line">
                    <span className="portal-diary-tag">Nap</span>
                    {entry.nap || "—"}
                  </p>
                  <p className="portal-diary-line">
                    <span className="portal-diary-tag">Activities</span>
                    {entry.activities || "—"}
                  </p>
                  {entry.note ? (
                    <p className="portal-diary-note">{entry.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {view === "attendance" && (
        <section className="portal-card portal-card-wide" aria-labelledby="parent-att-full-title">
          <header>
            <h3 id="parent-att-full-title">
              <PortalIcon name="attendance" /> Attendance details
            </h3>
            <span className="portal-card-sub">{presentCount(childAttendance)} / {childAttendance.length} present</span>
          </header>
          <ul className="portal-heat-strip" aria-label="Attendance heat strip">
            {childAttendance.map((entry) => (
              <li key={entry.date} title={`${formatDate(entry.date)} · ${labelForStatus(entry.status)}`}>
                <span className={`portal-heat-cell portal-heat-${entry.status}`} aria-hidden="true" />
                <small>{formatShortDate(entry.date)}</small>
              </li>
            ))}
          </ul>
          <ul className="portal-attendance-summary">
            <li><span className="dot dot-present" aria-hidden="true" /> Present</li>
            <li><span className="dot dot-late" aria-hidden="true" /> Late</li>
            <li><span className="dot dot-absent" aria-hidden="true" /> Absent</li>
          </ul>
        </section>
      )}

      {view === "growth" && (
        <section className="portal-card portal-card-wide" aria-labelledby="parent-growth-title">
          <header>
            <h3 id="parent-growth-title">
              <PortalIcon name="growth" /> Growth summary
            </h3>
            <span className="portal-card-sub">
              Last measured {growth ? formatDate(growth.lastChecked) : "—"}
            </span>
          </header>
          {growth ? (
            <>
              <ul className="portal-growth-grid">
                <li>
                  <small>Height</small>
                  <strong>{growth.heightCm} cm</strong>
                </li>
                <li>
                  <small>Weight</small>
                  <strong>{growth.weightKg} kg</strong>
                </li>
                <li>
                  <small>Milestones</small>
                  <strong>{growth.milestones.length}</strong>
                </li>
              </ul>
              <ul className="portal-milestones">
                {growth.milestones.map((milestone) => (
                  <li key={milestone}>
                    <PortalIcon name="check" />
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No growth summary available.</p>
          )}
        </section>
      )}

      {view === "invoices" && (
        <section className="portal-card portal-card-wide" aria-labelledby="parent-invoices-title">
          <header>
            <h3 id="parent-invoices-title">
              <PortalIcon name="invoice" /> Invoices
            </h3>
            <span className="portal-card-sub">
              Paid {formatBdt(totals.paid)} · Due {formatBdt(totals.due)}
            </span>
          </header>
          <ul className="portal-invoices">
            {childInvoices.map((invoice) => {
              const status = invoiceOverrides[invoice.id] ?? invoice.status;
              return (
                <li key={invoice.id}>
                  <span className="portal-invoice-month">{invoice.month}</span>
                  <div>
                    <strong>{invoice.item}</strong>
                    <small>Due {formatDate(invoice.dueDate)}</small>
                  </div>
                  <span className="portal-invoice-amount">{formatBdt(invoice.amountBdt)}</span>
                  <span className={`portal-badge portal-badge-${status}`}>
                    {status === "paid" ? "Paid" : status === "due" ? "Due" : "Overdue"}
                  </span>
                  {status === "paid" ? (
                    <span className="portal-invoice-foot">Paid {invoice.paidOn ? formatDate(invoice.paidOn) : ""}</span>
                  ) : (
                    <button
                      type="button"
                      className="portal-card-link"
                      onClick={() => markPaid(invoice)}
                    >
                      Mark as paid <PortalIcon name="back" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {view === "notices" && (
        <section className="portal-card portal-card-wide" aria-labelledby="parent-notices-detail">
          <header>
            <h3 id="parent-notices-detail">
              <PortalIcon name="notice" /> All notices
            </h3>
          </header>
          <NoticeList notices={notices} />
        </section>
      )}
    </>
  );
}

// ---------- Shared bits ----------------------------------------------------

function NoticeList({ notices: items }: Readonly<{ notices: ReadonlyArray<Notice> }>) {
  return (
    <ul className="portal-notice-list">
      {items.map((notice) => (
        <li key={notice.id}>
          <time dateTime={notice.date}>{formatShortDate(notice.date)}</time>
          <div>
            <h4>{notice.title}</h4>
            <p>{notice.body}</p>
            <span className={`portal-tag portal-tag-${notice.tag.toLowerCase()}`}>{notice.tag}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PageHeader({
  title,
  crumbs,
  subtitle,
}: Readonly<{ title: string; crumbs: readonly string[]; subtitle: string }>) {
  return (
    <div className="portal-page-head">
      <p className="portal-crumb">
        {crumbs.map((crumb, i) => (
          <span key={`${crumb}-${i}`}>
            {crumb}
            {i < crumbs.length - 1 ? <i aria-hidden="true">›</i> : null}
          </span>
        ))}
      </p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

function PortalBee() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M19 19c-5-7-12-5-11 1 1 5 7 6 12 4m9-5c5-7 12-5 11 1-1 5-7 6-12 4" fill="#f8fdff" stroke="currentColor" strokeWidth="2" />
      <path d="M14 28c0-8 4-13 10-13s10 5 10 13-4 13-10 13-10-5-10-13Z" fill="#f5a81c" stroke="currentColor" strokeWidth="2" />
      <path d="M16 23h16M15 30h18" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="m24 41 3-4h-6l3 4ZM20 14l-3-4m11 4 3-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2" fill="currentColor" />
      <circle cx="31" cy="9" r="2" fill="currentColor" />
    </svg>
  );
}

// ---------- Helpers --------------------------------------------------------

function itemsForRole(role: Role): ReadonlyArray<{ id: AnyView; label: string; icon: PortalIconName; badge?: string }> {
  if (role === "admin") {
    return [
      { id: "overview", label: "Overview", icon: "dashboard" },
      { id: "admissions", label: "Admissions", icon: "pipeline", badge: "26" },
      { id: "attendance", label: "Attendance", icon: "attendance" },
      { id: "students", label: "Students", icon: "users" },
      { id: "notices", label: "Notices", icon: "notice" },
    ];
  }
  if (role === "teacher") {
    return [
      { id: "today", label: "My class today", icon: "dashboard" },
      { id: "class", label: "Class roster", icon: "users" },
      { id: "notices", label: "Noticeboard", icon: "notice" },
    ];
  }
  return [
    { id: "home", label: "Home", icon: "dashboard" },
    { id: "diary", label: "Daily diary", icon: "diary" },
    { id: "attendance", label: "Attendance", icon: "attendance" },
    { id: "growth", label: "Growth report", icon: "growth" },
    { id: "invoices", label: "Invoices", icon: "invoice", badge: "1" },
    { id: "notices", label: "Notices", icon: "notice" },
  ];
}

function defaultViewFor(role: Role): AnyView {
  if (role === "admin") return "overview";
  if (role === "teacher") return "today";
  return "home";
}

function labelForRole(role: Role): string {
  if (role === "admin") return "Admin";
  if (role === "teacher") return "Teacher";
  return "Parent";
}

function labelForStatus(status: AttendanceStatus | "paid" | "due" | "overdue"): string {
  switch (status) {
    case "present":
      return "Present";
    case "absent":
      return "Absent";
    case "late":
      return "Late";
    case "paid":
      return "Paid";
    case "due":
      return "Due";
    case "overdue":
      return "Overdue";
  }
}

function labelForMood(mood: Mood): string {
  switch (mood) {
    case "happy":
      return "Happy";
    case "calm":
      return "Calm";
    case "tired":
      return "Tired";
    case "playful":
      return "Playful";
    case "thoughtful":
      return "Thoughtful";
  }
}

function initialsFromName(name: string): string {
  return name
    .replace(/^(Ms\.|Mrs\.|Mr\.|Dr\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

function formatBdt(amount: number): string {
  return `৳ ${amount.toLocaleString("en-IN")}`;
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatShortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function presentCount(records: ReadonlyArray<{ status: AttendanceStatus }>): number {
  return records.filter((r) => r.status === "present").length;
}

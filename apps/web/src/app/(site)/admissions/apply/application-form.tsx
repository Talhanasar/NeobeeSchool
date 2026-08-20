"use client";

import { useState, FormEvent } from "react";
import type { ReactNode } from "react";

// This form is not yet wired to a backend; the success state is local-only.

const classOptions = [
  "Baby Bees · ages 2–3",
  "Explorer Bees · ages 3–4",
  "Bumble Bees · ages 4–5",
  "Honey Bees · ages 5–6",
];

type FormErrors = Partial<Record<
  | "childName"
  | "childDob"
  | "childGender"
  | "childClass"
  | "childPreviousSchool"
  | "parentName"
  | "parentRelationship"
  | "parentPhone"
  | "parentEmail"
  | "parentAddress"
  | "medicalNotes",
  string
>>;

export function ApplicationForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      childName: String(data.get("childName") ?? "").trim(),
      childDob: String(data.get("childDob") ?? "").trim(),
      childGender: String(data.get("childGender") ?? "").trim(),
      childClass: String(data.get("childClass") ?? "").trim(),
      childPreviousSchool: String(data.get("childPreviousSchool") ?? "").trim(),
      parentName: String(data.get("parentName") ?? "").trim(),
      parentRelationship: String(data.get("parentRelationship") ?? "").trim(),
      parentPhone: String(data.get("parentPhone") ?? "").trim(),
      parentEmail: String(data.get("parentEmail") ?? "").trim(),
      parentAddress: String(data.get("parentAddress") ?? "").trim(),
      medicalNotes: String(data.get("medicalNotes") ?? "").trim(),
    };

    const nextErrors: FormErrors = {};

    if (values.childName.length < 2) nextErrors.childName = "Please enter your child's full name.";
    if (!values.childDob) nextErrors.childDob = "Please enter your child's date of birth.";
    if (!values.childGender) nextErrors.childGender = "Please select gender.";
    if (!values.childClass) nextErrors.childClass = "Please choose a class applying for.";
    if (values.childPreviousSchool.length > 200) nextErrors.childPreviousSchool = "Previous school name is too long (max 200 characters).";
    if (values.parentName.length < 2) nextErrors.parentName = "Please enter the parent or guardian's full name.";
    if (!values.parentRelationship) nextErrors.parentRelationship = "Please select your relationship to the child.";
    if (!/^[+\d][\d\s-]{7,}$/.test(values.parentPhone)) nextErrors.parentPhone = "Enter a valid phone number with at least 8 digits, e.g. +880 1X XXXX XXXX.";
    if (values.parentEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.parentEmail)) nextErrors.parentEmail = "Enter a valid email address, if you have one.";
    if (values.parentAddress.length > 500) nextErrors.parentAddress = "Address is too long (max 500 characters).";
    if (values.medicalNotes.length > 500) nextErrors.medicalNotes = "Medical notes are too long (max 500 characters).";

    setErrors(nextErrors);
    setSent(false);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      const el = form.querySelector<HTMLElement>(`[name="${firstError}"]`);
      el?.focus();
      return;
    }

    form.reset();
    setSent(true);
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="form-heading">
        <legend>
          <p className="eyebrow">Child&apos;s details</p>
          <h3>Tell us about your little learner</h3>
        </legend>
      </fieldset>

      <fieldset className="form-grid">
        <Field label="Full name" name="childName" error={errors.childName} required>
          <input id="childName" name="childName" autoComplete="given-name" placeholder="e.g. Fatima Ahmed" aria-describedby={errors.childName ? "childName-error" : undefined} aria-invalid={Boolean(errors.childName)} />
        </Field>
        <Field label="Date of birth" name="childDob" error={errors.childDob} required>
          <input id="childDob" name="childDob" type="date" aria-describedby={errors.childDob ? "childDob-error" : undefined} aria-invalid={Boolean(errors.childDob)} />
        </Field>
        <Field label="Gender" name="childGender" error={errors.childGender} required>
          <select id="childGender" name="childGender" defaultValue="" aria-describedby={errors.childGender ? "childGender-error" : undefined} aria-invalid={Boolean(errors.childGender)}>
            <option value="" disabled>Select</option>
            <option>Female</option>
            <option>Male</option>
            <option>Prefer not to say</option>
          </select>
        </Field>
        <Field label="Class applying for" name="childClass" error={errors.childClass} required>
          <select id="childClass" name="childClass" defaultValue="" aria-describedby={errors.childClass ? "childClass-error" : undefined} aria-invalid={Boolean(errors.childClass)}>
            <option value="" disabled>Select a class</option>
            {classOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Previous school" name="childPreviousSchool" error={errors.childPreviousSchool} optional>
          <input id="childPreviousSchool" name="childPreviousSchool" autoComplete="off" placeholder="If any" aria-describedby={errors.childPreviousSchool ? "childPreviousSchool-error" : undefined} aria-invalid={Boolean(errors.childPreviousSchool)} />
        </Field>
        <div />
      </fieldset>

      <fieldset className="form-grid">
        <legend>
          <p className="eyebrow">Parent or guardian</p>
          <h3>Who looks after your child</h3>
        </legend>
        <Field label="Full name" name="parentName" error={errors.parentName} required>
          <input id="parentName" name="parentName" autoComplete="name" placeholder="e.g. Mohammad Ali" aria-describedby={errors.parentName ? "parentName-error" : undefined} aria-invalid={Boolean(errors.parentName)} />
        </Field>
        <Field label="Relationship" name="parentRelationship" error={errors.parentRelationship} required>
          <select id="parentRelationship" name="parentRelationship" defaultValue="" aria-describedby={errors.parentRelationship ? "parentRelationship-error" : undefined} aria-invalid={Boolean(errors.parentRelationship)}>
            <option value="" disabled>Select</option>
            <option>Mother</option>
            <option>Father</option>
            <option>Guardian</option>
          </select>
        </Field>
        <Field label="Phone or WhatsApp" name="parentPhone" error={errors.parentPhone} required>
          <input id="parentPhone" name="parentPhone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+880 1X XXXX XXXX" aria-describedby={errors.parentPhone ? "parentPhone-error" : undefined} aria-invalid={Boolean(errors.parentPhone)} />
        </Field>
        <Field label="Email (optional)" name="parentEmail" error={errors.parentEmail} optional>
          <input id="parentEmail" name="parentEmail" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" aria-describedby={errors.parentEmail ? "parentEmail-error" : undefined} aria-invalid={Boolean(errors.parentEmail)} />
        </Field>
        <Field label="Home address" name="parentAddress" error={errors.parentAddress} optional>
          <textarea id="parentAddress" name="parentAddress" rows={3} placeholder="Street, area, city" aria-describedby={errors.parentAddress ? "parentAddress-error" : undefined} aria-invalid={Boolean(errors.parentAddress)} />
        </Field>
      </fieldset>

      <fieldset className="field">
        <legend>
          <p className="eyebrow">Anything else</p>
          <h3>Notes for the team</h3>
        </legend>
        <label htmlFor="medicalNotes">Allergies, medical notes, or anything the team should know</label>
        <textarea id="medicalNotes" name="medicalNotes" rows={4} placeholder="Write anything helpful here (optional)" aria-describedby={errors.medicalNotes ? "medicalNotes-error" : undefined} aria-invalid={Boolean(errors.medicalNotes)} />
        {errors.medicalNotes && (
          <p className="field-error" id="medicalNotes-error" role="alert">{errors.medicalNotes}</p>
        )}
      </fieldset>

      <button className="button button-primary form-submit" type="submit">Submit application</button>

      <p className={`form-success${sent ? " is-visible" : ""}`} aria-live="polite">
        Thank you — your application has been received locally. To confirm, please call or WhatsApp the team on <a href="tel:+8801347449472" style={{ color: "inherit", fontWeight: 800 }}>+88 013 4744 9472</a>.
      </p>
    </form>
  );
}

function Field({ label, name, error, required, optional, children }: Readonly<{ label: string; name: string; error?: string; required?: boolean; optional?: boolean; children: ReactNode }>) {
  const id = name;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}{optional && <span aria-hidden="true">(optional)</span>}
      </label>
      {children}
      {error && <p className="field-error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}
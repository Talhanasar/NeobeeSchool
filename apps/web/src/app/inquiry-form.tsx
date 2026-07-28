"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

type FormErrors = Partial<Record<"parentName" | "phone" | "childName" | "classLevel", string>>;

export function InquiryForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      parentName: String(data.get("parentName") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      childName: String(data.get("childName") ?? "").trim(),
      classLevel: String(data.get("classLevel") ?? "").trim(),
    };
    const nextErrors: FormErrors = {};

    if (values.parentName.length < 2) nextErrors.parentName = "Please enter the parent or guardian’s name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(values.phone)) nextErrors.phone = "Enter a valid phone number with at least 8 digits.";
    if (values.childName.length < 2) nextErrors.childName = "Please enter your child’s name.";
    if (!values.classLevel) nextErrors.classLevel = "Please choose a class level.";

    setErrors(nextErrors);
    setSent(false);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    form.reset();
    setSent(true);
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <p className="eyebrow">Admission inquiry</p>
        <h3>Tell us about your little learner</h3>
        <p>Demo form only — nothing is sent or stored.</p>
      </div>
      <div className="form-grid">
        <Field label="Parent or guardian’s name" name="parentName" error={errors.parentName}>
          <input id="parentName" name="parentName" autoComplete="name" aria-describedby={errors.parentName ? "parentName-error" : undefined} aria-invalid={Boolean(errors.parentName)} />
        </Field>
        <Field label="Phone or WhatsApp" name="phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+880 1X XXXX XXXX" aria-describedby={errors.phone ? "phone-error" : undefined} aria-invalid={Boolean(errors.phone)} />
        </Field>
        <Field label="Child’s name" name="childName" error={errors.childName}>
          <input id="childName" name="childName" autoComplete="off" aria-describedby={errors.childName ? "childName-error" : undefined} aria-invalid={Boolean(errors.childName)} />
        </Field>
        <Field label="Class by age" name="classLevel" error={errors.classLevel}>
          <select id="classLevel" name="classLevel" defaultValue="" aria-describedby={errors.classLevel ? "classLevel-error" : undefined} aria-invalid={Boolean(errors.classLevel)}>
            <option value="" disabled>Select a class</option>
            <option>Baby Bees · ages 2–3</option>
            <option>Explorer Bees · ages 3–4</option>
            <option>Bumble Bees · ages 4–5</option>
            <option>Honey Bees · ages 5–6</option>
          </select>
        </Field>
      </div>
      <div className="field">
        <label htmlFor="message">Questions <span>(optional)</span></label>
        <textarea id="message" name="message" rows={4} placeholder="Ask about visits, classes, fees, or settling in." />
      </div>
      <button className="button button-primary form-submit" type="submit">Send demo inquiry</button>
      <p className={`form-success${sent ? " is-visible" : ""}`} aria-live="polite">
        Thank you — your demo inquiry was validated locally. No information was sent or saved.
      </p>
    </form>
  );
}

function Field({ label, name, error, children }: Readonly<{ label: string; name: string; error?: string; children: ReactNode }>) {
  return (
    <div className="field">
      <label htmlFor={name}>{label} <span aria-hidden="true">*</span></label>
      {children}
      {error ? <p className="field-error" id={`${name}-error`} role="alert">{error}</p> : null}
    </div>
  );
}

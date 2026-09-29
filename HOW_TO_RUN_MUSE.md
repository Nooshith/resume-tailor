# How to Run This on Meta Muse

Everything in this repo is done through **Meta Muse** — no other runner needed.
Muse reads the JD, rewrites your resume content, rebuilds the DOCX, converts
to PDF, verifies the layout, and (in apply mode) submits applications.

## 1. You install nothing

There is nothing to install on your machine — no Node, no Python, no
LibreOffice, no fonts. **Muse runs everything** in its own environment and
sets up the pinned dependencies itself (`docx@8.5.0`, `pymupdf`, `pypdf`)
the first time it builds.

## 2. Bring this repo into Muse

Clone it or upload the folder into Muse — whichever your Muse surface
supports. No setup commands needed.

## 3. Open it in Muse and onboard

Open the `resume-tailor` folder in Muse (app, web, or any Muse chat surface
that can run commands), then paste:

> I just cloned resume-tailor. Onboard me: ask for my base resume, extract
> all my roles, skills, employers, and dates from it, then ask where my
> Google Drive job_resumes folder is and remember it.

Muse asks for your base resume, extracts every role from it, and asks where
your Google Drive folder is. That Drive path becomes `OUT_BASE` — everything
from then on is filed there, never on local disk, never in this repo.

## 4. Tailor for one job

> Tailor my resume to this JD and keep the layout identical — return DOCX +
> PDF: <paste the JD link or full JD text>

Muse will: read the JD, rewrite subtitle/summary/skills/bullets under
honesty rules (never inventing tools, metrics, dates, titles, or employers),
run an ATS review pass and a hiring-manager review pass, build with
`node build_resume.js`, convert with `soffice --headless --convert-to pdf`,
and verify with `python3 compare_layout.py ORIGINAL.pdf <new pdf>` until it
prints MATCH — trimming words (never layout numbers) if sections run long.

Then Muse reports JD coverage %, honestly omitted items, and claims you
should be ready to defend in an interview.

## 5. Auto-apply mode (up to 50–75 jobs/day)

> Run today's apply batch: find fresh jobs matching my extracted roles,
> tailor and apply, max 60 applications, and report what was submitted.

- **First 2 applications:** Muse asks your approval twice each — once for the
  tailored resume, once for the filled application before submitting.
- **3rd application onward:** full autopilot, no approvals.
- **Cap:** 50–75 applications per day (each one is token-heavy: JD reading,
  multi-draft tailoring, two review passes, build, verify, form fill).
- **Records:** every application saves PDF + DOCX + JD + every
  question/answer to
  `<Drive>/job_resumes/<Company>/<YYYY-MM-DD>_<Role>/`.

## 6. How it works

```
JD (URL/text)
  -> Muse: content rewrite (subtitle/summary/skills/bullets, honesty rules)
  -> Muse: ATS recruiter review -> hiring-manager review
  -> build_resume.js (fixed layout: Letter, 0.22"/0.6" margins, Carlito,
       navy 1F3864 — Muse edits content strings only, never sizes/spacing)
  -> <First>_<Last>_Resume.docx (auto-filed in Google Drive)
  -> LibreOffice (soffice --headless --convert-to pdf)
  -> compare_layout.py vs your original PDF: MATCH = identical spacing, 1 page
```

**Content and layout are separated.** `Resume_Section_Spec.md` governs *what*
to write (8 fixed sections, bullet template, ban list: no em dashes, no
buzzwords like leverage/seamless/robust, plain hyphens only).
`build_resume.js` governs *how it looks*.

**Honesty gate.** Role titles, employers, dates, metrics, and skills must be
real and defensible. Anything in the JD without real backing is reported as
omitted, not added. Disputed numbers are stripped, never shipped.

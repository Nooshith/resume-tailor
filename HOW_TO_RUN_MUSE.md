# How to Run This on Meta Muse

Everything in this repo runs through **Meta Muse** — no installs, no setup
commands, no other runner. You bring the repo into Muse, paste **one
prompt**, and Muse runs the whole pipeline: resume intake, role extraction,
job matching, tailored resumes, and applications.

## The single prompt

1. Get Muse at [muse.ai](https://muse.ai) — iPhone (App Store), Android
   (Google Play), the Mac app, or the web app, which works on any OS
   including Windows.
2. Load this repo into Muse — clone it or upload the folder, whichever your
   Muse surface supports (`git clone
   https://github.com/forgephantom/applyforge.git`). Muse reads every file,
   beginning to end: the pipeline spec, the content rules, the layout
   engine, and this guide.
3. Paste this one prompt:

> I just loaded the applyforge repo — all files, beginning to end. Run the
> full pipeline. First, onboard me: ask for my base resume, extract every
> role from it (titles, employers, dates, skills), and ask where my Google
> Drive job_resumes folder is — remember it as OUT_BASE. Then find jobs
> matching my roles that were posted between 60 minutes and 7 days ago.
> Before building a packet for a company, check its H-1B history
> (h1bdata.info or the USCIS H-1B Employer Data Hub) and prioritize proven
> sponsors; skip companies with no H-1B history and no sponsorship signal
> when better options exist. Search LinkedIn first, then other job sites.
> Apply to up to 60 per day. For my first 2 applications, show me the tailored resume and the filled application for
> approval before submitting; from the 3rd application on, run on full
> autopilot. Never invent employers, titles, dates, metrics, tools, salary,
> or work-authorization facts — report anything unverifiable as omitted,
> never added. Save to Drive ONLY the jobs actually applied to — each as a
> packet (PDF + DOCX + JD + every question with its answer) under
> <OUT_BASE>/<Company>/<YYYY-MM-DD>_<Role-Slug>/ — and remove anything
> prepared but not submitted.

That's it. Muse handles dependency setup (`docx@8.5.0`, `pymupdf`,
`pypdf`), the pinned toolchain, PDF conversion, and layout verification
on its own.

## What the prompt kicks off

- **Onboarding (first run only).** Muse asks for your base resume, extracts
  all roles/skills/employers/dates, and records your Drive folder. Your
  personal data lives in Drive and in the session — never in this repo.
- **Per job.** Muse reads the JD, rewrites title/summary/skills/bullets
  under honesty rules, runs the **six-reviewer loop** (ATS recruiter,
  hiring manager, peer engineer, executive skim, HR red-flag screen,
  AI-voice detector — see `skills/jd-resume-review-loop/SKILL.md`),
  requires a **unanimous interview vote** at a **10/10 bar**, builds with
  `node build_resume.js`, converts with
  `soffice --headless --convert-to pdf`, and verifies with
  `python3 compare_layout.py ORIGINAL.pdf <new pdf>` until it prints MATCH —
  trimming words (never layout numbers) if sections run long.
- **Apply + record.** Muse fills the application from your verified facts,
  submits (after your approval for the first 2), and files the full packet
  to Drive — only for jobs actually applied to; anything prepared but not
  submitted is removed.
- **Daily report.** Roles submitted, JD coverage %, honestly omitted items,
  and every claim you should be ready to defend in an interview.

## The standing rules Muse follows

- **Job sourcing:** only jobs posted between 60 minutes and 7 days ago.
  **Sponsorship check before every application:** look up the company's H-1B
  history (h1bdata.info / USCIS H-1B Employer Data Hub) and prioritize
  proven sponsors; skip companies with no H-1B history and no sponsorship
  signal when better options exist. Work-authorization answers stay exactly
  as they are — nothing gets misrepresented. Search LinkedIn first,
  then other job sites.
- **First 2 applications:** approval twice each — once for the tailored
  resume, once for the filled application before submit.
- **3rd application onward:** full autopilot, no approvals.
- **Cap:** 50–75 applications per day (each one is token-heavy: JD reading,
  multi-draft tailoring, six review passes + interview vote, build, verify,
  form fill).
- **Honesty gate:** role titles, employers, dates, metrics, and skills must
  be real and defensible. Disputed numbers are stripped, never shipped.
- **Drive, not local disk:** nothing personal is written to local disk or
  to this repository. Only jobs actually applied to are saved to Drive —
  anything prepared but not submitted is removed.

## How it works (technical)

```
Base resume (uploaded once, kept private)
  -> extracted profile: roles, employers, dates, skills
  -> job search matched to those roles
  -> per job: JD -> content rewrite (honesty rules, no fabrication)
            -> ATS review -> hiring-manager review
            -> build_resume.js (fixed layout: Letter, 0.22"/0.6" margins,
               Carlito, navy 1F3864 — content strings only, never sizes)
            -> <First>_<Last>_Resume.docx (auto-filed in Google Drive)
            -> LibreOffice (soffice --headless --convert-to pdf)
            -> <First>_<Last>_Resume.pdf (the upload)
            -> compare_layout.py vs your original PDF: MATCH = identical
               spacing, exactly 1 page
            -> application submitted -> packet saved to Drive
```

**Content and layout are separated.** `Resume_Section_Spec.md` governs *what*
to write (8 fixed sections, bullet template, ban list: plain hyphens only,
no em dashes, no buzzwords like leverage/seamless/robust).
`build_resume.js` governs *how it looks*. Muse edits strings, never sizes
or spacing.

# ApplyForge (Meta Muse edition)

![one prompt](https://img.shields.io/badge/run-one%20prompt-blue)
![auto-apply](https://img.shields.io/badge/auto--apply-up%20to%2075%2Fday-green)
![runs on Muse](https://img.shields.io/badge/runs%20on-Meta%20Muse-purple)
![no installs](https://img.shields.io/badge/installs-none-orange)

**AI job-application autopilot.** Upload your base resume once — Muse
extracts your roles, finds matching jobs, and for every job runs your
resume through a **six-reviewer quality loop** (ATS recruiter, hiring
manager, peer engineer, executive skim, HR red-flag screen, AI-voice
detector) plus a final **interview vote** — then applies. Up to **50–75
applications per day**, on autopilot from the 3rd application. Your files
live in **Google Drive**, never on local disk, and this repo never holds
your personal data.

> **One prompt runs everything.** Load this repo into Muse (it reads every
> file, beginning to end), paste the single prompt in §1, and Muse runs the
> whole pipeline — onboarding, role extraction, job matching, tailored
> resumes, applications — with no further setup.

> **Privacy by design:** this repo ships a blank template only. Your name,
> contact, employers, and metrics live in env vars and your Google Drive —
> never in this repository. Never list tools, metrics, dates, titles, or
> employers you cannot defend in an interview.

---

## 1. The pipeline (what happens)

```
You clone the repo into Muse
  -> Muse asks you to upload your base resume (first run only)
  -> Muse extracts every role from it: titles, employers, dates, skills
  -> Muse searches jobs matching those roles: posted 60 min – 7 days ago,
     visa-sponsoring roles first, LinkedIn first then other sites
  -> For each job, per day (cap: 50-75):
       read JD -> Draft 1 -> Review A (ATS recruiter) -> Draft 2
       -> Review B (hiring manager) -> Draft 3
       -> Review C (peer engineer) -> Review D (executive 6-second skim)
       -> Review E (HR red-flag screen) -> Review F (AI-voice detector)
       -> unanimous interview vote (all six reviewers)
       -> build DOCX -> PDF -> layout MATCH check (exactly 1 page)
       -> fill application -> submit
       -> save resume + JD + application record to Google Drive
          (ONLY for jobs actually applied to; the rest is removed)
```

### The single prompt (runs everything)

After loading this repo into Muse, paste this one prompt — it covers
onboarding, role extraction, and the apply loop:

> I just loaded the applyforge repo — all files, beginning to end. Run the
> full pipeline. First, onboard me: ask for my base resume, extract every
> role from it (titles, employers, dates, skills), and ask where my Google
> Drive job_resumes folder is — remember it as OUT_BASE. Then find jobs
> matching my roles that were posted between 60 minutes and 7 days ago,
> prioritizing roles that offer visa sponsorship (H-1B). Search LinkedIn
> first, then other job sites. Apply to up to 60 per day. For my first 2
> applications, show me the tailored resume and the filled application for
> approval before submitting; from the 3rd application on, run on full
> autopilot. Never invent employers, titles, dates, metrics, tools, salary,
> or work-authorization facts — report anything unverifiable as omitted,
> never added. Save to Drive ONLY the jobs actually applied to — each as a
> packet (PDF + DOCX + JD + every question with its answer) under
> <OUT_BASE>/<Company>/<YYYY-MM-DD>_<Role-Slug>/ — and remove anything
> prepared but not submitted.

### First-run onboarding

On the first run, Muse asks you to **upload your base resume**. From it,
Muse extracts:

- every role: title, employer, start/end dates
- skills and tools per role
- education, certifications, contact details

Muse also asks **where your Google Drive folder is** (e.g. your Drive's
`job_resumes` folder). That path becomes `OUT_BASE` — every application from
then on is filed there. Nothing personal is written to local disk or to this
repo.

### Approval gates (first 2 only)

For your **first 2 applications**, Muse stops and asks for approval twice:

1. **Resume approval** — Muse shows the tailored resume; you approve or ask
   for changes.
2. **Submission approval** — Muse shows the filled application (every field);
   you approve before it submits.

From the **3rd application onward, no approvals** — Muse tailors, verifies,
and submits on its own. (Muse still never invents employers, titles, dates,
metrics, tools, salary, or work-authorization facts, and still strips any
number it cannot verify.)

### Daily cap: 50–75 applications

Each application is token-expensive: JD reading, multi-draft tailoring, two
review passes, PDF build, layout verification, and form filling. Capping at
**50–75 per day** keeps token usage sustainable while still running a serious
volume. The single prompt above already includes the daily batch (`up to 60
per day`) — adjust the number in the prompt any time.

### Google Drive, not local disk

Only jobs you actually applied to are filed in Drive — anything prepared
but not submitted is removed, never kept:

```
<Your Drive>/job_resumes/<Company>/<YYYY-MM-DD>_<Role-Slug>/
  <First>_<Last>_Resume.pdf     (the file actually uploaded)
  <First>_<Last>_Resume.docx    (spare copy)
  JD.md                         (the job description as posted)
  APPLICATION_FORM.md           (every question + the submitted answer)
```

Control the root with `OUT_BASE` (set during onboarding):

```bash
OUT_BASE="/path/to/your/Google Drive/job_resumes" \
APPLICANT_NAME="Jane Doe" COMPANY=Acme ROLE_SLUG=Backend-Engineer \
node build_resume.js
```

| Env var | Default | Purpose |
|---|---|---|
| `APPLICANT_NAME` | `YOUR FULL NAME` | Identity + filename base (`First_Last_Resume`) |
| `COMPANY` | `ExampleCorp` | Company folder |
| `ROLE_SLUG` | `Example-Role` | Role folder suffix (keep filesystem-safe) |
| `RUN_DATE` | today (`YYYY-MM-DD`) | Date folder prefix |
| `OUT_BASE` | Google Drive `job_resumes` if a Drive mount is found, else `~/Desktop/job_resumes` | Root — set this to your Drive folder during onboarding |

---

## 2. You install nothing

There is nothing to install on your machine — no Node, no Python, no
LibreOffice, no fonts. **Muse runs everything** in its own environment:
dependency setup, resume builds, PDF conversion, and layout verification.

All you do:

1. Get the Muse app at [muse.ai](https://muse.ai) — iPhone (App Store),
   Android (Google Play), the Mac app, or the web app, which works on any OS
   including Windows.
2. Bring this repo into Muse so it can read every file, beginning to end.
   Pick whichever your Muse surface supports:

   **Clone it** (recommended — keeps you on the latest release):
   ```bash
   git clone https://github.com/forgephantom/applyforge.git
   ```
   Then point Muse at the cloned folder (upload it, attach it, or open the
   folder in the desktop app).

   **Or download the ZIP:** open
   [github.com/forgephantom/applyforge](https://github.com/forgephantom/applyforge),
   click **Code → Download ZIP**, unzip it, and give the folder to Muse.

   **Or grab a release:** tagged versions with changelogs live under
   [Releases](https://github.com/forgephantom/applyforge/releases) —
   download the source ZIP for the version you want.
3. Paste the single prompt from §1.

Muse handles the rest, including installing the pinned dependencies
(`docx@8.5.0`, `pymupdf`, `pypdf`) the first time it builds, and verifying
the sample template renders exactly 1 page before your first real run.

---

## 3. Per-application quality loop (runs automatically)

Every single application goes through this — including the auto-approved ones.
The bar is **10/10 from every reviewer**; any score below 10 sends the draft
back for another pass (max 3 full rounds), and nothing ships until **all six
reviewers vote "interview"**:

1. **Reads the JD** — must-have skills, nice-to-haves, exact keywords,
   seniority, top responsibilities.
2. **Draft 1** — rewrites the title line (`<JD role> • <lane descriptor>`),
   summary, skills, and bullets against the JD using your real history
   (maximum honest keyword match). The summary's first line states your
   years, lane identity, and strongest attested scale or outcome.
3. **Review A — ATS recruiter.** Scores keyword coverage must-have by
   must-have, scannability, parsing risks. Fixes the gaps.
4. **Review B — hiring manager.** Scores credibility and impact. Hard
   **impact gate**: every bullet must carry ownership, scale, or a
   measurable outcome — duty-only bullets fail, no matter how well they
   match keywords.
5. **Review C — peer engineer.** Would the tooling and scale claims survive
   a technical screen? Catches misused terms and fluff an engineer would
   spot.
6. **Review D — executive skim.** The 6-second test: title + summary + first
   two bullets must say who you are and why you're strong instantly.
7. **Review E — HR red-flag screen.** Timeline gaps, title-scope
   consistency, level fit, verification risk.
8. **Review F — AI-voice detector.** Scans the banned-word list and AI
   phrasings (em dashes, "not only/but also", triple parallelisms,
   "furthermore", uniform bullet rhythm, hedged claims like "helped with")
   and rewrites anything that reads machine-generated.
9. **Interview vote.** All six reviewers vote "interview" or "no
   interview" with a one-line reason. Any "no" triggers a targeted
   revision and a re-vote. Dissent after 3 rounds is shown to you with the
   reason.
10. **Build + verify** — writes the `.docx`, converts to PDF with
    LibreOffice, runs `compare_layout.py` against your original PDF. If
    section headers shifted or it spilled to 2 pages, Muse trims words and
    rebuilds until **MATCH** (identical spacing, exactly 1 page).
11. **Apply + record** — fills the application from your verified facts,
    submits (after approval for the first 2), and saves the full packet
    (PDF + DOCX + JD + every question/answer) to your Drive folder — only
    for jobs actually applied to; anything prepared but not submitted is
    removed.

After a batch, Muse reports: all six scores before/after, the interview
vote, top 3 changes, JD coverage %, anything omitted, and every claim
you'd need to defend in an interview.

---

## 4. How it works (technical)

```
Base resume (uploaded once, kept private)
  -> extracted profile: roles, employers, dates, skills
  -> job search matched to those roles
  -> per job: JD -> content rewrite (honesty rules, no fabrication)
            -> six-reviewer loop: ATS -> hiring manager -> peer engineer
               -> executive skim -> HR red flags -> AI-voice detector
            -> unanimous interview vote (10/10 bar per reviewer)
            -> build_resume.js (docx lib: constants S_NAME..S_SK,
               helpers name/subtitle/contact/section/summary/skill/
               jobline/role/bullet/certline/eduline,
               Letter page, 0.22"/0.6" margins, Carlito, navy 1F3864)
            -> <First>_<Last>_Resume.docx (filed in Google Drive)
            -> LibreOffice (soffice --headless --convert-to pdf)
            -> <First>_<Last>_Resume.pdf (the upload)
            -> compare_layout.py (PyMuPDF: section header Y-positions +
               line counts vs the original; MATCH = identical spacing, 1 page)
            -> application submitted -> packet saved to Drive
```

Why it is built this way:

- **Content and layout are separated.** `Resume_Section_Spec.md` governs
  *what* to write (8 fixed sections, bullet template, ban list: plain hyphens
  only, no em dashes, no buzzwords like leverage/seamless/robust).
  `build_resume.js` governs *how it looks*. Muse edits strings, never
  sizes or spacing.
- **Rewritten text reflows lines**, so a longer bullet pushes every section
  below it down. `compare_layout.py` catches this numerically (header heights
  in points + lines per section) and Muse trims words until MATCH.
- **Pinned toolchain matters:** `docx@8.5.0` (v9 renders spacing differently),
  real Carlito font (substitutes shift line wraps), LibreOffice conversion.
- **Honesty gate:** role titles, employers, dates, metrics, and skills must be
  real and defensible. Anything in the JD without real backing is reported as
  omitted, not added. Disputed numbers are stripped, never shipped.
- **The repo stays data-free:** your resume, tailored outputs, and
  application records live in Google Drive. Cloning this repo gives a new
  user the pipeline, not your data.

---

## 5. Files

| File | What it is |
|---|---|
| `build_resume.js` | Layout engine + sample content. Edit strings only; your real data comes from env vars or your private copy. |
| `skills/jd-resume-review-loop/SKILL.md` | The six-reviewer quality loop skill: the full review sequence, scoring rules, interview vote, and style bans. Load it into Muse (or any agent) to run the loop. |
| `Resume_Section_Spec.md` | Content rules: sections, bullet template, honesty/ban rules. |
| `compare_layout.py` | Layout verifier: `python3 compare_layout.py ORIG.pdf NEW.pdf`. |
| `HOW_TO_RUN_MUSE.md` | Single-prompt quick guide: load the repo, paste one prompt, Muse runs everything. No installs. |
| `package.json` / `requirements.txt` | Pinned deps. |

## 6. Troubleshooting

Everything below is Muse's job to fix — just describe the symptom in chat.

- **PDF is 2 pages:** tailored text ran long. Ask Muse to shorten
  summary/bullets a few words (keep metrics + tool names) and rebuild. Never
  shrink fonts/margins.
- **Wraps differ from the original:** wrong font or wrong docx version in
  Muse's environment — ask Muse to reinstall the pinned deps (`docx@8.5.0`,
  Carlito) and rebuild.
- **Verification never reaches MATCH:** Muse is editing layout numbers
  instead of trimming words — remind it: content strings only, constants
  untouched.
- **Drive folder not found:** re-run onboarding and give the exact Drive path;
  it becomes `OUT_BASE` for every later run.

## 7. Found an issue?

Open an [issue](https://github.com/forgephantom/applyforge/issues) — reported
problems are triaged and fixed automatically, no waiting on a maintainer.

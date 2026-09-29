# ApplyForge (Meta Muse edition)

Upload your base resume once — Muse extracts your roles, finds matching jobs,
tailors a 1-page resume per job, and applies. Up to **50–75 applications per
day**. Your files live in **Google Drive**, never on local disk, and this repo
never holds your personal data.

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
  -> Muse searches jobs matching those roles
  -> For each job, per day (cap: 50-75):
       read JD -> tailor resume (Draft 1 -> ATS review -> hiring-manager review)
       -> build DOCX -> PDF -> layout MATCH check (exactly 1 page)
       -> fill application -> submit
       -> save resume + JD + application record to Google Drive
```

### The single prompt (runs everything)

After loading this repo into Muse, paste this one prompt — it covers
onboarding, role extraction, and the apply loop:

> I just loaded the applyforge repo — all files, beginning to end. Run the
> full pipeline. First, onboard me: ask for my base resume, extract every
> role from it (titles, employers, dates, skills), and ask where my Google
> Drive job_resumes folder is — remember it as OUT_BASE. Then find fresh
> jobs matching my roles and apply, up to 60 per day. For my first 2
> applications, show me the tailored resume and the filled application for
> approval before submitting; from the 3rd application on, run on full
> autopilot. Never invent employers, titles, dates, metrics, tools, salary,
> or work-authorization facts — report anything unverifiable as omitted,
> never added. Save every application packet (PDF + DOCX + JD +
> every question with its answer) under
> <OUT_BASE>/<Company>/<YYYY-MM-DD>_<Role-Slug>/.

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

Every application is filed in Drive, never locally:

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
2. Bring this repo into Muse — clone it or upload the folder:

   `git clone https://github.com/forgephantom/applyforge.git`
3. Paste the single prompt from §1.

Muse handles the rest, including installing the pinned dependencies
(`docx@8.5.0`, `pymupdf`, `pypdf`) the first time it builds, and verifying
the sample template renders exactly 1 page before your first real run.

---

## 3. Per-application quality loop (runs automatically)

Every single application goes through this — including the auto-approved ones:

1. **Reads the JD** — must-have skills, nice-to-haves, exact keywords,
   seniority, top responsibilities.
2. **Draft 1** — rewrites subtitle, summary, skills, and bullets against the
   JD using your real history (maximum honest keyword match).
3. **ATS recruiter review** — scores Draft 1 like an ATS + a 6-second skim:
   keyword coverage, title match, scannability. Fixes the gaps.
4. **Hiring-manager review** — scores for impact and specificity, trims fluff
   and buzzwords.
5. **Build + verify** — writes the `.docx`, converts to PDF with LibreOffice,
   runs `compare_layout.py` against your original PDF. If section headers
   shifted or it spilled to 2 pages, Muse trims words and rebuilds until
   **MATCH** (identical spacing, exactly 1 page).
6. **Apply + record** — fills the application from your verified facts,
   submits (after approval for the first 2), and saves the full packet
   (PDF + DOCX + JD + every question/answer) to your Drive folder.

After a batch, Muse reports: roles submitted, JD coverage %, anything
omitted, and every claim you'd need to defend in an interview.

---

## 4. How it works (technical)

```
Base resume (uploaded once, kept private)
  -> extracted profile: roles, employers, dates, skills
  -> job search matched to those roles
  -> per job: JD -> content rewrite (honesty rules, no fabrication)
            -> ATS review -> hiring-manager review
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

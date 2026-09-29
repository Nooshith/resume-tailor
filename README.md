# Resume Tailor (Meta Muse edition)

Turn a job description into a tailored, **1-page** resume that keeps your exact
layout — same fonts, colors, alignment, bullets, and section spacing. This
repo is the toolbox; **Meta Muse** is the agent that runs it.

> **Privacy by design:** this repo ships a blank template only. Your name,
> contact, employers, and metrics live in env vars or your private copy of
> `build_resume.js` — never in this repository. Fill in your own real history.
> Never list tools, metrics, dates, titles, or employers you cannot defend in
> an interview.

---

## 1. Prerequisites

Four things, on any OS (macOS, Windows, Linux):

| Tool | macOS | Windows | Linux (Ubuntu/Debian) |
|---|---|---|---|
| Node.js 18+ | `brew install node` | `winget install OpenJS.NodeJS.LTS` | `sudo apt install nodejs npm` |
| Python 3.9+ | preinstalled or `brew install python` | `winget install Python.Python.3.12` | `sudo apt install python3 python3-pip` |
| LibreOffice (`soffice`, DOCX → PDF) | `brew install --cask libreoffice` | `winget install TheDocumentFoundation.LibreOffice` | `sudo apt install libreoffice-writer` |
| Carlito font (the resume's exact font) | `brew install --cask font-carlito` | download `ofl/carlito/` from github.com/google/fonts, install each `.ttf` | `sudo apt install fonts-crosextra-carlito` |
| Git | preinstalled | `winget install Git.Git` | `sudo apt install git` |

Check your setup:

```bash
git clone https://github.com/forgephantom/resume-tailor.git
cd resume-tailor
npm install                  # docx@8.5.0, PINNED — v9 renders spacing differently
pip install -r requirements.txt   # pymupdf + pypdf (layout verification)
node --version && python3 --version && soffice --version
```

Sanity check (no AI needed) — builds the sample template, must be 1 page:

```bash
node build_resume.js
```

Windows note: `soffice.exe` lives in `C:\Program Files\LibreOffice\program\`.
If it is not on PATH, use the full path in the PDF step below.

---

## 2. The Meta Muse workflow

You don't edit layout code by hand. You give Muse the JD; Muse does the
tailoring, the rebuilds, and the verification loop.

### Start a session

Open this folder in Muse (Muse app, web, or any Muse chat surface that can
run commands), then paste a prompt like:

> Tailor my resume to this JD and keep the layout identical — return DOCX +
> PDF: <paste the JD link or full JD text>
>
> Rules: read build_resume.js, Resume_Section_Spec.md, and the JD first.
> Rewrite ONLY the subtitle, summary, skills items, and experience bullets —
> never my job titles, employers, dates, or metrics. Never invent tools,
> metrics, dates, titles, or employers; flag JD requirements I cannot honestly
> cover instead of adding them. Keep every layout constant and helper
> untouched. File the run with COMPANY/ROLE_SLUG env vars, build with
> `node build_resume.js`, convert with `soffice --headless --convert-to pdf`,
> and verify with `python3 compare_layout.py ORIGINAL.pdf <new pdf>` until it
> reports MATCH — trim words (never layout numbers) if sections run long.
> Then report JD coverage %, anything omitted, and every claim I'd need to
> defend in an interview.

### What Muse does with that prompt

1. **Reads the JD** — must-have skills, nice-to-haves, exact keywords,
   seniority, top responsibilities.
2. **Draft 1** — rewrites subtitle, summary, skills, and bullets against the
   JD using your real history (maximum honest keyword match; your
   user-attested experience may be surfaced even if it wasn't on the base
   resume).
3. **ATS recruiter review** — scores Draft 1 like an ATS + a 6-second resume
   skim: keyword coverage, title match, scannability. Fixes the gaps.
4. **Hiring-manager review** — scores the result like the hiring manager:
   impact, specificity, no fluff. Trims buzzwords and weak bullets.
5. **Build + verify** — writes the `.docx`, converts to PDF with LibreOffice,
   runs `compare_layout.py` against your original PDF. If section headers
   shifted or it spilled to 2 pages, Muse trims words and rebuilds until
   **MATCH** (identical spacing, exactly 1 page).
6. **Report** — shows review scores before/after, the top changes, JD coverage
   %, omitted items, and a "confirm before applying" list of anything added
   beyond the base resume.

### First-time setup (one session)

In your first session, paste your current resume text (or keep a private
`ORIGINAL.pdf` as the `compare_layout.py` baseline) and tell Muse to put your
real content into `build_resume.js`, replacing the sample strings. From then
on, every role gets its own run via env vars — the template in this repo
never holds your data:

```bash
APPLICANT_NAME="Jane Doe" COMPANY=Acme ROLE_SLUG=Backend-Engineer node build_resume.js
# -> ~/Desktop/job_resumes/Acme/2026-09-26_Backend-Engineer/Jane_Doe_Resume.docx
soffice --headless --convert-to pdf ~/Desktop/job_resumes/Acme/*/*.docx
```

| Env var | Default | Purpose |
|---|---|---|
| `APPLICANT_NAME` | `YOUR FULL NAME` | Identity + filename base (`First_Last_Resume`) |
| `COMPANY` | `ExampleCorp` | Company folder |
| `ROLE_SLUG` | `Example-Role` | Role folder suffix (keep filesystem-safe) |
| `RUN_DATE` | today (`YYYY-MM-DD`) | Date folder prefix |
| `OUT_BASE` | `~/Desktop/job_resumes` | Root (point elsewhere on Windows) |

---

## 3. How it works

```
JD (URL / pasted text)
  -> Muse: content rewrite (summary/skills/bullets, honesty rules, no fabrication)
  -> Muse: ATS review -> hiring-manager review (two scoring passes)
  -> build_resume.js (docx lib: constants S_NAME..S_SK, helpers name/subtitle/
       contact/section/summary/skill/jobline/role/bullet/certline/eduline,
       Letter page, 0.22"/0.6" margins, Carlito, navy 1F3864)
  -> <First>_<Last>_Resume.docx (auto-filed under ~/Desktop/job_resumes/...)
  -> LibreOffice (soffice --headless --convert-to pdf)
  -> <First>_<Last>_Resume.pdf
  -> compare_layout.py (PyMuPDF: every section header Y-position + line count
       vs the original PDF; MATCH = identical spacing, still 1 page)
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

---

## 4. Files

| File | What it is |
|---|---|
| `build_resume.js` | Layout engine + sample content. Edit strings only; your real data comes from env vars or your private copy. |
| `Resume_Section_Spec.md` | Content rules: sections, bullet template, honesty/ban rules. |
| `compare_layout.py` | Layout verifier: `python3 compare_layout.py ORIG.pdf NEW.pdf`. |
| `HOW_TO_RUN_OPENCODE.md` | Alternate quick guide for OpenCode users. |
| `package.json` / `requirements.txt` | Pinned deps. |

## 5. Troubleshooting

- **`soffice` not found (Windows):** use the full path to `soffice.exe`
  (section 1).
- **PDF is 2 pages:** tailored text ran long. Ask Muse to shorten
  summary/bullets a few words (keep metrics + tool names) and rebuild. Never
  shrink fonts/margins.
- **Wraps differ from the original:** wrong font (install Carlito, section 1)
  or wrong docx version (`npm install` must resolve 8.5.0 — check
  `npm list docx`).
- **LibreOffice replaces fonts:** clear the font cache (`fc-cache -f` on
  macOS/Linux) after installing Carlito, then reconvert.
- **Verification never reaches MATCH:** the model is editing layout numbers
  instead of trimming words — remind it: content strings only, constants
  untouched.

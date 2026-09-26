# How to Run This on OpenCode

## 1. Install OpenCode

```bash
# macOS / Linux
curl -fsSL https://opencode.ai/install | bash
# then: opencode --version
```

You need an OpenCode account / API access for the model you pick (see below).

## 2. Get this repo

```bash
git clone https://github.com/forgephantom/resume-tailor.git
cd resume-tailor
```

## 3. Install the tools the agent will use

```bash
npm install                  # docx@8.5.0 (pinned - layout was calibrated on v8)
pip install -r requirements.txt   # pymupdf + pypdf for layout verification
brew install --cask libreoffice   # DOCX -> PDF conversion (soffice)
brew install --cask font-carlito  # exact resume font (macOS; Ubuntu ships it)
```

Check: `node --version` (18+), `soffice --version`, and Carlito present.

## 4. Open it in OpenCode and pick a model

```bash
cd resume-tailor
opencode
```

**Which model to use:** this project was built and tested end-to-end with
**Muse Spark** (the `muse-spark` model family in OpenCode). Use it - it handled
the whole loop: reading the JD, rewriting content under honesty rules, editing
`build_resume.js`, building, converting, and measuring layout to a match.

```bash
/models              # inside OpenCode - select a muse-spark model
```

Any strong agentic coding model in the Claude Sonnet/Opus class also works,
because the task is tool-heavy (edit files, run node/soffice/python, read
measured output, iterate). Avoid small/fast models: they skip the verification
loop and break the 1-page fit.

Optional pin in `opencode.json`:

```json
{ "model": "<your-muse-spark-model-id>" }
```

## 5. Run a tailoring session

First, put YOUR real resume content into `build_resume.js` (replace the example
strings: name, contact, summary, skills, jobs, education). Then prompt:

> Tailor my resume to this JD, keep the layout identical, verify spacing,
> return DOCX + PDF: <paste JD link or full JD text>

What the agent should do (make it follow this order):

1. Read `build_resume.js` + `Resume_Section_Spec.md` + the JD in full.
2. Rewrite ONLY subtitle, summary, skills items, and experience bullets toward
   the JD (summary role identity stays within your real job titles).
   Never invent tools, metrics, dates, titles, or employers. Flag any JD
   requirement you cannot honestly cover (e.g. people-management experience).
   Fold missing JD points into existing lines using real experience.
3. Keep every layout constant/helper untouched (fonts, sizes, colors, margins,
   spacing, bullets, tab stops). Edit content strings only.
4. Set COMPANY/ROLE_SLUG env vars (plus APPLICANT_NAME on first run) so the
   run files itself under `~/Desktop/job_resumes/<Company>/<date>_<role>/`
   with filename `<First>_<Last>_Resume.docx`. Build: `node build_resume.js`,
   then `soffice --headless --convert-to pdf` the generated DOCX.
5. Verify with the checker until it prints MATCH (all DY=0, all DL=0):
   `python3 compare_layout.py ORIGINAL.pdf <new pdf>`
   If a section runs long, trim tailored words (never layout numbers) and rebuild.
6. Deliver the DOCX + PDF, plus: JD coverage %, honestly omitted items, and
   claims to be ready to defend in interview.

## 6. How it works

```
JD (URL/text)
  -> content rewrite (subtitle/summary/skills/bullets, honesty rules, no fabrication)
  -> build_resume.js  (docx lib: constants S_NAME..S_SK, helpers name/subtitle/
       contact/section/summary/skill/jobline/role/bullet/certline/eduline,
       Letter page, 0.22"/0.6" margins, Carlito, navy 1F3864)
  -> <First>_<Last>_Resume.docx (auto-filed under
       ~/Desktop/job_resumes/<Company>/<date>_<role>/, filename from your name)
  -> LibreOffice (soffice --headless --convert-to pdf)
  -> compare_layout.py (PyMuPDF: every section header Y-position + line count
       vs the original PDF; MATCH = identical spacing, still 1 page)
```

Key design points:

- **Content and layout are separated.** `Resume_Section_Spec.md` governs *what*
  to write (8 fixed sections, bullet template, ban list: no em dashes, no
  buzzwords like "leverage/seamless/robust", plain hyphens only).
  `build_resume.js` governs *how it looks*. The agent only edits strings.
- **Rewritten text reflows lines**, so a longer bullet pushes every section
  below it down. `compare_layout.py` catches this numerically (header heights
  in points + lines per section) and the agent trims words until MATCH.
- **Pinned toolchain matters:** `docx@8.5.0` (v9 renders differently), real
  Carlito font (substitutes shift wraps), LibreOffice conversion (same engine
  as the original pipeline). All pinned/documented above.
- **Honesty gate:** role titles, employers, dates, metrics, and skills must be
  real and defensible. Anything in the JD without real backing is reported as
  omitted, not added.

# Resume Tailor

Turn a job description (URL or pasted text) into a tailored 1-page resume that
keeps your exact layout: same fonts, colors, alignment, bullets, and section
spacing. Works with **OpenCode, Claude Code, Ollama, or any agentic coding
tool** on **macOS, Windows, or Linux**.

> **Privacy:** identity fields in `build_resume.js` are placeholders. Fill in
> your own name, contact, and real history. Never list tools, metrics, dates,
> titles, or employers you cannot defend in an interview.

---

## 1. Prerequisites (all operating systems)

You need four things. Install per your OS from the table below.

| Tool | macOS | Windows | Linux (Ubuntu/Debian) |
|---|---|---|---|
| Node.js 18+ | `brew install node` | `winget install OpenJS.NodeJS.LTS` or nodejs.org | `sudo apt install nodejs npm` |
| Python 3.9+ | preinstalled (CLT) or `brew install python` | `winget install Python.Python.3.12` (tick "Add to PATH") or python.org | `sudo apt install python3 python3-pip` |
| LibreOffice (provides `soffice` for DOCX to PDF) | `brew install --cask libreoffice` | `winget install TheDocumentFoundation.LibreOffice` or libreoffice.org | `sudo apt install libreoffice-writer` |
| Carlito font (exact resume font) | `brew install --cask font-carlito` | download from github.com/google/fonts (`ofl/carlito/`), right-click each `.ttf` → Install | `sudo apt install fonts-crosextra-carlito` |
| Git | preinstalled (CLT) | `winget install Git.Git` | `sudo apt install git` |

Verify everything is visible on PATH:

```bash
node --version        # v18+
python3 --version     # 3.9+
soffice --version     # LibreOffice
```

Windows notes:
- Run commands in PowerShell or Windows Terminal.
- `soffice.exe` lives in `C:\Program Files\LibreOffice\program\`. If `soffice`
  is not recognized, either add that folder to PATH or use the full path in
  the PDF step: `& "C:\Program Files\LibreOffice\program\soffice.exe" --headless --convert-to pdf Resume_Tailored.docx`
- Python's `pip` may be `py -m pip` on some setups.

Linux notes:
- Fedora/RHEL: `sudo dnf install nodejs python3-pip libreoffice-writer`, font package `google-crosextra-carlito-fonts`.
- Headless servers work fine: `soffice --headless` needs no display.

## 2. Project setup

```bash
git clone https://github.com/forgephantom/resume-tailor.git
cd resume-tailor
npm install                  # docx@8.5.0, PINNED - v9 renders spacing differently
pip install -r requirements.txt   # pymupdf + pypdf (layout verification)
```

Manual build sanity check (no AI needed):

```bash
node build_resume.js                          # -> Resume_Tailored.docx
soffice --headless --convert-to pdf Resume_Tailored.docx   # -> Resume_Tailored.pdf
```

Open the PDF: it must be exactly 1 page.

## 3. Choose your AI runner

### Option A - OpenCode (recommended, tested end-to-end)

Install: macOS/Linux `curl -fsSL https://opencode.ai/install | bash`,
Windows PowerShell `irm https://opencode.ai/install.ps1 | iex`. Then:

```bash
cd resume-tailor
opencode
```

Model: this project was built and verified with **Muse Spark** (the
`muse-spark` family). Inside OpenCode run `/models` and pick it, or pin it in
`opencode.json` with the `"model"` field. Any strong agentic coding model in
the Claude Sonnet/Opus class also works. Avoid small/fast models - they skip
the verification loop and break the 1-page fit.

### Option B - Claude Code

```bash
npm install -g @anthropic-ai/claude-code
cd resume-tailor
claude
```

Needs an Anthropic API key or Pro/Max subscription (`claude /login` or
`ANTHROPIC_API_KEY` env var). Model: Sonnet is the sweet spot for this task
(Opus also fine, Haiku too weak for the iterate-until-match loop). Then paste
the session prompt from section 4.

### Option C - Ollama (fully local, offline)

```bash
ollama pull qwen2.5-coder:32b
```

Point OpenCode at Ollama as the provider (or use any Ollama-compatible agent
harness), and select the pulled coder model. Use a **30B+ coder model**
(`qwen2.5-coder:32b`, `deepseek-coder-v2`, `devstral`) - smaller models cannot
reliably run the measure-trim-rebuild loop. Expect slower, weaker tailoring
than cloud models; always check the verification output says MATCH and read
the rewritten bullets yourself. Needs ~20 GB RAM/VRAM for 32B models.

### Option D - Anything else (Aider, Cursor, Amp, ...)

Any tool that can edit files and run shell commands works:

```bash
pip install aider-chat && aider   # terminal agent
```

or open the folder in Cursor/VS Code with an agent extension. Give it the
session prompt from section 4 and the same rules. The project is
tool-agnostic: Node + Python + LibreOffice do the real work; the agent only
edits strings and iterates on measured output.

## 4. Session prompt (paste into your runner)

> Tailor my resume to this JD, keep the layout identical, verify spacing,
> return DOCX + PDF: <paste JD link or full JD text>
>
> Rules: read build_resume.js + Resume_Section_Spec.md + the JD first. Rewrite
> ONLY summary, skills items, and experience bullets. Never invent tools,
> metrics, dates, titles, or employers - flag JD requirements I cannot honestly
> cover. Keep every layout constant/helper untouched. Build with
> `node build_resume.js`, convert with
> `soffice --headless --convert-to pdf`, verify with
> `python3 compare_layout.py ORIGINAL.pdf Resume_Tailored.pdf` until MATCH,
> trimming words (never layout numbers) if sections run long. Then report JD
> coverage %, omitted items, and claims to defend in interview.

First-time setup in the same session: put YOUR real resume content into
`build_resume.js` (replace the example strings), and keep a copy of your
original PDF around as the `compare_layout.py` baseline.

## 5. How it works

```
JD (URL/text)
  -> content rewrite (summary/skills/bullets, honesty rules, no fabrication)
  -> build_resume.js (docx lib: constants S_NAME..S_SK, helpers name/subtitle/
       contact/section/summary/skill/jobline/role/bullet/certline/eduline,
       Letter page, 0.22"/0.6" margins, Carlito, navy 1F3864)
  -> Resume_Tailored.docx
  -> LibreOffice (soffice --headless --convert-to pdf)
  -> Resume_Tailored.pdf
  -> compare_layout.py (PyMuPDF: every section header Y-position + line count
       vs the original PDF; MATCH = identical spacing, still 1 page)
```

Why it is built this way:

- **Content and layout are separated.** `Resume_Section_Spec.md` governs *what*
  to write (8 fixed sections, bullet template, ban list: plain hyphens only,
  no em dashes, no buzzwords like leverage/seamless/robust). `build_resume.js`
  governs *how it looks*. The agent only edits strings, never sizes/spacing.
- **Rewritten text reflows lines**, so a longer bullet pushes every section
  below it down. `compare_layout.py` catches this numerically (header heights
  in points + lines per section) and the agent trims words until MATCH.
- **Pinned toolchain matters:** `docx@8.5.0` (v9 renders spacing differently),
  real Carlito font (substitutes shift line wraps), LibreOffice conversion
  (same engine family as the original pipeline). All covered in section 1.
- **Honesty gate:** role titles, employers, dates, metrics, and skills must be
  real and defensible. Anything in the JD without real backing is reported as
  omitted, not added.

## 6. Files

| File | What it is |
|---|---|
| `build_resume.js` | Layout engine + resume content. Edit strings only. |
| `Resume_Section_Spec.md` | Content rules: sections, bullet template, honesty/ban rules. |
| `compare_layout.py` | Layout verifier: `python3 compare_layout.py ORIG.pdf NEW.pdf`. |
| `HOW_TO_RUN_OPENCODE.md` | Shorter OpenCode-only quick guide. |
| `package.json` / `requirements.txt` | Pinned deps. |

## 7. Troubleshooting

- **`soffice` not found (Windows):** use the full path to `soffice.exe` (sec 1).
- **PDF is 2 pages:** tailored text ran long. Shorten summary/bullets a few
  words (keep metrics + tool names) and rebuild. Never shrink fonts/margins.
- **Wraps differ from the original:** wrong font (install Carlito, sec 1) or
  wrong docx version (`npm install` must resolve 8.5.0 - check
  `npm list docx`).
- **LibreOffice replaces fonts:** clear the font cache (`fc-cache -f` on
  macOS/Linux) after installing Carlito, then reconvert.
- **Ollama output ignores verification:** model too small - move to a 32B+
  coder or a cloud model (sec 3).

# Resume Tailor

Turn a job description (URL or pasted text) into a tailored 1-page resume that
keeps your exact layout: same fonts, colors, alignment, bullets, and section
spacing. Built with OpenCode. See [HOW_TO_RUN_OPENCODE.md](HOW_TO_RUN_OPENCODE.md)
for setup, model choice, and how it all works.

## Quick start (manual, no AI)

```bash
npm install            # installs docx@8.5.0 (pinned - do not use v9)
node build_resume.js   # produces Resume_Tailored.docx
soffice --headless --convert-to pdf Resume_Tailored.docx
```

You also need the **Carlito** font installed (metric-compatible with Calibri):

```bash
brew install --cask font-carlito   # macOS
```

## Files

| File | What it is |
|---|---|
| `build_resume.js` | Layout engine + resume content. Edit only the strings; helpers own the look. Identity fields are placeholders - fill in your own. |
| `Resume_Section_Spec.md` | Content rules: the 8 sections, what goes in each, honesty/ban rules. |
| `compare_layout.py` | Verifies a tailored PDF matches the original section-by-section (header heights + line counts). |
| `HOW_TO_RUN_OPENCODE.md` | Full guide: running on OpenCode, model recommendation, how it works. |
| `package.json` / `requirements.txt` | Pinned deps (`docx@8.5.0`, `pymupdf`, `pypdf`). |

## With OpenCode (recommended)

Open this folder in OpenCode, paste a JD link, and say: *"tailor my resume to
this JD, keep the layout identical, verify spacing, return DOCX + PDF."*
Details in [HOW_TO_RUN_OPENCODE.md](HOW_TO_RUN_OPENCODE.md).

# Changelog

All notable changes to ApplyForge. Versions follow semver: `vMAJOR.MINOR.PATCH`.

---

## v2.1.0 — 2026-10-03

The loop grows a seventh reviewer and the whole pipeline gets stricter:
every resume is now built to maximum interview strength, with a hard
sponsorship gate before any application goes out.

### Added
- **Review G — company lens.** The loop is now seven reviewers. After the
  AI-voice check, the resume is read exactly as the hiring company sees it:
  a 10-second fit verdict, requirement-by-requirement traceability with
  quoted proof lines, interview triggers, and company-side risks. All seven
  reviewers must vote "interview" for the resume to ship.
- **Skill-experience coverage map.** For each of the JD's top 10 skills the
  build maps: in Skills section? → in Experience? → at which employer(s)?
  Every top-10 skill must appear in both sections when truthfully
  supportable; key skills are evidenced at every employer where actually
  used. A skill with no honest anchor stays off the resume and is named as
  a gap, never faked.
- **ATS text simulation.** The final PDF is stripped to raw text and read
  the way the ATS does: every top-10 keyword must survive in the extracted
  text, sections in order, no garbled characters. A keyword missing from
  the raw text fails even if it renders fine visually.
- **Acronym rule.** Acronyms are expanded on first use ("service level
  indicators/objectives (SLIs/SLOs)", "identity and access management
  (IAM)") so full-phrase matchers hit. Role names are never abbreviated:
  "Site Reliability Engineer", never "SRE"; "Senior", never "Sr".

### Changed
- **Interview-conversion standard.** The documented bar for every resume is
  now maximum interview strength: the full seven-reviewer loop with zero
  skipped steps, unanimous interview votes, 10/10 scores. No exceptions,
  no shortcuts.
- **Bullet formula v2.** Every Experience bullet follows [Action Verb] +
  [What You Did] + [Quantified Result], with honest metrics on at least
  70% of bullets. Numbers are never invented: attested metrics or honest
  scope counts from items already listed in the bullet.
- **Top-10 JD skills rule.** Every build extracts the JD's top 10 skills
  and rewrites until 100% appear in context (Skills plus at least one
  Experience bullet each), with repeated scan-check-rewrite cycles. Review
  rounds raised to a maximum of 5; remaining gaps are shown explicitly.
- **H-1B sponsorship gate (mandatory).** The per-application sponsorship
  check is now a hard gate: extract H-1B filings for the last year and the
  current year (h1bdata.info, USCIS H-1B Employer Data Hub) plus the
  posting's own sponsorship language. Apply only with filings in either
  year or an explicit sponsorship offer.
- **Direct client only.** Applications go only to full-time roles posted by
  the hiring company itself. Staffing agencies, recruiting firms,
  consultancies, and third-party "on behalf of client" postings are
  skipped even when the role is labeled full-time.
- `.gitignore` hardened: per-company `build_*.js` files, sample outputs,
  and bullet preview folders are never committed — no personal resume data
  in the repo.
- Version bumped to 2.1.0 (`package.json`).

---

## v2.0.2 — 2026-09-30

### Fixed
- `build_resume.js` template: summary and skill paragraph after-spacing
  synced to the proven baseline values (11 → 9). The template's layout
  constants are identical to the production baseline again, so new users
  start from spacing that is verified to hold one page.
- `Resume_Section_Spec.md`: tailoring-skill note now points at the shipped
  `skills/jd-resume-review-loop/SKILL.md` instead of claiming the skill is
  not part of the repo.

### Changed
- Version bumped to 2.0.2 (`package.json`).

---

## v2.0.1 — 2026-09-30

### Added
- **Sponsorship check before every application (documented).** Before a
  packet is built, the company's H-1B history is looked up (h1bdata.info /
  USCIS H-1B Employer Data Hub) and proven sponsors are prioritized;
  companies with no H-1B history and no sponsorship signal are skipped when
  better options exist. The per-application sponsorship signal (proven
  sponsor / history unclear / no history) is logged in the run report. The
  check changes which companies get applications — work-authorization
  answers stay exactly as they are, nothing is misrepresented.
- README gained a "Sponsorship check" subsection; the single prompt and
  HOW_TO_RUN_MUSE's standing rules now include the lookup step.

### Changed
- Version bumped to 2.0.1 (`package.json`).

---

## v2.0.0 — 2026-09-30

The quality loop was rebuilt from two review passes into a full six-reviewer
gauntlet with an interview vote. This is the loop that now runs before every
single application.

### Added
- **Review C — staff / peer engineer.** Checks technical depth: would the
  tooling and scale claims survive a technical screen? Catches misused
  terminology and fluff an engineer would spot.
- **Review D — executive skim.** The 6-second test: title + summary + first
  two bullets must communicate who the candidate is and why they are strong
  instantly; includes a one-sentence pitch test.
- **Review E — HR red-flag screen.** Timeline gaps/overlaps, title-scope
  consistency, level fit vs the JD, verification risk on every claim.
- **Review F — AI-voice / buzzword detector.** Dedicated pass that scans the
  banned-word list plus AI phrasings (em dashes, semicolons, "not only/but
  also", triple parallelisms, "furthermore/moreover", "in today's
  fast-paced", uniform bullet rhythm, vague intensifiers without numbers,
  hedged claims like "helped with"/"assisted in") and rewrites anything
  that reads machine-generated.
- **Interview vote (final gate).** All six reviewers vote "interview" or "no
  interview" with a one-line reason. ALL SIX must vote interview for the
  resume to ship; any "no" triggers a targeted revision and a re-vote.
- **10/10 bar.** The target is 10/10 from every reviewer. Any score below 10
  triggers a targeted revision pass and a re-score (max 3 full rounds); any
  remaining gap or dissent is shown to the user with the reason.
- **Lane-specific title descriptors.** The title line is now
  `<JD role> • <lane descriptor>` with a descriptor per lane (SRE,
  Capacity, Production Engineering, Infrastructure, Reliability,
  Performance) — no more one-size-fits-all subtitle, and never the wrong
  lane's flavor (e.g. no FinOps subtitle on an SRE resume).
- **Hard impact gate (Review B).** Every Experience bullet must carry
  ownership, scale, or a measurable outcome. Duty-only bullets fail
  regardless of keyword coverage. Only attested facts may satisfy the gate —
  never invented numbers.
- **Summary first-line rule.** Every summary opens with years of experience,
  lane identity, and the strongest attested scale or outcome for that lane.
- **Skill-experience match rule.** Every skill must trace to real experience
  (anchored by an Experience bullet or explicit user attestation) — no
  aspirational or JD-only skills.
- **Single title per employer.** One role title per Professional Experience
  entry; dual/stacked titles are banned.
- **`skills/jd-resume-review-loop/SKILL.md` shipped in the repo.** The full
  loop — all six reviews, scoring rules, interview vote, style bans — is now
  a portable skill file anyone can load into Muse or another agent.

### Changed
- Quality loop expanded: `Draft 1 -> ATS review -> Draft 2 -> hiring-manager
  review -> final` is now `Draft 1 -> A (ATS) -> Draft 2 -> B (hiring
  manager) -> Draft 3 -> C (peer) -> D (exec skim) -> E (HR) -> F (AI-voice)
  -> interview vote -> final`.
- README and HOW_TO_RUN_MUSE rewritten around the six-reviewer loop; the
  "two review passes" language is gone everywhere.
- Version bumped to 2.0.0 (`package.json`).

### Privacy
- No personal data in this release. The repo ships a blank template only:
  names, contacts, employers, dates, and metrics live in env vars and the
  user's private Drive, never in the repository (enforced by `.gitignore`:
  `baseline/`, `jobs/`, `*.pdf`, `*.docx`).

---

## v1.0.0 — 2026-09-29

First public release — ApplyForge (Meta Muse edition).

### Added
- One-prompt pipeline: base-resume intake, role extraction, LinkedIn-first
  job search (60 min – 7 days freshness), per-job tailored resume, auto-apply
  up to 50–75/day, Drive filing.
- `build_resume.js`: fixed-layout 1-page resume engine (Letter, Carlito,
  navy 1F3864) with env-var identity (`APPLICANT_NAME`, `COMPANY`,
  `ROLE_SLUG`, `RUN_DATE`, `OUT_BASE`).
- `compare_layout.py`: numeric layout verifier (section-header Y positions +
  line counts via PyMuPDF); MATCH = identical spacing, exactly 1 page.
- `Resume_Section_Spec.md`: content rules, bullet template, honesty and ban
  lists.
- `HOW_TO_RUN_MUSE.md`: single-prompt quick guide, no installs.
- Two-pass review loop (ATS recruiter + hiring manager).
- Approval gates for the first 2 applications; full autopilot from the 3rd.
- Honesty gate: never invent employers, titles, dates, metrics, tools,
  salary, or work-authorization facts.

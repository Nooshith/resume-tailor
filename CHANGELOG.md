# Changelog

All notable changes to ApplyForge. Versions follow semver: `vMAJOR.MINOR.PATCH`.

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

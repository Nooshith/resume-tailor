---
name: "jd-resume-review-loop"
description: "Tailor the base resume to a job description through a seven-reviewer loop (ATS recruiter, hiring manager, peer engineer, executive skim, HR red-flag screen, AI-voice detector, company lens) plus a final interview vote, then render the final one-page PDF/DOCX. Use for EVERY job-application resume build, no exceptions."
---

# JD Resume Review Loop

## Purpose

Produce a JD-matched, one-page tailored resume from the base resume through a structured review loop, then render and file it per the job-sprint conventions. No tailored resume ships without this loop.

INTERVIEW-CONVERSION STANDARD (user-set 2026-10-03, binding for EVERY resume): every resume is built to maximum strength for one goal — getting interviews. The full seven-reviewer loop, the skill-experience coverage map, and the company-lens review run with zero skipped steps on every build, no exceptions, no shortcuts. The bar is unanimous "interview" votes and 10/10 scores, not mere completion.

## Inputs

1. Base resume (content authority): `~/workspace/resume-tailor/baseline/build_resume.js`. Every run starts from the BASE, never from a previous tailored version. If unclear which file is the base, ask.
2. Target JD (text, file, or link). No JD given: ask for it. Never guess.

## Binding user overrides (these win over the generic rules below)

- Output filenames are ALWAYS exactly `Your_Name_Resume.pdf` / `.docx`. Never put role or company in the filename.
- Files live in `~/workspace/job_resumes/<Company>/<YYYY-MM-DD>_<Role-Slug>/` as PDF + DOCX + `JD.md` + `APPLICATION_FORM.md`, mirrored under Drive `job_resumes/`. Per-role build scripts live in `~/workspace/resume-tailor/jobs/<slug>/`.
- The final resume MUST be one page and pass the layout MATCH check (`compare_layout.py` vs the baseline). Pipeline notes: `~/TOOLS.md` ("Resume pipeline" section).
- Additions: the user attests real experience across JD-relevant fields even when unlisted on the base resume. JD-requested skills/tools MAY be added, attributed to the employer where gained (Oak Street = SRE/ops/observability; BofA = infrastructure/capacity; Ebtech = software dev; TCS = systems eng). NEVER invent: employers, job titles, dates, metrics/percentages, years of experience, salary, credentials, legal/work-auth facts. No `[X%]` placeholders in the final file: strip any metric that is not verified. Honest omissions (no attested experience) are left out and named, never faked.
- SKILL-EXPERIENCE MATCH (hard, user-set 2026-09-30): every skill or tool in the Skills section must trace to real experience — anchored by at least one Experience bullet, or explicitly user-attested with the employer where it was gained. No aspirational, JD-only, or course-only skills. Review A must flag any skill lacking an experience anchor; either anchor it with a bullet or delete it. The Skills section and the Experience section must tell the same story.
- SKILL-EXPERIENCE COVERAGE MAP (hard, user-set 2026-10-03): for each of the JD's top 10 skills, build a map row — skill → in Skills section? → in Experience? → at which employer(s)? Every top-10 skill must appear in BOTH the Skills section and at least one Experience bullet when truthfully supportable. A key skill must be evidenced at every employer where he actually used it, and the map must name which employer anchors each skill. Anchor only to real experience — never invent usage at an employer where he didn't use it. A skill with no honest anchor stays off the resume and is named as a gap in the review summary, never faked in.
- SINGLE TITLE PER EMPLOYER (hard, user-set 2026-09-30): every Professional Experience entry shows ONE role title only. Bank of America = "Capacity Manager". Oak Street Health = "Site Reliability Engineer". TCS = "Systems Engineer". Ebtech = "Software Engineer". Never show dual titles, stacked titles, or "X / Y" variants on any entry. (This is the user's directed presentation of their own roles; list it under "Confirm before applying".) This supersedes the earlier BOFA-only title rule.
- REWRITE LATITUDE (user-granted 2026-09-30, refined 2026-09-30): the Skills section may be freely rewritten per JD (reorder, rename categories, swap in JD keywords) within the skill-experience match rule. The Summary is always rewritten per JD at the same quality bar: first line states years + lane identity + strongest attested scale/outcome. Experience bullets are strong as written: tailoring may lightly reframe them for the JD (keyword alignment, reordering, leading with the most relevant), but must NEVER weaken their substance — no hollowing out, no dropping core claims (25% incident cut, 18% utilization, MTTR 35%, app stability 30%, zero Sev-1 escalations, deployment time 40%, 2,100 hours saved where present). Strengthen around them, not instead of them. The truth boundary still holds (no invented employers, titles, dates, metrics, tools, or years).
- BULLET FORMULA (user-set 2026-10-03, binding — supersedes the 2026-10-01 XYZ rule): every Experience bullet follows [Action Verb] + [What You Did] + [Quantified Result]. At least 70% of bullets must carry an honest metric (%, hours, counts, scale). Never invent a number to satisfy this: use attested metrics, or honest scope counts derived from items already listed in the bullet (e.g., "5 observability platforms" for five named tools, "4 teams" for four named teams). Bullets with no attested number stay clean and unquantified — a forced fake metric fails Review E. Canonical wording: ~/workspace/resume-tailor/preview_bullets_v2/build_bullets_v2.js.
- TOP-10 JD SKILLS (user-set 2026-10-03, binding): for every build, extract the JD's top 10 skills/keywords first, scan the resume against each one, and rewrite until 100% of the top 10 appear in context (Skills section plus at least one Experience bullet each, using the JD's exact wording). Run the scan-check-rewrite cycle multiple times — one pass is never enough.
- MISSING SKILLS (user-set 2026-10-03): a top-10 JD skill missing from the resume gets added when the user attests the experience or it anchors to an existing bullet, attributed to the employer where gained. Every such addition goes in the "Confirm before applying" list.
- ROLE MATCH (user-set 2026-10-03): the resume headline title mirrors the JD's role name 100% (existing title rule). Employer job titles in the Experience section are NEVER changed — they are the titles actually held (BofA = Capacity Manager, Oak Street = Site Reliability Engineer, TCS = Systems Engineer, Ebtech = Software Engineer). Background checks verify titles; the truth boundary holds.
- ITERATE UNTIL PASS (user-set 2026-10-03, binding): run the ATS-scanner, recruiter, and hiring-manager analyses in rounds. Anything any of the three flags as missed sends the draft back for a targeted rewrite, then re-scan. Repeat until all three pass or 5 full rounds are done. If gaps remain after round 5, ship the best version and show the user exactly what still misses and which reviewer flagged it.
- Writing style: plain and smart. No AI buzzwords, no em dashes, no semicolons, no smart quotes. Banned words: leverage, utilize, spearheaded, orchestrated, delve, robust, seamless, cutting-edge, innovative, dynamic, holistic, synergy, foster, pivotal, streamline, empower, passionate, results-driven, detail-oriented, proven track record, responsible for, adept at, well-versed. Prefer plain verbs: built, ran, fixed, cut, moved, wrote, led, set up, migrated, owned. Commas and short sentences. Vary bullet openers; no more than two bullets starting with the same verb.
- Every addition not in the base resume goes in a "Confirm before applying" list shown to the user.
- Match target: 100% of the JD's must-have skills/responsibilities and 90%+ of nice-to-haves, in context (Skills section plus at least one Experience bullet per must-have), using the JD's exact wording. Score every review against a written checklist.

## Workflow

### Step 1: Read the JD (no comparison yet)
Do not compare or score the base resume against the JD. Just read and note privately: must-have skills, nice-to-haves, exact keywords and phrasing, seniority level, top 3 responsibilities. Comparison starts after Draft 1 exists.

### Step 2: Draft 1 (tailor)
Editable: the resume title (headline under the name), Summary, Skills, Experience. TITLE RULE (lane-specific descriptor, strengthened 2026-09-30; supersedes the single-descriptor rule of 2026-09-28): the title line is "<JD role>  •  <lane descriptor>" — the JD's role name followed by the descriptor for the role's lane, two spaces around the bullet. Pick the descriptor by lane:
- SRE: Production Reliability & Scale
- Capacity (engineer/planner/manager/analyst): Cloud Efficiency, Capacity & FinOps
- Production Engineering: Production Engineering & Reliability
- Infrastructure Engineering: Infrastructure, Automation & Scale
- Reliability Engineering: Reliability Engineering & Operations
- Performance Engineering: Performance Engineering at Scale
Example: "Senior Site Reliability Engineer  •  Production Reliability & Scale". If a posting's title is vague or unusable, fall back to "Software Engineer  •  <lane descriptor>". Never use the Capacity/FinOps descriptor on a non-capacity lane: a FinOps-flavored subtitle on an SRE resume mispositions the candidate.
SUMMARY RULE: the first line must state years of experience, the lane identity, and the single strongest attested scale or outcome fact for that lane. No generic openers.

### Step 3: Review A (ATS recruiter)
Run on Draft 1, never on the base resume. Output briefly: keyword match (must-haves matched vs missing, one by one); what's correct; what's wrong (weak verbs, vague bullets, buried skills, keyword stuffing, parsing risks); match %; score out of 10.

ATS TEXT SIMULATION (hard, added 2026-10-03): run the final PDF through a plain-text extractor (pdftotext) and read it the way the ATS does — no layout, no fonts, just text. Every top-10 keyword must appear in the extracted text; section headers must appear in order (Summary, Skills, Experience, Education); no garbled characters, merged words, or lost lines. A keyword missing from the raw text is a fail even if it renders fine visually.

ACRONYM RULE (added 2026-10-03): expand acronyms on first use so full-phrase matchers hit — write "service level indicators/objectives (SLIs/SLOs)" and "identity and access management (IAM)" on first use. Universally understood eng abbreviations (CI/CD, HPA/VPA, SAR/PerfMon) may stay abbreviated. EXCEPTION (user-set 2026-10-03): role names are NEVER abbreviated — always "Site Reliability Engineer", never "SRE"; always "Senior", never "Sr". This applies to the headline, summary, skills, and bullets.

### Step 4: Draft 2
Fix every Review A issue. Same editable sections only.

### Step 5: Review B (hiring manager / director)
Output briefly: credibility (ownership and scope vs mere duties); impact (scale, cost, time, reliability visible?); fit and gaps (would I interview? what worries me?); summary check (who this person is and why they fit, in the first 3 lines); score out of 10.
IMPACT GATE (hard, 2026-09-30): every Experience bullet must carry ownership, scale, or a measurable outcome. A bullet that only lists duties ("responsible for X", "worked on Y") fails Review B regardless of keyword coverage, and the draft goes back for another pass. Acceptable scale/outcome carriers: systems or fleet size, request or data volume, users affected, hours or dollars saved, reliability deltas, deployment frequency, incident counts. Use only attested facts; never invent a number to satisfy this gate. If no attested number exists for a bullet, carry ownership or scope instead ("owned on-call for X", "led migration of Y").

### Step 6: Draft 3
Fix every Review B issue. Same editable sections only.

### Step 7: Review C (staff / peer engineer — technical depth)
Output briefly: technical credibility (would the tooling and scale claims survive a technical screen?); depth vs breadth (reads like someone who operated these systems, or just listed them?); terminology accuracy (any misused terms a peer would catch?); buzzword check (any claim an engineer would read as fluff?); score out of 10.

### Step 8: Review D (executive skim — the 6-second test)
Output briefly: top-third test (title + summary + first two bullets — do I know who this person is and why they are strong within 6 seconds?); seniority signal (reads at the JD's level, not above or below?); one-line pitch (how I would pitch this candidate to the hiring manager in one sentence); score out of 10.

### Step 9: Review E (HR red-flag screen)
Output briefly: timeline check (gaps, overlaps, short stints — anything needing an explanation?); title-scope consistency (do the titles match what the bullets claim?); level fit (overqualified or underqualified signals for this JD?); verification risk (any claim that invites an uncomfortable background-check question?); verdict: pass or flag with the specific concern.

### Step 10: Review F (AI-voice / buzzword detector — added 2026-09-30)
One job: make sure no machine wrote this resume. Output briefly:
- Banned-word scan: check every word against the banned list in this skill; list each hit with its line and a plain replacement.
- AI-phrasing scan: em dashes, semicolons, smart quotes; "not only X but also Y"; triple parallelisms ("built, scaled, and optimized"); "furthermore / moreover / additionally"; "in today's fast-paced"; uniform bullet rhythm (every bullet the same length and structure); vague intensifiers ("very", "extremely", "highly", "significantly" without a number); hedged claims ("helped with", "assisted in", "involved in").
- Voice check: does it read like a human engineer wrote it? Flag any sentence that reads machine-generated, and rewrite it plain.
- Verdict: pass or fail with the specific flags; score out of 10. Any fail sends the draft back for a rewrite of the flagged lines.

### Step 11: Review G (company lens — what the company sees, added 2026-10-03)
Read the resume exactly as the hiring company sees it, not as the applicant's advocate. Output briefly:
- 10-second verdict: what the company concludes about fit, in one line.
- Requirement traceability: for each of the JD's top requirements, quote the exact resume line that proves it. Any requirement with no proving line is a gap — name it plainly.
- Interview triggers: the 2-3 lines most likely to make the company request an interview, and why.
- Company-side risks: anything that would make them pass — thin evidence on a must-have, title or scope mismatch, unexplained short stint, location or seniority doubts.
- Score out of 10. Anything below 10 sends the draft back for a targeted rewrite of the flagged lines.

### Step 12: Final draft
Fix every issue from Reviews C, D, E, F, and G.
10/10 BAR (hard, user-set 2026-09-30, rounds raised to 5 on 2026-10-03): the target is 10/10 from every reviewer. Any score below 10 triggers a targeted revision pass addressing that reviewer's notes, followed by a re-score of the affected review. Maximum 5 full rounds total. If any score is still below 10 after round 5, ship the best version and show the user the remaining gap and which reviewer withheld the 10.

### Step 13: Interview vote (final gate — added 2026-09-30)
All seven reviewers vote "interview" or "no interview", each with a one-line reason. ALL SEVEN must vote interview for the resume to ship. Any "no" triggers one targeted revision pass addressing that reviewer's objection, followed by a re-vote. If the vote still fails after 5 full rounds, ship the best version and show the user the dissenting reviewer's reason in the review summary.

### Step 14: Deliver
1. Show the user a short review summary: all seven scores before and after, the interview vote, top 3 changes, and the "Confirm before applying" list.
2. Show the final resume.
3. Render the final one-page PDF/DOCX through the `~/workspace/resume-tailor/` pipeline, verify layout MATCH, place in the role folder, mirror to Drive. Save ONLY the final version.

## Self-check before saving
- Only the title, Summary, Skills, Experience differ from the base resume.
- No changed employers or dates; one title per employer (BofA = Capacity Manager, Oak Street = Site Reliability Engineer, TCS = Systems Engineer, Ebtech = Software Engineer); no invented numbers.
- Every addition listed under "Confirm before applying".
- 100% of must-haves appear in context, not as a keyword dump.
- Reads human: no banned words, no em dashes, no semicolons.
- Strong, varied verb openers; length at or under the base; one page; MATCH verified.
- All seven reviewers voted "interview". Any score below 10 or any dissent is shown to the user with the reason.

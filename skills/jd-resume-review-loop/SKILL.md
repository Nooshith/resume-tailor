---
name: "jd-resume-review-loop"
description: "Tailor the base resume to a job description through a six-reviewer loop (ATS recruiter, hiring manager, peer engineer, executive skim, HR red-flag screen, AI-voice detector) plus a final interview vote, then render the final one-page PDF/DOCX. Use for EVERY job-application resume build, no exceptions."
---

# JD Resume Review Loop

> Public version. This is the generic skill shipped with ApplyForge. It
> contains no personal data: set the "Binding overrides" below per user
> (filenames, folders, attested facts) before running it.

## Purpose

Produce a JD-matched, one-page tailored resume from the base resume through a structured review loop, then render and file it per the user's filing conventions. No tailored resume ships without this loop.

## Inputs

1. Base resume (content authority): the user's base resume file. Every run starts from the BASE, never from a previous tailored version. If unclear which file is the base, ask.
2. Target JD (text, file, or link). No JD given: ask for it. Never guess.

## Binding overrides (set per user — these win over the generic rules below)

- Output filenames: `<First>_<Last>_Resume.pdf` / `.docx` (derived from the applicant's name). Never put role or company in the filename.
- Files live in `<OUT_BASE>/<Company>/<YYYY-MM-DD>_<Role-Slug>/` as PDF + DOCX + `JD.md` + `APPLICATION_FORM.md`. Per-role build scripts live in the repo's `jobs/<slug>/` (private copy only — never committed).
- The final resume MUST be one page and pass the layout MATCH check (`compare_layout.py` vs the user's baseline PDF).
- Additions: the user may attest real experience across JD-relevant fields even when unlisted on the base resume. JD-requested skills/tools MAY be added, attributed to the employer where gained. NEVER invent: employers, job titles, dates, metrics/percentages, years of experience, salary, credentials, legal/work-auth facts. No `[X%]` placeholders in the final file: strip any metric that is not verified. Honest omissions (no attested experience) are left out and named, never faked.
- SKILL-EXPERIENCE MATCH (hard): every skill or tool in the Skills section must trace to real experience — anchored by at least one Experience bullet, or explicitly user-attested with the employer where it was gained. No aspirational, JD-only, or course-only skills. Review A must flag any skill lacking an experience anchor; either anchor it with a bullet or delete it. The Skills section and the Experience section must tell the same story.
- SINGLE TITLE PER EMPLOYER (hard): every Professional Experience entry shows ONE role title only. Never show dual titles, stacked titles, or "X / Y" variants on any entry. (This is the user's directed presentation of their own roles; list it under "Confirm before applying".)
- REWRITE LATITUDE: the Skills section may be freely rewritten per JD (reorder, rename categories, swap in JD keywords) within the skill-experience match rule. The Summary is always rewritten per JD at the same quality bar: first line states years + lane identity + strongest attested scale/outcome. Experience bullets are strong as written: tailoring may lightly reframe them for the JD (keyword alignment, reordering, leading with the most relevant), but must NEVER weaken their substance — no hollowing out, no dropping core claims (metrics, scale statements, hours saved where present). Strengthen around them, not instead of them. The truth boundary still holds (no invented employers, titles, dates, metrics, tools, or years).
- Writing style: plain and smart. No AI buzzwords, no em dashes, no semicolons, no smart quotes. Banned words: leverage, utilize, spearheaded, orchestrated, delve, robust, seamless, cutting-edge, innovative, dynamic, holistic, synergy, foster, pivotal, streamline, empower, passionate, results-driven, detail-oriented, proven track record, responsible for, adept at, well-versed. Prefer plain verbs: built, ran, fixed, cut, moved, wrote, led, set up, migrated, owned. Commas and short sentences. Vary bullet openers; no more than two bullets starting with the same verb.
- Every addition not in the base resume goes in a "Confirm before applying" list shown to the user.
- Match target: 100% of the JD's must-have skills/responsibilities and 90%+ of nice-to-haves, in context (Skills section plus at least one Experience bullet per must-have), using the JD's exact wording. Score every review against a written checklist.

## Workflow

### Step 1: Read the JD (no comparison yet)
Do not compare or score the base resume against the JD. Just read and note privately: must-have skills, nice-to-haves, exact keywords and phrasing, seniority level, top 3 responsibilities. Comparison starts after Draft 1 exists.

### Step 2: Draft 1 (tailor)
Editable: the resume title (headline under the name), Summary, Skills, Experience. TITLE RULE (lane-specific descriptor): the title line is "<JD role>  •  <lane descriptor>" — the JD's role name followed by the descriptor for the role's lane, two spaces around the bullet. Pick the descriptor by lane:
- SRE: Production Reliability & Scale
- Capacity (engineer/planner/manager/analyst): Cloud Efficiency, Capacity & FinOps
- Production Engineering: Production Engineering & Reliability
- Infrastructure Engineering: Infrastructure, Automation & Scale
- Reliability Engineering: Reliability Engineering & Operations
- Performance Engineering: Performance Engineering at Scale
Example: "Senior Site Reliability Engineer  •  Production Reliability & Scale". If a posting's title is vague or unusable, fall back to "Software Engineer  •  <lane descriptor>". Never use a descriptor from the wrong lane (e.g. a FinOps-flavored subtitle on an SRE resume mispositions the candidate).
SUMMARY RULE: the first line must state years of experience, the lane identity, and the single strongest attested scale or outcome fact for that lane. No generic openers.

### Step 3: Review A (ATS recruiter)
Run on Draft 1, never on the base resume. Output briefly: keyword match (must-haves matched vs missing, one by one); what's correct; what's wrong (weak verbs, vague bullets, buried skills, keyword stuffing, parsing risks); match %; score out of 10.

### Step 4: Draft 2
Fix every Review A issue. Same editable sections only.

### Step 5: Review B (hiring manager / director)
Output briefly: credibility (ownership and scope vs mere duties); impact (scale, cost, time, reliability visible?); fit and gaps (would I interview? what worries me?); summary check (who this person is and why they fit, in the first 3 lines); score out of 10.
IMPACT GATE (hard): every Experience bullet must carry ownership, scale, or a measurable outcome. A bullet that only lists duties ("responsible for X", "worked on Y") fails Review B regardless of keyword coverage, and the draft goes back for another pass. Acceptable scale/outcome carriers: systems or fleet size, request or data volume, users affected, hours or dollars saved, reliability deltas, deployment frequency, incident counts. Use only attested facts; never invent a number to satisfy this gate. If no attested number exists for a bullet, carry ownership or scope instead ("owned on-call for X", "led migration of Y").

### Step 6: Draft 3
Fix every Review B issue. Same editable sections only.

### Step 7: Review C (staff / peer engineer — technical depth)
Output briefly: technical credibility (would the tooling and scale claims survive a technical screen?); depth vs breadth (reads like someone who operated these systems, or just listed them?); terminology accuracy (any misused terms a peer would catch?); buzzword check (any claim an engineer would read as fluff?); score out of 10.

### Step 8: Review D (executive skim — the 6-second test)
Output briefly: top-third test (title + summary + first two bullets — do I know who this person is and why they are strong within 6 seconds?); seniority signal (reads at the JD's level, not above or below?); one-line pitch (how I would pitch this candidate to the hiring manager in one sentence); score out of 10.

### Step 9: Review E (HR red-flag screen)
Output briefly: timeline check (gaps, overlaps, short stints — anything needing an explanation?); title-scope consistency (do the titles match what the bullets claim?); level fit (overqualified or underqualified signals for this JD?); verification risk (any claim that invites an uncomfortable background-check question?); verdict: pass or flag with the specific concern.

### Step 10: Review F (AI-voice / buzzword detector)
One job: make sure no machine wrote this resume. Output briefly:
- Banned-word scan: check every word against the banned list in this skill; list each hit with its line and a plain replacement.
- AI-phrasing scan: em dashes, semicolons, smart quotes; "not only X but also Y"; triple parallelisms ("built, scaled, and optimized"); "furthermore / moreover / additionally"; "in today's fast-paced"; uniform bullet rhythm (every bullet the same length and structure); vague intensifiers ("very", "extremely", "highly", "significantly" without a number); hedged claims ("helped with", "assisted in", "involved in").
- Voice check: does it read like a human engineer wrote it? Flag any sentence that reads machine-generated, and rewrite it plain.
- Verdict: pass or fail with the specific flags; score out of 10. Any fail sends the draft back for a rewrite of the flagged lines.

### Step 11: Final draft
Fix every issue from Reviews C, D, E, and F.
10/10 BAR (hard): the target is 10/10 from every reviewer. Any score below 10 triggers a targeted revision pass addressing that reviewer's notes, followed by a re-score of the affected review. Maximum 3 full rounds total. If any score is still below 10 after round 3, ship the best version and show the user the remaining gap and which reviewer withheld the 10.

### Step 12: Interview vote (final gate)
All six reviewers vote "interview" or "no interview", each with a one-line reason. ALL SIX must vote interview for the resume to ship. Any "no" triggers one targeted revision pass addressing that reviewer's objection, followed by a re-vote. If the vote still fails after 3 full rounds, ship the best version and show the user the dissenting reviewer's reason in the review summary.

### Step 13: Deliver
1. Show the user a short review summary: all six scores before and after, the interview vote, top 3 changes, and the "Confirm before applying" list.
2. Show the final resume.
3. Render the final one-page PDF/DOCX through the repo's resume pipeline (`build_resume.js` + `compare_layout.py`), verify layout MATCH, place in the role folder. Save ONLY the final version.

## Self-check before saving
- Only the title, Summary, Skills, Experience differ from the base resume.
- No changed employers or dates; one title per employer; no invented numbers.
- Every addition listed under "Confirm before applying".
- 100% of must-haves appear in context, not as a keyword dump.
- Reads human: no banned words, no em dashes, no semicolons.
- Strong, varied verb openers; length at or under the base; one page; MATCH verified.
- All six reviewers voted "interview". Any score below 10 or any dissent is shown to the user with the reason.

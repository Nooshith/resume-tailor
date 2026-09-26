# Resume Section Specification

Instructions for any LLM to write the content of each resume section. Any model
following this file should produce content that fits the same code-based layout and
that another model, following the same file, would produce near-identically.

This file governs **what to write in each section**. Two other files handle the rest:
- `Resume_Tailoring_Skill.md` governs the overall rewrite rules (no fabrication,
  ATS keyword coverage, no buzzwords, honest role-match gate).
- `build_resume.js` in the code base governs layout, font, color, and spacing.

Follow all three together. Where this file conflicts with either of the others,
`Resume_Tailoring_Skill.md` wins (it holds the absolute rules on honesty,
buzzwords, and character bans), then this file, then layout.

## Universality: this file must work for any resume

These instructions must produce a good resume for anyone, regardless of:

- **Field**: engineering, medicine, law, sales, marketing, teaching, design,
  finance, operations, research, trades, executive leadership, creative fields,
  academia, non-profit, government, military. All get the same eight sections
  and the same rules; only the vocabulary changes.
- **Seniority**: a two-year-out new graduate and a thirty-year veteran both use
  this spec. Bullet counts shrink for less experience, skill categories shift,
  and Projects becomes more prominent for early career, but section structure
  does not change.
- **Career shape**: continuous employment, career breaks, self-employment,
  military-to-civilian transitions, non-linear paths, contract work,
  research, and industry moves all fit. Career breaks are handled honestly (see
  Section 6 rules on gaps); nothing here requires an unbroken employment history.
- **Region and format**: US-style resumes, international CVs, and academic CVs all
  render from these sections — the code layer handles date format and page size,
  the content rules here stay the same.
- **Language**: the rules are written for English resumes but the section
  structure and honesty rules translate to any language. Only the buzzword ban
  list would need a per-language equivalent.
- **Non-technical fields**: the "Technical Skills" section becomes "Skills" or
  "Core Competencies" for non-technical roles, and its content changes from tools
  to methodologies, domains, licenses, and languages spoken. The category-line
  structure stays identical.

Where a rule below uses a technical example (Kubernetes, JavaScript, AWS), the
example is illustrative only. Substitute the equivalent nouns for the person's
actual field — for a nurse, "Kubernetes" would be "electronic health records";
for a lawyer, "AWS" would be "Westlaw"; for a chef, "Docker" would be a specific
kitchen technique or cuisine specialty. The structural rule (name the tools, use
the JD's exact spelling, group by category) applies universally.

If any rule in this file appears to only make sense for a software engineer or
only for a person with a single continuous career, treat that as a bug in the
rule, not a limit of the spec. Read the intent and adapt the vocabulary.

---

## The eight sections, in order

Every resume produced by this system has these sections in this order, no others:

1. Name
2. Subtitle (one line of role framing)
3. Contact line
4. Summary
5. Technical Skills
6. Professional Experience
7. Education & Certifications
8. (Optional) Projects — only when the person has real projects to list

Do not add sections not on this list (no "Objective," no "References," no "Hobbies,"
no "Awards" unless awards is what the person genuinely wants and has). Do not
reorder them.

---

## Section 1: Name

Rules:
- Full legal name as the person provides it, in that exact order (first middle last,
  or family-first order if that is how they wrote it).
- All caps. No middle-name initialization unless the person wrote it that way.
- No credentials (no "PhD," "MBA," "PMP") after the name. Credentials go in
  Education & Certifications only.
- No nicknames in parentheses unless the person explicitly includes one.

What to write: the exact string the person supplied, uppercased.

---

## Section 2: Subtitle

One line, directly below the name. Frames the professional identity being targeted.

Rules:
- Two or three role-descriptor phrases separated by a single bullet character (`•`)
  with a space on each side. Never use pipes, dashes, commas, or semicolons as the
  separator here.
- Each phrase is a role or discipline label, not a sentence and not an adjective
  string. "Senior Data Engineer" is a phrase; "Passionate about data" is not.
- The first phrase must be the primary role targeted by the job description (or by
  the person's main current role if no JD is provided). The second and third
  phrases add scope or specialty that the person's real experience genuinely
  supports.
- No years of experience in the subtitle. That goes in the summary.
- Total length: fits on one line at the body font size. Aim for 60 to 80 characters
  including separators.
- No em dashes, no colons, no parentheses.

Examples of the shape (not templates to copy):
- `Senior Data Engineer  •  Streaming Platforms & Analytics`
- `Infrastructure Engineer  •  Cloud, IaC & Distributed Systems`
- `Software Engineer  •  Cloud Efficiency, Capacity & FinOps`

What to write: two or three role-descriptor phrases, separated by `  •  `, first
phrase matching the JD's target title.

---

## Section 3: Contact line

One line, directly below the subtitle. Location, phone, and email, separated by
` • ` (space, bullet, space). Location first (city and state), phone second, email
last.

Rules:
- City and state only, never full street address. State as a two-letter code (WA,
  TX, NY). No zip code.
- Phone in US format `+1 (XXX) XXX-XXXX` if US-based, or in the person's country
  format if not.
- Email in lowercase, plain domain. Do not obscure with "[at]" or spaces.
- Do not include LinkedIn, GitHub, portfolio, or personal site URLs on this line.
  If the person wants those, they get their own separate line below contact, one
  URL per link, each preceded by a plain-text label like `LinkedIn:` or `GitHub:`.
- No icons or emoji. No em dashes.

What to write: `City, ST  •  +1 (XXX) XXX-XXXX  •  email@domain.com` and, if
supplied, a second line with LinkedIn and GitHub as labeled URLs.

---

## Section 4: Summary

One paragraph, no bullet points inside it, no line breaks inside it.

Content order within the paragraph (fixed):

**Sentence 1** — role identity plus years of experience plus core disciplines the
JD targets.
- Open with the person's real role title (matched to the JD's target where truthful)
  and years of experience calculated from actual employment dates (see the
  arithmetic rules in `Resume_Tailoring_Skill.md` Section 4b).
- Name two to four broad technology or discipline areas the JD asks for that the
  resume genuinely supports.

**Sentence 2** — the single strongest, numbers-backed accomplishment.
- Pull the most impressive specific metric or scale figure from the resume's
  bullets (not from the JD). Frame it as a fact about the person's work, not a
  claim about capability.
- The metric here must be a real number from a real bullet elsewhere in the resume,
  not an estimate, aggregate, or new figure invented for the summary.

**Sentence 3** — the second and third most JD-relevant real skill areas.
- Cover what the JD emphasizes next (a language, a platform, a methodology) that
  the resume supports. This sentence exists to catch keywords the first sentence
  did not cover.

**Sentence 4 (optional, only if truthful)** — collaboration, leadership, or
communication scope.
- One sentence on cross-team work, stakeholder communication, or mentorship, but
  only if the resume has real bullets showing this. If the person has never led,
  mentored, or partnered visibly, do not add this sentence — it reads as filler
  when unsupported.

Total length: 4 to 6 sentences, one paragraph, roughly 60 to 100 words.

Rules:
- Never use the same summary twice across different JDs. Regenerate against each
  JD's actual emphasis.
- The word "years" gets a real number in front of it, calculated from employment
  dates, followed by `+`. `6+ years` if the total is between 6.0 and 6.99, and so
  on. Never round up.
- Do not start the summary with "I am" or "A" (as in "A results-driven engineer").
  Start with the role title itself: "Infrastructure Engineer with...", "Senior
  Data Engineer with...".
- No buzzwords (see `Resume_Tailoring_Skill.md` Section 7).

What to write: one paragraph of 4 to 6 sentences following the fixed content
order above, with a real metric from the resume in sentence 2.

---

## Section 5: Skills

Rename this section based on the field: **"Technical Skills"** for engineering,
data, and IT roles; **"Skills"** for most other fields; **"Core Competencies"** for
executive, consulting, or corporate roles where that convention is standard;
**"Areas of Expertise"** for academic, medical, or research roles. Pick the label
the target field's own JDs use. Do not invent a new label the field would not
recognize.

A block of labeled lines, each line one skill category. Not a paragraph. Not one
giant undifferentiated list.

Structure of each line: `**Category name:** item, item, item, item`

Rules for the category labels:
- Between 6 and 12 categories total per resume. Fewer looks thin; more looks
  padded.
- Categories should mirror how the target JD groups its own requirements. If the
  JD separates "Infrastructure" from "AI/ML," use those two categories rather than
  one combined "Tech" category. If the JD lumps languages together, do the same.
- Category names in title case, followed by a colon.
- Common category names to reach for when applicable:
  - **Software/engineering**: Languages, Software Engineering, AI & ML, Cloud &
    IaC, Containers & CI/CD, Data & Messaging, Observability, Systems &
    Networking, Security & Compliance, Reliability & Ops, Testing &
    Performance.
  - **Healthcare/clinical**: Clinical Specialties, Procedures, EMR Systems,
    Certifications & Licenses, Patient Populations, Regulatory (HIPAA, JCAHO),
    Languages Spoken.
  - **Legal**: Practice Areas, Jurisdictions & Bar Admissions, Case Types,
    Research Platforms (Westlaw, Lexis), Litigation Tools, Regulatory
    Frameworks.
  - **Marketing/sales**: Channels, Platforms, Analytics & Attribution, CRM &
    Automation, Content Types, Industries Served, Languages.
  - **Finance/accounting**: Domains, Regulatory (GAAP, IFRS, SOX), Systems (SAP,
    Oracle, Workday), Analysis Methods, Reporting Platforms, Certifications.
  - **Design/creative**: Disciplines, Software (Figma, Adobe Creative Suite),
    Methodologies (design systems, user research), Deliverables, Industries.
  - **Operations/supply chain**: Domains, ERP Systems, Methodologies (Lean, Six
    Sigma), Analytics, Regulatory, Certifications.
  - **Education/academic**: Subjects Taught, Teaching Methods, Curricula &
    Standards, EdTech Platforms, Certifications & Endorsements, Research Areas,
    Languages.
  - **General/cross-field**: Languages Spoken, Tools, Collaboration Software,
    Project Methodologies, Leadership, Professional Skills.

  Not all of these belong on every resume; pick the ones the JD calls for. When
  the JD is in a field this list does not cover, invent categories that mirror
  how the JD groups its own requirements — the underlying rule is always "match
  the JD's own categorization."

Rules for the items within each line:
- Comma-separated, no semicolons, no ampersands as list separators.
- Use the JD's exact spelling and capitalization for tool names (GitHub Actions,
  not github actions; Kubernetes, not kubernetes; JavaScript, not Javascript).
- Every item on the skills list must be grounded in real experience — either
  visible in a bullet or confirmed by the person. Never list a tool the person
  has never touched, even if the JD asks for it.
- Order items within a line by decreasing prominence in the JD, then by the
  person's real depth. Tools the JD names explicitly go first in their category.
- No parenthetical version numbers unless the JD requires them (write `Java`, not
  `Java 11, 17` — versions clutter unless the JD asks for a specific one).
- No proficiency levels ("advanced," "familiar," "expert"). Skills are listed as
  facts, not self-ratings.
- Do not repeat the same item across multiple categories. Kubernetes belongs in
  one line only, not both "Containers & CI/CD" and "Cloud & IaC".

What to write: 6 to 12 labeled lines, each `Category: item, item, item`, grouped
to mirror the JD's own categories, with every item grounded in real experience.

---

## Section 6: Professional Experience

The largest section by content volume. One block per job, most recent first.

Each job block has this structure, in this order:

**Line 1** — company name, location, dates (right-aligned).
- Format: `Company Name  |  City, ST` on the left, dates on the right.
- Dates as `Mmm YYYY - Mmm YYYY` for past jobs (three-letter month), `Mmm YYYY -
  Present` for the current job.
- Always plain hyphen in the date range. Never en dash or em dash.

**Line 2** — role title, italic.
- One role title per job. If the person had multiple titles at the same company,
  either split into two blocks with two date ranges, or write both titles
  separated by ` | ` (space pipe space) on the single role line — never as a
  slash or comma.
- The role title in the resume must match what the person's employer would confirm
  in a background check. Never invent or upgrade a title.

**Lines 3+** — bullets, each following the fixed bullet template from
`Resume_Tailoring_Skill.md` Section 4a.

Rules for handling non-standard career histories:

- **Career breaks** (parenting, caregiving, health, study, sabbatical, layoff
  waiting): if the gap is longer than 6 months, place a one-line entry in the
  experience timeline named honestly for what it was — `Career break — full-time
  caregiver`, `Sabbatical — independent study`, `Graduate study, Full-time`, or
  simply `Career break` with the dates. One line, no bullets, no invented
  activities. This is more honest than leaving an unexplained gap that recruiters
  will ask about anyway.
- **Contract or freelance work**: group under one entry `Independent Contractor`
  or `Freelance [role]` with the full date range, then list clients as
  sub-bullets, one per meaningful engagement. Do not fabricate a "company."
- **Self-employment**: treat the business as an employer, list the person's role
  as founder or principal, and follow the same bullet rules — real
  accomplishments, real metrics, real scale.
- **Multiple concurrent roles**: if the person genuinely held two roles at the
  same time (a day job and a consultancy, for example), list them as separate
  entries with overlapping dates. Do not hide either.
- **Military-to-civilian transitions**: use the civilian equivalent of the
  military role in the title line, and translate military terminology in bullets
  into what a civilian recruiter will recognize. Do not strip out military
  service; it is often a strength.
- **Very short tenures** (under 6 months): include them anyway if honestly held.
  Do not omit jobs to hide short tenures — an unexplained date gap is worse than
  a short-tenure entry.

Rules for how many bullets per job:
- Most recent job: 4 to 6 bullets.
- Second most recent: 3 to 5 bullets.
- Older jobs: 2 to 4 bullets each.
- The oldest job on the resume (if 10+ years old and largely irrelevant to the JD):
  1 to 2 bullets is enough.
- Total bullet count across all jobs, target 12 to 18. Fewer and the resume looks
  thin; more and page-fit becomes impossible.

Rules for what each bullet must contain (see `Resume_Tailoring_Skill.md` Section
4a for the exact template):
- An action verb from the approved list, in past tense (or present tense for the
  current job's bullets).
- A specific tool, platform, or system named where truthful.
- A concrete metric, scale figure, or outcome from the person's real work.
- One clear idea per bullet — no cramming two accomplishments into one sentence.
- The bold-lead pattern: the first roughly 40 to 60 characters of each bullet are
  bolded (the accomplishment or metric), the rest is regular weight. This is
  handled by the code layer (`build_resume.js` bullet function takes two
  arguments), so the content spec just needs to identify what should be bold.

Rules for the order of bullets within a job:
- Most impressive metric-backed bullet first.
- JD-relevance next: bullets that hit the JD's requirements come before generic
  ones.
- Related items grouped together (do not zigzag between infrastructure, coding,
  and mentorship — cluster like with like).

What to write: for each job, one header line, one role line, and 2 to 6 bullets
following the template, in the order defined above.

---

## Section 7: Education & Certifications

Structure:
- **Education on its own line**, always. Format: `Degree, Field of Study, School Name
  (City, ST)` on the left, graduation date on the right.
- **Certifications on their own line**, always separate from education. Format:
  `Certifications: cert name  •  cert name  •  cert name`. The word "Certifications:"
  in bold at the start of the line, then the certification names separated by
  `  •  ` (space, bullet, space).
- Education and certifications never share a line, even when there is only one of
  each. Two lines, always.
- If the person has multiple degrees, list each on its own line, most recent first,
  before the certifications line.
- If the person has more than three certifications, keep only the three most
  JD-relevant on the resume. Additional ones go in a LinkedIn profile, not the
  resume.
- If the person has no certifications at all, omit the certifications line
  entirely rather than showing "Certifications: none." A missing line reads
  neutral; an empty label reads as a gap.

Rules for what to include:
- Degree, exact name of the field of study, exact institution name, graduation
  year. No GPA unless the person is under three years out of school and it is 3.5
  or higher.
- Certification names in the certifier's exact wording ("AWS Certified Solutions
  Architect - Associate," not "AWS Solutions Architect Associate").
- No coursework, no honors societies, no Dean's list unless the person is under
  two years out of school and asks for them.
- No expired certifications. If a cert has expired, remove it.
- No pending certifications ("expected 2027"). If it is not done, it does not
  appear.

What to write: education on its own line (one line per degree if multiple), then
certifications on a separate line if any exist. Never combined. Real credentials
only, no fabrication, no expired items, no pending items.

---

## Section 8 (optional): Projects

Include only when the person has real projects worth listing, typically when:
- They are early career and their project work is more relevant than their
  professional history.
- They have specific project work (open source, side projects, GitHub repos) that
  directly supports the JD but is not covered by their job bullets.
- They are moving domains (e.g., an infrastructure engineer applying for an ML
  role) and their projects show credible work in the target domain.

If included:
- 2 to 4 projects, no more.
- Each project as one line: `**Project Name** — one-sentence description with the
  specific tools and the outcome or scale`. Optionally followed by a link on the
  same line or the next.
- Projects that are just names of GitHub repos with no description do not count.
- Do not list tutorials-followed as projects. "Built a to-do app following a
  Udemy course" is not a project.

What to write: 2 to 4 real, substantive projects, each with tools and outcome,
only when they add signal the job bullets cannot.

---

## Page fill: the resume must completely fill its pages

The finished resume must fully occupy the page or pages it uses. A resume that
stops two-thirds of the way down page one, or a two-page resume where the second
page has only three lines on it, both read as thin. Full pages read as
substantive; short pages read as gaps the person did not know how to fill.

### Choose the right target page count first

Before writing content, decide how many pages this resume should be, based on
real experience:

- **0-3 years of experience, or new graduate**: 1 page.
- **3-10 years**: 1 page unless the field expects longer (see academic exception
  below).
- **10-20 years**: 1 or 2 pages, whichever fills more cleanly.
- **20+ years**: 2 pages.
- **Academic/medical/scientific CVs**: as many pages as the person's real
  publications, grants, and appointments require. These are CVs, not resumes,
  and the page-fill rule still applies — every page fills completely, and the
  last section ends near the bottom of the last page rather than mid-page.
- **Federal government or specialized detailed formats**: follow the format's
  own length conventions.

Pick the page count that the person's real content fills. Never pad to hit a
higher count and never truncate real accomplishments to force a lower count.
When in doubt between 1 page and 2, prefer 1 page with dense strong content over
2 pages with a half-empty second page.

### Fill each page you choose to use

Once the target page count is set, the content must fill it:

- **Page 1 must be fully used** — bottom margin visible but no large stretch of
  empty space. If page 1 stops early, the content is too thin; add real bullets
  (see below), broaden real skills categories, or reduce the target to 1 page if
  it was originally 2.
- **The last page must reach at least 70% of the page** — measured from the top
  of the page to the last line of real content. A last page that is less than
  70% full should either be filled with real content or dropped by shortening the
  resume to fewer pages.
- **No section starts near the bottom of a page with only its heading visible**
  and its content on the next page. If a heading would land in the bottom 15% of
  a page, either move it to the next page entirely or add content above it so it
  lands earlier.
- **No orphaned lines** — a single-line trailer that spills onto the next page
  alone (a lone Education line, or two lines of certifications) is worse than
  either fully filling the previous page or fully filling the next. If a spill
  is unavoidable, prefer to reflow so it does not happen.

### Ways to fill a page honestly when content is thin

If the person's real experience does not fill the target page count, add real
material — never padding. In order of preference:

1. **Expand skills coverage**. If the JD names 40 keywords and only 25 are on
   the resume, adding the truthful missing ones both improves ATS coverage and
   fills space. Broaden a single-line skills category to two lines by listing
   more real tools they have used.
2. **Add a real bullet to a shallow job**. Any job with only one or two bullets
   probably has more real accomplishments the person could describe. Ask them
   for a specific project, an outcome they owned, or a metric they moved. Add
   the bullet only if it is real.
3. **Add a Projects section**. If the person has real side projects, open source
   work, or unpaid work relevant to the JD, list them (see Section 8).
4. **Add a Publications, Talks, or Patents section** for fields where those
   apply and the person has real ones.
5. **Add a Languages Spoken section** if the person is truly multilingual and
   the JD or field values it.
6. **Add Volunteer Experience** if the person has real, substantive volunteer
   work that would read as relevant to the JD.

Not allowed as filler:
- Repeating the same accomplishment in two bullets.
- Splitting one accomplishment into two bullets to double-count it.
- Listing skills the person has never used.
- Inflating dates, scope, or metrics.
- Adding an Objective statement.
- Adding a References section (references are provided separately).
- Adding empty section headings with no content.
- Increasing font size, line spacing, or margins beyond what the layout code
  intends. Do not fight the code layer with spacing tricks — if the content is
  truly too thin, cut the page count.

### Ways to trim a page honestly when content overflows

If the person's real experience produces more content than the target page
count, cut in this order:

1. **Trim the oldest job's bullets** to one or two lines each. Old jobs
   contribute the least signal.
2. **Merge related bullets in the oldest jobs** into single sentences.
3. **Cut skills that are not on the JD checklist** if there are more than 12
   skill categories.
4. **Cut certifications older than 10 years** unless they are still directly
   required by the JD.
5. **Cut the Projects section** if experience alone is strong enough.
6. **Raise the target to 2 pages** if the person has 10+ years of experience
   and cutting further would remove strong recent content.

Not allowed as trimming:
- Removing metrics or numbers to save words.
- Removing tool names to save words.
- Dropping to font sizes or margins the layout code does not intend.
- Cutting a whole job the person actually held.

### Verification step before delivery

After writing the content and rendering it through the layout code, verify:

1. Every page reaches at least 70% of its usable height.
2. Page 1 uses at least 90% of its usable height.
3. No section heading appears alone at the bottom of a page.
4. No single line trails onto a new page alone.
5. The last line of content sits within roughly one inch of the bottom of the
   last page (not halfway up).

If any of these fail, apply the "fill" or "trim" rules above until they pass.
A resume that fails these checks is not finished, regardless of how strong its
content is.

---

## What should never appear anywhere in the resume

To keep the output identical across LLMs, never produce any of the following, in
any section:

- Em dash (—) or en dash (–) — plain hyphens only.
- Semicolons in body text (they are allowed inside skills lists only if the JD
  itself uses them; otherwise commas throughout).
- Curly/smart quotes (" " ' '). Straight quotes only, and only when truly needed.
- Emoji or other symbol characters (★, →, ✓, ✅, 🚀). The only allowed special
  characters are the bullet separator `•` in the subtitle and contact line, and
  plain bullet points in bulleted lists.
- Buzzwords: leverage, seamless, robust, streamline, spearhead, empower, holistic,
  synergy, utilize, foster, pivotal, harness, world-class, best-in-class,
  state-of-the-art, cutting-edge, dynamic (as a filler adjective, not "Dynatrace"),
  passionate, results-driven, proven track record, wide range of, next-gen,
  game-changing, bleeding-edge, "responsible for."
- "Shipped" or "ships/shipping" as a delivery verb. Use built, deployed,
  delivered, developed, released.
- Filler phrases: "in order to," "it is worth noting that," "at the end of the
  day," "the ability to."
- Fabricated tools, metrics, dates, titles, employers, degrees, or certifications.

---

## Process any LLM should follow, in this order

1. Read the person's current resume in full.
2. Read the target JD in full.
3. Build the JD keyword checklist (per `Resume_Tailoring_Skill.md` Section 2b).
4. Run the role-match gate (per `Resume_Tailoring_Skill.md` Section 2). Stop and
   flag if it fails.
5. For each section in this file (Sections 1 through 7, and 8 if applicable),
   write the content following the rules in that section.
6. Re-scan the full draft for every item on the "should never appear" list. Fix
   and re-scan until zero hits.
7. Re-scan the JD keyword checklist against the finished text. Every Covered and
   Coverable item must be findable by literal text search. Fix and re-scan until
   complete.
8. Render the resume through the layout code and verify page fill (per the
   "Verification step" above). If any page falls below 70% fill, or if page 1
   falls below 90%, apply the fill or trim rules until it passes.
9. Deliver the content as structured text (section by section) so the layout code
   can render it. Do not attempt to format fonts, colors, or spacing in the text
   itself — that is the code layer's job.
10. Report to the person: the percentage of the JD's honest requirements now
    covered, the list of items honestly omitted, and any specific claims in the
    new resume that they should be ready to defend in an interview.

The goal is the same output regardless of which LLM runs these instructions.
Every rule above is written to be checkable rather than interpretive. If two runs
of two different models produce meaningfully different resumes from the same
inputs, the difference is a bug in one of the runs, not creative variation.

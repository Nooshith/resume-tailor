// Resume builder: fixed-layout 1-page resume -> .docx (then PDF via LibreOffice).
//
// HOW TO USE:
//   1. Set your identity (env vars or edit below). The output filename is
//      derived from YOUR name automatically: Firstname_Lastname_Resume.docx
//        APPLICANT_NAME="Jane Doe" COMPANY=Acme ROLE_SLUG=Backend-Engineer node build_resume.js
//   2. Every run files itself under:
//        ~/Desktop/job_resumes/<Company>/<YYYY-MM-DD>_<Role>/<First>_<Last>_Resume.docx
//      Override with OUT_BASE / RUN_DATE env vars (see below).
//   3. Replace the Summary / Skills / Experience content with YOUR OWN real
//      history. Everything below marked EXAMPLE is synthetic sample content.
//   4. Never invent tools, metrics, dates, titles, or employers you cannot defend.
//   5. PDF: soffice --headless --convert-to pdf <the .docx>
//
// Layout: every value controlling the look lives in the constants + helpers.
// To change content, edit only the strings in the `children: [...]` block.

const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, convertInchesToTwip } = require('docx');
const fs = require('fs');
const os = require('os');
const path = require('path');

// ---- EDIT ME (or pass as env vars): identity + this run's target ----
const APPLICANT_NAME = process.env.APPLICANT_NAME || 'YOUR FULL NAME';
const COMPANY        = process.env.COMPANY        || 'ExampleCorp';
const ROLE_SLUG      = process.env.ROLE_SLUG      || 'Example-Role';
const RUN_DATE       = process.env.RUN_DATE       || new Date().toISOString().slice(0, 10);
const OUT_BASE       = process.env.OUT_BASE       || path.join(os.homedir(), 'Desktop', 'job_resumes');

// Filename derives from the applicant name: Firstname_Lastname_Resume
const FILE_BASE = APPLICANT_NAME.trim().split(/\s+/).join('_') + '_Resume';
const OUT_DIR = path.join(OUT_BASE, COMPANY, `${RUN_DATE}_${ROLE_SLUG}`);
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT_FILE = path.join(OUT_DIR, `${FILE_BASE}.docx`);

const FONT = 'Carlito';               // install Carlito (metric-compatible with Calibri)
const NAVY = '1F3864';                // headings, name, role accents
const BODY = '212121';                // body text
const GRAY = '555555';                // subtitle, location, dates
const LINK = '1155CC';                // email

// sizes are half-points: 20pt=40, 10.5=21, 10=20, 9.5=19, 9=18, 8.5=17
const S_NAME=40, S_SUB=20, S_CONTACT=18, S_H=21, S_JOB=19, S_ROLE=18, S_BODY=18, S_SK=17;

function para(opts, runs){ return new Paragraph(Object.assign({children:runs}, opts)); }
function R(text, o={}){ return new TextRun(Object.assign({text, font:FONT, size:o.size||S_BODY, color:o.color||BODY, bold:o.bold||false, italics:o.italics||false}, {})); }

function name(t){return para({alignment:AlignmentType.CENTER,spacing:{after:14}},[R(t,{bold:true,size:S_NAME,color:NAVY})]);}
function subtitle(t){return para({alignment:AlignmentType.CENTER,spacing:{after:14}},[R(t,{size:S_SUB,color:GRAY})]);}
function contact(a,b){return para({alignment:AlignmentType.CENTER,spacing:{after:70}},[R(a,{size:S_CONTACT,color:BODY}),R(b,{size:S_CONTACT,color:LINK})]);}
function section(t){return para({spacing:{before:80,after:40},border:{bottom:{style:BorderStyle.SINGLE,size:6,space:2,color:NAVY}}},[R(t,{bold:true,size:S_H,color:NAVY})]);}
function summary(t){return para({spacing:{after:11,line:218}},[R(t,{size:S_BODY,color:BODY})]);}
function skill(label,val){return para({spacing:{after:11,line:218}},[R(label+': ',{bold:true,size:S_SK,color:NAVY}),R(val,{size:S_SK,color:BODY})]);}

// job header line: bold company, gray " | Loc", right-tab bold gray dates
function jobline(company,loc,dates){
  return para({spacing:{before:52,after:2},tabStops:[{type:'right',position:10512}]},[
    R(company,{bold:true,size:S_JOB,color:BODY}),
    R('  |  '+loc,{size:S_JOB,color:GRAY}),
    R('\t'+dates,{bold:true,size:S_JOB,color:GRAY}),
  ]);
}
function role(t){return para({spacing:{after:6}},[R(t,{italics:true,size:S_ROLE,color:NAVY})]);}
function bullet(boldPart, rest){
  return new Paragraph({bullet:{level:0},spacing:{after:12,line:220},indent:{left:200,hanging:180},
    children:[R(boldPart,{bold:true,size:S_BODY,color:BODY}), R(rest,{size:S_BODY,color:BODY})]});
}
function certline(t){return para({spacing:{after:3,line:214}},[R(t,{size:S_SK,color:BODY})]);}
function eduline(txt,date){return para({spacing:{after:0,line:218},tabStops:[{type:'right',position:10512}]},[R(txt,{size:S_BODY,color:BODY}),R('\t'+date,{italics:true,size:S_BODY,color:GRAY})]);}

const doc=new Document({
  styles:{default:{document:{run:{font:FONT,size:S_BODY,color:BODY}}}},
  sections:[{
    properties:{page:{
      size:{width:12240,height:15840},
      margin:{top:convertInchesToTwip(0.22),bottom:convertInchesToTwip(0.22),left:convertInchesToTwip(0.6),right:convertInchesToTwip(0.6)},
    }},
    children:[
      // ---- EDIT ME: identity (or APPLICANT_NAME env) ----
      name(APPLICANT_NAME),
      subtitle('Software Engineer  •  Cloud Efficiency, Capacity & FinOps'),
      contact('City, ST  •  +1 (XXX) XXX-XXXX  •  ','you@example.com'),

      section('SUMMARY'),
      // ---- EDIT ME: 4-6 sentences, one real metric from your bullets (EXAMPLE below) ----
      summary('Software and Site Reliability Engineer with 6+ years planning production infrastructure and data center capacity across AWS, Azure, GCP, and on-prem. Own capacity planning, forecasting, and FinOps for 25+ business-critical applications and 1,000+ servers, improving utilization 15% and cutting TCO while holding performance. Build fleet health reporting in Python and SQL with Power BI, Tableau, Grafana, tracking utilization, failures, lifecycle for refresh and decommissioning. Turn ambiguous demand into structured plans, partnering independently across Engineering, Finance, Supply Chain on roadmaps and recommendations for senior leadership, using GenAI/AI tools (Claude, GitHub Copilot) for reporting.'),

      section('TECHNICAL SKILLS'),
      // ---- EDIT ME: keep labels, list only tools you have actually used (EXAMPLE below) ----
      skill('Languages & Automation','Python, Java, Bash, PowerShell, YAML, C, C++'),
      skill('AI & ML','Prompt engineering (structured instruction files), LLM benchmarking & evaluation (Claude Opus, GPT), ML-based forecasting & anomaly detection, ML/GPU capacity planning, Microsoft 365 Copilot, GitHub Copilot, deterministic rule-based logic'),
      skill('Software Engineering','Object-Oriented Design, Design Patterns, Multithreading, JVM Tuning, SDLC, Code Reviews, Git, REST APIs, Microservices'),
      skill('Program & Reliability','Program Management, Technical Program Management, Cross-Functional Coordination, Capacity Planning, Resource Allocation, Long-Range Forecasting, Incident Command, RCA & Postmortems, SLI/SLO & Error Budgets, DR/HA, Change Management, Stakeholder Management'),
      skill('Data & Messaging','SQL, MySQL, PostgreSQL, Kafka, Redis, MongoDB, IBM MQ, MSSQL, Sybase, Excel, XML/CSV transformation'),
      skill('Containers & Cloud','Kubernetes (EKS/AKS/GKE), OpenShift, Docker, Helm, ArgoCD, AWS, Azure, GCP, On-Prem/PCF'),
      skill('Systems & Networking','Linux (RHEL), Windows Server, Filesystems, Disk/Storage, TCP/IP, DNS, NGINX, Firewalls, VPN'),
      skill('IaC, CI/CD & Tools','Terraform, Ansible, Puppet, CloudFormation, Jenkins, GitHub Actions, GitLab CI, Azure DevOps, Git, Bitbucket, Jira, Confluence'),
      skill('Monitoring & Analytics','Prometheus, Grafana, Splunk, ELK, AppDynamics, Dynatrace, CloudWatch, OpenTelemetry, Alertmanager, Data analytics & reporting platforms (Power BI, Tableau, SSRS), P95 utilization & threshold analysis'),
      skill('Testing & Performance','Load, Chaos & Synthetic Testing, Benchmarking, JMeter, SAR, PerfMon, Right-Sizing, Cost Optimization (FinOps), Autoscaling'),

      section('PROFESSIONAL EXPERIENCE'),

      // ---- EDIT ME: real employers, real titles, real metrics (EXAMPLE below) ----
      jobline('Example Corp','Austin, TX','Dec 2025 - Present'),
      role('Capacity Management Specialist | Infrastructure Engineer II'),
      bullet('Forecasted and scaled server, storage, and network capacity',' across multi-data-center and containerized (Docker, OpenShift/Kubernetes) environments, informing multi-year fleet refresh plans and cutting capacity-related performance incidents 20% under growing demand.'),
      bullet('Owned infrastructure capacity planning and long-range forecasting for 25+ business-critical applications',' driving resource allocation and right-sizing that improved utilization 15% and cut total cost of ownership, with Python/SQL and GenAI-assisted (GitHub Copilot) tooling.'),
      bullet('Monitored P95 utilization across 1,000+ data center servers',' (Linux, Windows, MSSQL, Sybase, grid-compute, OpenShift/Kubernetes) via Grafana, Splunk, Power BI, and Tableau, finding 90-95% of database-tier breaches were memory-driven across 2 regions.'),
      bullet('Led a cross-functional AI-assisted reporting program across 8 teams',' managing the initiative end to end to 97% accuracy after benchmarking Claude Opus against GPT models, building roadmaps and business cases with engineering and finance stakeholders on data analytics platforms (Power BI, Tableau, Grafana) that contributed to 500+ governance attestations.'),
      bullet('Built PowerShell and Python automation that cut operational toil',' with single-command multi-application batch execution and per-item failure handling, saving ~1,500 hours of manual breach-document updates, version-controlled in Git/Bitbucket with documentation in Confluence, plus self-service dashboards tracking review status, breach counts, approvals, and overdue items.'),

      jobline('Example Health','Denver, CO','Feb 2024 - Nov 2025'),
      role('Site Reliability Engineer'),
      bullet('Led incident response, root cause analysis, and postmortems',' on a 24/7 on-call rotation across Java, .NET, and batch workloads on AWS EKS, Azure AKS, GCP, PCF, and on-prem, cutting MTTR 30% with sustainable on-call practices.'),
      bullet('Improved monitoring, logging, and alerting systems',' with SLIs/SLOs and error budgets in Grafana, Prometheus, Splunk, ELK, AppDynamics, and Dynatrace, catching CPU, memory, and latency issues with gap detection before they reached users.'),
      bullet('Built ML-based capacity forecasting (GrafanaML) and tuned Kubernetes autoscaling',' (HPA/VPA/Cluster Autoscaler) to prevent CPU throttling and memory leaks, improving app stability 25%, and ran JMeter load and chaos tests with benchmarking for zero Sev-1 escalations, deploying Go and Java microservices in Docker with Kafka, IBM MQ, and Redis.'),
      bullet('Managed CI/CD pipelines for distributed systems',' (GitHub Actions, Azure DevOps, Jenkins, Bitbucket), cutting deployment time 35% and operational toil across multi-environment releases with runbooks and postmortems in Confluence/Jira.'),

      jobline('Example Services','Remote','Jul 2021 - Jul 2022'),
      role('Systems Engineer'),
      bullet('Supported disaster recovery planning and high availability',' deploying, patching, and hardening RHEL and Windows Server to NIST/CIS baselines, automating backups and security scripts with PowerShell and Bash, and building early-warning monitoring (SAR, PerfMon) for capacity planning across DNS, load balancing, firewall, and VPN operations.'),

      jobline('Example Tech','Remote','Jan 2019 - Jun 2021'),
      role('Software Engineer'),
      bullet('Built and deployed Java 11 / Spring Boot microservices',' on Azure with REST APIs over Oracle and MySQL, and set up CI/CD pipelines (Jenkins, GitHub Actions) working across Dev, QA, Security, and Infrastructure in Agile/Scrum.'),

      section('CERTIFICATIONS & EDUCATION'),
      skill('Certifications','Example Certifier: Sample Cloud Certification (Sep 2026)  •  Example Vendor Certified: Sample Associate'),
      eduline('M.S., Information Technology - Example University, Example City, ST','Dec 2023'),
    ],
  }],
});

Packer.toBuffer(doc).then(b=>fs.writeFileSync(OUT_FILE,b)).then(()=>console.log('wrote', OUT_FILE));

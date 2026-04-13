const jobs = [
  {
    title: "Lead Data Scientist",
    company: "Pythonic AI",
    companyUrl: "https://www.pythonic.ai/",
    location: "Milwaukee, WI, US (Remote)",
    period: "Apr 2026 – Present",
    bullets: [
      "Leading applied AI and data science work across production NLP systems and LLM-based workflows at Pythonic AI",
      "Setting technical direction on evaluation strategy, model quality, and practical AI system design for production use cases",
      "Supporting cross-functional delivery and mentoring teammates across research, annotation, and production-facing AI work",
    ],
    highlight: true,
  },
  {
    title: "Senior NLP & AI Scientist",
    company: "Pythonic AI",
    companyUrl: "https://www.pythonic.ai/",
    location: "Milwaukee, WI, US (Remote)",
    period: "Feb 2022 – Mar 2026",
    bullets: [
      "Led development and deployment of 3 production NLP services for title and escrow workflows, enabling extraction and classification across insurance, loan, mortgage, and signed closing documents; served as technical owner for one production service",
      "Architected an LLM-powered multi-agent workflow with tool orchestration and human-in-the-loop escalation to automate support email triage and resolution",
      "Built evaluation pipelines for LLM agents and production NLP systems, measuring tool-calling correctness and model quality to support more reliable iteration across releases",
      "Developed internal automation tooling to streamline data labeling, sprint planning, and QA workflows",
      "Coordinated cross-functional annotation efforts and mentored teammates on NLP, evaluation, and applied AI best practices",
    ],
  },
  {
    title: "Applied Research Scientist – NLP",
    company: "Imagia",
    companyUrl: "https://imagia.com",
    location: "Montreal, Canada (Remote)",
    period: "Nov 2020 – Jan 2022",
    bullets: [
      "Built NLP pipelines for hospital clinical report analysis — de-identification, named entity recognition, and measurement extraction",
      "Applied and evaluated transformer-based models (BioBERT, ClinicalBERT) on real-world biomedical datasets",
      "Designed production-grade CLI tools for end-to-end model inference on clinical documents",
    ],
    highlight: false,
  },
  {
    title: "NLP Research Assistant",
    company: "Dalhousie University",
    companyUrl: "https://www.dal.ca/faculty/computerscience.html",
    location: "Halifax, Canada",
    period: "Mar 2019 – Apr 2021",
    bullets: [
      "Applied and evaluated deep language models (BERT, BioBERT, BlueBERT) on downstream NLP tasks with rigorous experimental design",
      "Developed MTLV — a multi-task learning library with 4 architectures and a novel task-clustering method (published at ACM DocEng-2021)",
    ],
    highlight: false,
  },
  {
    title: "Data Analyst",
    company: "Ayten Company",
    companyUrl: "https://www.linkedin.com/company/ayten/",
    location: "Shiraz, Iran",
    period: "Aug 2018 – Feb 2019",
    bullets: [
      "Worked on social network analysis using Python, Neo4j, and MongoDB",
      "Practised Scrum within an R&D software team",
    ],
    highlight: false,
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Work Experience
        </h2>
        <p className="text-slate-500 text-sm mb-10">7+ years in NLP, AI, and production ML</p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[7px] top-2 bottom-2 w-px bg-slate-200" />

          <div className="flex flex-col gap-10">
            {jobs.map((job, i) => (
              <div key={i} className="flex gap-6 md:gap-8 relative pl-6 md:pl-8">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    job.highlight
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-400 bg-white"
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-slate-900">
                      {job.title}
                    </h3>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {job.company}
                    </a>{" "}
                    · {job.location}
                  </p>
                  <ul className="space-y-1.5">
                    {job.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-sm text-slate-600 flex gap-2 leading-relaxed"
                      >
                        <span className="text-slate-400 mt-1 flex-shrink-0">
                          –
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

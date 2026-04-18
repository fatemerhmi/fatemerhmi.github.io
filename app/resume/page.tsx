const experience = [
  {
    title: "Lead Data Scientist",
    company: "Pythonic AI",
    location: "Remote",
    period: "Apr 2026 – Present",
    bullets: [
      "Leading applied AI and data science work across production NLP systems and LLM-based workflows at Pythonic AI.",
      "Setting technical direction on evaluation strategy, model quality, and practical AI system design for production use cases.",
      "Supporting cross-functional delivery and mentoring teammates across research, annotation, and production-facing AI work.",
    ],
  },
  {
    title: "Senior NLP & AI Scientist",
    company: "Pythonic AI",
    location: "Remote",
    period: "Feb 2022 – Mar 2026",
    bullets: [
      "Led development and deployment of 3 production NLP services for title and escrow document workflows, supporting extraction and classification across insurance, loan, mortgage, and signed closing documents.",
      "Served as technical owner for a production NLP service and drove model quality improvements through evaluation pipelines, release validation, and iteration on real-world failure modes.",
      "Architected an LLM-powered multi-agent workflow with tool orchestration and human-in-the-loop escalation to automate support email triage and resolution.",
      "Built internal automation tooling to streamline labeling, sprint planning, and QA workflows, and mentored teammates on NLP, evaluation, and applied AI best practices.",
    ],
  },
  {
    title: "Applied Research Scientist, NLP",
    company: "Imagia",
    location: "Montreal, Canada (Remote)",
    period: "Nov 2020 – Jan 2022",
    bullets: [
      "Built NLP pipelines for clinical report analysis, including de-identification, named entity recognition, and measurement extraction.",
      "Applied and evaluated transformer-based models including BioBERT and ClinicalBERT on real-world biomedical datasets.",
      "Designed production-grade CLI tools for end-to-end inference on clinical documents.",
    ],
  },
  {
    title: "NLP Research Assistant",
    company: "Dalhousie University",
    location: "Halifax, Canada",
    period: "Mar 2019 – Apr 2021",
    bullets: [
      "Applied and evaluated deep language models including BERT, BioBERT, and BlueBERT on downstream NLP tasks with rigorous experimental design.",
      "Developed MTLV, a multi-task learning library with 4 architectures and a novel task-clustering method, published at ACM DocEng 2021.",
    ],
  },
];

const projects = [
  {
    name: "Multi-agent Support Automation",
    detail:
      "Designed an agentic support workflow combining tool-using LLM agents, retrieval, and human review to reduce manual engineering effort and speed up issue resolution.",
  },
  {
    name: "Production NLP Services",
    detail:
      "Built and maintained document understanding systems for high-value business workflows, with emphasis on evaluation, reliability, and deployability.",
  },
];

const skills = {
  "Core": ["Python", "SQL", "PyTorch", "scikit-learn", "Transformers", "spaCy"],
  "LLM Systems": ["RAG", "LLM evaluation", "Agentic workflows", "Human-in-the-loop systems", "Prompt engineering"],
  "Applied NLP": ["Information extraction", "Text classification", "Named entity recognition", "Document understanding", "Search and retrieval"],
  "Infra & Tooling": ["Docker", "REST APIs", "GitHub Actions", "MLflow", "CLI tooling"],
};

export default function ResumePage() {
  return (
    <main className="resume-page bg-white text-slate-900 flex justify-center px-6 py-6">
      <div className="w-full max-w-[8.5in] resume-shell">
        <header className="border-b border-slate-300 pb-3 mb-4">
          <div className="flex items-start justify-between gap-6 resume-header">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Fatemeh Rahimi</h1>
              <p className="mt-1 text-base font-medium text-blue-700">Lead Data Scientist | NLP, LLM Systems, Applied AI</p>
              <p className="mt-2 text-[13px] leading-5 text-slate-700 max-w-[6.2in]">
                Lead Data Scientist with 7+ years of experience building production NLP systems, LLM workflows, and applied ML products. Strong background in document understanding, evaluation, retrieval, and practical AI systems that work under real-world constraints.
              </p>
            </div>
            <div className="text-[13px] leading-5 text-slate-600 resume-contact">
              <div>Halifax, NS, Canada</div>
              <div>fateme.rhmi@gmail.com</div>
              <div>fatemerhmi.github.io</div>
              <div>github.com/fatemerhmi</div>
              <div>linkedin.com/in/fatemehrahimi</div>
            </div>
          </div>
        </header>

        <section className="mb-3">
          <h2 className="resume-section-title">Experience</h2>
          <div className="space-y-2 mt-1.5">
            {experience.map((job) => (
              <div key={`${job.company}-${job.title}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-[13.5px]">{job.title}</h3>
                    <p className="text-[12.5px] text-slate-700">{job.company} | {job.location}</p>
                  </div>
                  <div className="text-[12px] text-slate-500 whitespace-nowrap">{job.period}</div>
                </div>
                <ul className="mt-0.5 space-y-0 pl-5 list-disc text-[12px] leading-[1.4] text-slate-700">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-3">
          <h2 className="resume-section-title">Selected Projects</h2>
          <div className="mt-1.5 space-y-1 text-[12px] leading-[1.4] text-slate-700">
            {projects.map((project) => (
              <p key={project.name}>
                <span className="font-semibold text-slate-900">{project.name}:</span> {project.detail}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-3">
          <h2 className="resume-section-title">Skills</h2>
          <div className="mt-1.5 space-y-0.5 text-[12px] leading-[1.4] text-slate-700">
            {Object.entries(skills).map(([group, items]) => (
              <p key={group}>
                <span className="font-semibold text-slate-900">{group}:</span> {items.join(", ")}
              </p>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 resume-bottom-grid">
          <div>
            <h2 className="resume-section-title">Education</h2>
            <div className="mt-1.5 space-y-1.5 text-[12px] leading-[1.4] text-slate-700">
              <div>
                <div className="font-semibold text-slate-900">M.Sc., Computer Science</div>
                <div>Dalhousie University, Halifax, Canada</div>
                <div className="text-slate-500">2019 – 2021 | GPA 4.07/4.3</div>
              </div>
              <div>
                <div className="font-semibold text-slate-900">B.Sc., Software Engineering</div>
                <div>Shiraz University, Shiraz, Iran</div>
                <div className="text-slate-500">2013 – 2018</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="resume-section-title">Publication</h2>
            <div className="mt-1.5 text-[12px] leading-[1.4] text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">MTLV: A Library for Building Multi-task Learning Architectures for NLP</span>
                <br />
                ACM Symposium on Document Engineering (DocEng), 2021
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

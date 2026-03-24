const projects = [
  {
    title: "Multi-agent Support Automation",
    period: "2025 – present",
    org: "Pythonic AI",
    description:
      "Architected an LLM-powered multi-agent support workflow to triage incoming requests, execute routine code and configuration changes, and escalate ambiguous cases to humans. Combined tool-using agents, retrieval, and human-in-the-loop review to reduce manual engineering effort and speed up support resolution.",
    stack: ["Python", "LLM APIs", "Multi-agent orchestration", "RAG", "Human-in-the-loop", "Prompt engineering"],
    links: [],
  },
  {
    title: "Production NLP Services",
    period: "2022 – present",
    org: "Pythonic AI",
    description:
      "Led development and deployment of 3 production NLP services for document understanding, serving real-world extraction and classification workflows. Acted as primary technical owner for one service and built evaluation pipelines to measure model quality across releases and support reliable iteration.",
    stack: ["Python", "PyTorch", "Transformers", "Docker", "REST APIs", "MLflow"],
    links: [],
  },
  {
    title: "Biomedical NLP Research",
    period: "2020 – 2022",
    org: "Imagia",
    description:
      "Researched and built NLP pipelines for clinical report analysis — including de-identification, named entity recognition, and measurement extraction. Applied transformer-based models (BioBERT, ClinicalBERT) to real-world hospital data.",
    stack: ["Python", "PyTorch", "spaCy", "BioBERT", "Hugging Face", "CLI tooling"],
    links: [],
  },
  {
    title: "MTLV: Multi-task Learning Library",
    period: "2020 – 2021",
    org: "Dalhousie University",
    description:
      "CLI library for exploring four multi-task learning architectures with pre-trained language models. Proposed a novel task-clustering approach that improved cross-task transfer. Published at ACM DocEng-2021; served as M.Sc. thesis.",
    stack: ["Python", "PyTorch", "BERT", "BioBERT", "BlueBERT", "Hugging Face"],
    links: [
      {
        label: "Paper (DocEng-2021)",
        href: "https://dl.acm.org/doi/abs/10.1145/3469096.3474926",
      },
      {
        label: "Thesis",
        href: "https://dalspace.library.dal.ca/bitstream/handle/10222/80424/FatemehRahimi2021.pdf?sequence=1",
      },
    ],
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
      {label}
    </span>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Featured Projects
        </h2>
        <p className="text-slate-500 text-sm mb-10">
          Production and research highlights
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900 text-base leading-snug">
                    {project.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  {project.org} · {project.period}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Tag key={tech} label={tech} />
                ))}
              </div>

              {project.links.length > 0 && (
                <div className="flex gap-4 pt-1">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

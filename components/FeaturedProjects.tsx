const projects = [
  {
    title: "Multi-agent Support Automation",
    period: "2023 – present",
    org: "Pythonic AI",
    description:
      "LLM-based multi-agent system that automates triage and resolution of support emails involving routine code and configuration changes. Reduces manual load on the engineering team.",
    stack: ["Python", "LLM APIs", "Multi-agent orchestration", "RAG"],
    links: [],
  },
  {
    title: "MTLV: Multi-task Learning Library",
    period: "2020 – 2021",
    org: "Dalhousie University",
    description:
      "CLI library for exploring four multi-task learning architectures with pre-trained language models. Proposed a novel task-clustering approach. Published at DocEng-2021; served as M.Sc. thesis.",
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

import Link from "next/link";

const skillGroups = [
  {
    group: "Languages",
    items: ["Python", "SQL"],
  },
  {
    group: "LLMs & GenAI",
    items: [
      "Hugging Face Transformers",
      "RAG pipelines",
      "LangChain / LangGraph",
      "OpenAI API",
      "Anthropic API",
      "Multi-agent orchestration",
      "Prompt engineering",
      "LLM evaluation",
    ],
  },
  {
    group: "ML / DL",
    items: ["PyTorch", "scikit-learn", "MLflow", "Model fine-tuning (PEFT / LoRA)"],
  },
  {
    group: "NLP",
    items: [
      "spaCy",
      "NLTK",
      "BERT / RoBERTa / ELECTRA",
      "Document understanding",
      "Named entity recognition",
      "Text classification",
    ],
  },
  {
    group: "Data & Experimentation",
    items: ["NumPy", "pandas", "Jupyter", "A/B testing", "Statistical analysis"],
  },
  {
    group: "Infrastructure",
    items: ["Git", "Docker", "REST APIs", "MySQL", "tmux"],
  },
];

const skillLinks: Record<string, string> = {
  tmux: "/blog?tag=tmux",
};

function Pill({ label }: { label: string }) {
  const href = skillLinks[label];
  const cls = "inline-block bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full";
  if (href) {
    return (
      <Link href={href} className={`${cls} hover:bg-blue-50 hover:text-blue-600 transition-colors`}>
        {label} ↗
      </Link>
    );
  }
  return <span className={cls}>{label}</span>;
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Skills</h2>
        <p className="text-slate-500 text-sm mb-10">
          Core technologies and competencies
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.group}
              className="bg-white rounded-xl border border-slate-200 p-5"
            >
              <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Pill key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

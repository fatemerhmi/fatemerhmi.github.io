const skillGroups = [
  {
    group: "Languages",
    items: ["Python"],
  },
  {
    group: "LLMs & GenAI",
    items: [
      "Hugging Face Transformers",
      "RAG pipelines",
      "LangChain",
      "OpenAI API",
      "Anthropic API",
      "Multi-agent frameworks",
    ],
  },
  {
    group: "ML / DL",
    items: ["PyTorch", "scikit-learn", "MLflow"],
  },
  {
    group: "NLP",
    items: [
      "spaCy",
      "NLTK",
      "BERT / RoBERTa / ELECTRA",
      "Document understanding",
    ],
  },
  {
    group: "Data",
    items: ["NumPy", "pandas", "Jupyter"],
  },
  {
    group: "Databases",
    items: ["MySQL", "SQL"],
  },
  {
    group: "DevOps",
    items: ["Git", "Docker"],
  },
];

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Skills</h2>
        <p className="text-slate-500 text-sm mb-10">
          Technologies I work with daily
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

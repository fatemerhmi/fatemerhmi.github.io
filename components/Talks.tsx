const talks = [
  {
    title: "Compound AI Systems",
    date: "March 2025",
    description:
      "Explores the shift from thinking about AI as isolated models to understanding them as complex systems. Covers how system-level thinking enables smaller, more efficient AI that outperforms simplistic large-scale models — with a focus on safety, optimization, and real-world performance.",
    tags: ["Compound AI", "System design", "LLMs", "Safety"],
    links: [
      {
        label: "Slides",
        href: "https://fatemerhmi.github.io/coffee-gen-ai/talks/Compound_AI_Systems-Fatemeh_Rahimi-March_2025.pdf",
      },
      {
        label: "Blog post",
        href: "https://fatemerhmi.github.io/coffee-gen-ai/talks/Compound_AI_Systems",
      },
    ],
  },
  {
    title: "Trends in LLM Collaboration — Debaters and Judges in Agentic AI Systems",
    date: "January 2025",
    description:
      "Covers the latest trends in LLM collaboration, highlighting agentic AI systems. Explores how collaboration, debates, and LLM-as-a-judge techniques improve AI workflows, with practical strategies for real-world implementation.",
    tags: ["Agentic AI", "LLM collaboration", "Multi-agent", "Productivity"],
    links: [
      {
        label: "Slides",
        href: "https://fatemerhmi.github.io/coffee-gen-ai/talks/Trends_in_LLM_Collaboration-Fatemeh_Rahimi-Jan_2025.pdf",
      },
      {
        label: "Blog post",
        href: "https://fatemerhmi.github.io/coffee-gen-ai/talks/Latest_AI_Trends_in_LLM_Collaborations",
      },
    ],
  },
];

export default function Talks() {
  return (
    <section id="talks" className="bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Talks</h2>
        <p className="text-slate-500 text-sm mb-10">
          Public talks and presentations
        </p>

        <div className="flex flex-col gap-4">
          {talks.map((talk) => (
            <div
              key={talk.title}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{talk.date}</p>
                  <h3 className="font-semibold text-slate-900 text-base leading-snug">
                    {talk.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {talk.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {talk.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-50 text-blue-700 font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {talk.links.map((link) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

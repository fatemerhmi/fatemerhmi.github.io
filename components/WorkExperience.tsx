const jobs = [
  {
    title: "Senior NLP Scientist",
    company: "Pythonic AI",
    companyUrl: "https://www.pythonic.ai/",
    location: "Milwaukee, WI, US (Remote)",
    period: "Feb 2022 – Present",
    bullets: [
      "Led end-to-end development of 3 production NLP services; primary contributor and technical owner for one",
      "Designed and built a multi-agent LLM framework to automate triaging and resolution of support emails involving routine code/configuration changes",
      "Developed automation tooling to streamline team workflows across data labeling, sprint planning, and QA",
      "Authored labeling guidelines and coordinated cross-functional annotation pipelines",
      "Established project management infrastructure from scratch; ran sprint ceremonies and stakeholder coordination",
    ],
    highlight: true,
  },
  {
    title: "Applied Research Scientist – NLP",
    company: "Imagia",
    companyUrl: "https://imagia.com",
    location: "Montreal, Canada (Remote)",
    period: "Nov 2020 – Jan 2022",
    bullets: [
      "Performed research on hospital clinical reports in the biomedical NLP domain",
      "Contributed to de-identification development and research stack",
      "Researched Named Entity Recognition and measurement extraction with rule-based and SOTA language models",
      "Designed CLI tools for applying Transformer-based models to real-world biomedical data",
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
      "Applied deep language models (BERT, BioBERT, BlueBERT) to downstream NLP tasks",
      "Developed MTLV — a CLI library for multi-task learning architectures (thesis project, DocEng-2021)",
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
        <p className="text-slate-500 text-sm mb-10">Career history</p>

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

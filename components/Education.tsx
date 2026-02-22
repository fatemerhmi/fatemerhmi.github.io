const degrees = [
  {
    degree: "M.Sc. Computer Science",
    institution: "Dalhousie University",
    location: "Halifax, Canada",
    period: "May 2019 – April 2021",
    detail: "GPA 4.07/4.3 · Thesis: MTLV multi-task learning library",
  },
  {
    degree: "B.Sc. Software Engineering",
    institution: "Shiraz University",
    location: "Shiraz, Iran",
    period: "Sep 2013 – Feb 2018",
    detail: "Senior project: Kitchen Safety IoT system",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Education</h2>
        <p className="text-slate-500 text-sm mb-10">Academic background</p>

        <div className="flex flex-col gap-4">
          {degrees.map((deg, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <h3 className="font-semibold text-slate-900">{deg.degree}</h3>
                <p className="text-sm text-slate-500">
                  {deg.institution} · {deg.location}
                </p>
                <p className="text-sm text-slate-500 mt-1">{deg.detail}</p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">
                {deg.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

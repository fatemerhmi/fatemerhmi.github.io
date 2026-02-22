const publications = [
  {
    title:
      "MTLV: A Library for Building Multi-task Learning Architectures for NLP",
    authors: "Rahimi, F., Milios, E., Matwin, S.",
    venue: "DocEng 2021 — ACM Symposium on Document Engineering",
    year: "2021",
    doi: "https://dl.acm.org/doi/abs/10.1145/3469096.3474926",
    thesis:
      "https://dalspace.library.dal.ca/bitstream/handle/10222/80424/FatemehRahimi2021.pdf?sequence=1",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Publications</h2>
        <p className="text-slate-500 text-sm mb-10">Peer-reviewed research</p>

        <div className="flex flex-col gap-4">
          {publications.map((pub, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-xl border border-slate-200 p-6"
            >
              <h3 className="font-semibold text-slate-900 mb-1">
                {pub.title}
              </h3>
              <p className="text-sm text-slate-500 mb-1">{pub.authors}</p>
              <p className="text-sm text-blue-700 font-medium mb-4">
                {pub.venue} · {pub.year}
              </p>
              <div className="flex gap-4">
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  View paper →
                </a>
                <a
                  href={pub.thesis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-blue-600 hover:underline font-medium"
                >
                  Thesis →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

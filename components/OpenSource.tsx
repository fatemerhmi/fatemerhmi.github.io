const contributions = [
  {
    repo: "Softeria/ms-365-mcp-server",
    repoUrl: "https://github.com/Softeria/ms-365-mcp-server",
    prTitle: "feat: add move/rename and create folder tools for OneDrive",
    prUrl: "https://github.com/Softeria/ms-365-mcp-server/pull/345",
    description:
      "Added two new OneDrive tools to this MCP server for Microsoft 365 — move/rename files and folders in a single PATCH request, and create new folders with conflict behavior support. Closes a workflow gap where users couldn't reorganize their OneDrive without leaving the AI assistant.",
    status: "Open" as const,
    stack: ["TypeScript", "Microsoft Graph API", "MCP", "Files.ReadWrite"],
  },
  {
    repo: "Softeria/ms-365-mcp-server",
    repoUrl: "https://github.com/Softeria/ms-365-mcp-server",
    prTitle: "feat: add create, update, and delete mail folder tools",
    prUrl: "https://github.com/Softeria/ms-365-mcp-server/pull/276",
    description:
      "Added four new tools to this MCP server for Microsoft 365 — create, create child, rename, and delete mail folders via the Microsoft Graph API. Closes a workflow gap where users couldn't set up destination folders before moving messages.",
    status: "Merged" as const,
    stack: ["TypeScript", "Microsoft Graph API", "MCP", "Mail.ReadWrite"],
  },
];

const statusStyles = {
  Merged: "bg-purple-50 text-purple-700",
  Open: "bg-green-50 text-green-700",
  Closed: "bg-slate-100 text-slate-500",
};

export default function OpenSource() {
  return (
    <section id="opensource" className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Open Source
        </h2>
        <p className="text-slate-500 text-sm mb-10">
          Contributions to public projects
        </p>

        <div className="flex flex-col gap-4">
          {contributions.map((c) => (
            <div
              key={c.prUrl}
              className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <a
                    href={c.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {c.repo}
                  </a>
                  <h3 className="font-semibold text-slate-900 text-base mt-0.5">
                    <a
                      href={c.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {c.prTitle}
                    </a>
                  </h3>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0 ${statusStyles[c.status]}`}
                >
                  {c.status}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {c.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {c.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

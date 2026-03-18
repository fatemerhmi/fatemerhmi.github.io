---
title: "I Built a Personal AI Orchestrator with Claude Code — Here's How It Actually Works"
date: 2026-02-22
tags: [AI, Claude, multi-agent, orchestration, personal-tooling]
draft: true
---

# I Built a Personal AI Orchestrator with Claude Code — Here's How It Actually Works

Most AI assistant demos show you a chatbot. One box, one model, one conversation. That's fine for answering questions, but it's not how I want to run my life.

I want something that knows my job search status, can read my emails, understands my learning goals, and can work across all of them without me manually copying context between windows. I want an orchestrator — a system that delegates, not just responds.

So I built Sage.

This post is about the architecture. Not the aspirational version — the actual thing I have running today, what it does well, and what I haven't figured out yet.

---

## What Sage Is (And What It Isn't)

Sage is not a monolithic AI assistant. It's a **coordination layer** built on top of Claude Code that delegates specialized work to domain-specific sub-agents.

The orchestrator — Claude Code itself — reads a shared state file, decides what needs attention, and spawns sub-agents via Claude Code's Task tool. Each sub-agent is scoped to one domain and lives in its own directory with its own instructions and knowledge.

What Sage is *not*: it's not an autonomous agent running in the background, making decisions while I sleep. It runs when I invoke it. It drafts, summarizes, and plans — but anything that touches the outside world (email, calendar) goes through Python tools with hard guardrails. No emails sent. No applications submitted. No portfolio changes pushed without a diff shown first.

I built the guardrails before I built the features. That decision matters more than any architectural choice below.

---

## The Architecture in Five Concepts

### 1. The Orchestrator Pattern

The central idea: **one agent coordinates many specialists instead of one agent trying to do everything**.

Claude Code acts as the orchestrator. When invoked, it:
1. Reads `sage/state.md` — the shared memory file that persists high-level context across sessions
2. Asks relevant sub-agents to report their current state
3. Decides what needs to happen and in what order
4. Delegates to the right agent, synthesizes results, and updates state

This sounds obvious but the alternative — a single giant system prompt with all context crammed in — falls apart fast. Context windows fill up. The model loses track. Worse, everything becomes equally important, which means nothing is.

Specialization forces you to think clearly about what each agent actually needs to know.

### 2. State File as Shared Memory

Agents don't share memory natively. Each Task invocation is a fresh context window.

The solution is brutally simple: a Markdown file (`sage/state.md`) that holds the current high-level agenda, priorities, and anything the orchestrator needs to remember across sessions.

Before planning anything, Sage reads this file. After completing a session, Sage updates it.

It's not elegant. It's a text file. But it works, it's human-readable, and I can edit it directly when I want to steer priorities without going through the AI. That last part matters more than I expected — having a human-legible shared state means I'm always in the loop, not just a passenger.

[PLACEHOLDER: Once I've run this for a few months, I want to compare this flat-file approach against something like a proper memory layer (MemGPT-style persistent memory, or even just a structured JSON state). What breaks first with the flat file? Probably ordering and staleness — I'll document that when it happens.]

### 3. Hard Guardrails

Every agent that touches the outside world goes through Python tools in `sage/agents/`. These are not LLM calls — they are real Python functions with real constraints baked in.

The email tool can: read messages, label them, draft replies, check urgency.
The email tool cannot: send.

That's not a prompt instruction. It's a missing function. There is no `send_email()` to call. If the LLM hallucinates a send call, it fails at the tool layer, not at the model layer.

Same for job applications: no submission function exists. Same for the portfolio: changes get diffed and shown, never pushed to `master` autonomously.

[PLACEHOLDER: I want to write a proper section here once I've hit a guardrail failure in practice — a case where the model tried to do something the guardrails caught. I expect this will happen eventually and it'll be the most instructive part of this story.]

### 4. Directory-Scoped Agents

Each sub-agent lives in its own directory and has its own `CLAUDE.md` — a file that tells Claude Code who this agent is, what it knows, and what it's responsible for.

| Agent | Domain | Directory |
|---|---|---|
| Job Hunting Agent | Job search, applications, skill gaps | `/Users/fatemeh/fatemerhmi/Job Hunting` |
| Portfolio Agent | Website, showcasing work | `/Users/fatemeh/fatemerhmi/fatemerhmi.github.io` |
| Learning Agent | Skills, learning plans | `/Users/fatemeh/fatemerhmi/Fati's AI journey` |
| Public Learning Agent | Publishing learnings publicly | `/Users/fatemeh/fatemerhmi/coffee-gen-ai` |
| Projects Agent | Existing unfinished projects | `/Users/fatemeh/fatemerhmi/github projects` |

The scoping is intentional. The Portfolio Agent should not know about my job application status. The Job Hunting Agent should not be able to modify my website. These are domain boundaries, not just organizational ones.

When the orchestrator spawns a sub-agent, it passes the agent's directory path explicitly and tells it to read its `CLAUDE.md` first. The agent then has everything it needs to operate: its own instructions, its own data, and a specific task from the orchestrator.

### 5. The Delegation Protocol

This is the piece that took the most iteration to get right.

The naive approach: "Hey agent, do your thing and report back." This produces garbage. The agent doesn't know what you want, doesn't know what format to return, and often does too much or too little.

The protocol I landed on requires the orchestrator to:

1. **Give the agent its absolute directory path explicitly** — the Task tool does not set a working directory automatically
2. **Tell the agent to read its CLAUDE.md first** — so it loads its own instructions before doing anything
3. **Give a specific, scoped goal** — not "look at emails," but "summarize the 5 most recent emails and flag any that need a response within 24 hours"
4. **Ask for a structured summary back** — so the orchestrator can synthesize across multiple agent reports without re-reading raw data

The structured return is underrated. When the orchestrator gets clean, parseable summaries from each agent, the synthesis step is easy. When agents return walls of raw text, the orchestrator spends most of its context window just parsing what happened.

[PLACEHOLDER: I want to publish the actual prompt templates I use for delegation once they stabilize. They're good now but not good enough that I'm proud of them yet. The interesting engineering is in how you structure the "return a structured summary" instruction — what fields you ask for, how specific you get.]

---

## What I Use for the Python Layer

The email tooling uses Gmail's API with OAuth. The Python layer handles:
- Reading and labeling messages
- Drafting replies (which the LLM writes, but the Python layer holds until I approve)
- Urgency classification

The agent layer uses LiteLLM, which lets me swap model providers without rewriting agent logic. Right now I'm running on Anthropic. The same code would work with a local Ollama model or OpenAI.

[PLACEHOLDER: I want to benchmark local vs. cloud models on specific agent tasks once the system is more stable. My hypothesis: for structured tasks with clear schemas (email triage, state file updates), smaller local models are competitive. For synthesis and planning, the gap is larger.]

---

## What This Is Not

It's not a LangGraph workflow. It's not an AutoGPT loop. It's not LangChain.

[PLACEHOLDER: Once I've spent more time with LangGraph specifically, I want to write a real comparison here. My current read: LangGraph gives you explicit graph structure and better observability for complex workflows. What I have is simpler and works well for my use case, but I don't have enough production experience yet to say when you'd want one vs. the other. I'll update this.]

It's also not production software. It's personal tooling. The difference matters for how I evaluate it — it doesn't need to scale, it needs to not annoy me.

---

## What Actually Surprised Me

**The hardest problem was context management, not model capability.**

The models are good enough. What breaks systems like this is context bleed — one agent's knowledge leaking into another's scope, or the orchestrator accumulating so much state that its reasoning degrades.

The directory-scoped model helps here. By design, agents only see what's in their directory. The state file is the only shared channel, and it's intentionally minimal.

**Writing CLAUDE.md files is actually system design.**

The instructions you write for each agent are specifications. If they're vague, the agent is vague. If they're contradictory, the agent makes arbitrary choices. I spent more time on the CLAUDE.md files than I expected, and that time paid off more than tweaking prompts.

**Guardrails before features.**

I said this above but it bears repeating. I built the "no send" constraint before I built any email capability. I built the "show diff before pushing" rule before I let the Portfolio Agent touch any HTML. Doing it in this order meant I never had a scary moment where the system did something I didn't want.

[PLACEHOLDER: I want to add a specific anecdote here once I have one — a case where the guardrail constraint forced me to think harder about what I actually wanted, rather than just letting the model do the obvious thing.]

---

## What I'm Building Next

- **Calendar integration** — same pattern as email: read-only Python tool, LLM summarizes and suggests, I confirm any changes

- **Job application pipeline** — the Job Hunting Agent tracks applications and skill gaps; I want to close the loop so it can propose portfolio additions based on gaps, route them to the Portfolio Agent for drafting, and show me a diff before anything changes

[PLACEHOLDER: timeline for calendar integration — probably Q2 2026 but depends on how the email tooling stabilizes first]

- **Cross-agent memory** — right now state.md is flat and manual. I want to explore whether I can generate structured state automatically at session end, and what breaks when I do

[PLACEHOLDER: I need to actually try this before writing about it. The interesting failure mode is probably state file bloat — it grows every session and the orchestrator starts spending too much context on reading it]

- **A real comparison with other orchestration frameworks** — I deliberately built this from scratch to understand the problem before reaching for abstractions. At some point I want to honestly evaluate whether LangGraph or another framework would serve me better for specific parts of this

[PLACEHOLDER: This section will get more concrete as I run the system longer. Right now I don't have enough real usage to know what the actual bottlenecks are.]

---

## Read More

If you want to dig into the actual prompt engineering and delegation patterns, I'm documenting that process in [my public AI learning notes](https://fatemerhmi.github.io/coffee-gen-ai) as I go.

[PLACEHOLDER: Add actual link to the Public Learning Agent's output once that's live]

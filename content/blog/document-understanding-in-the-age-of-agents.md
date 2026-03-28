---
title: "Reading \"Strategic Navigation or Stochastic Search?\": Document AI, Agents, and Evaluation"
date: 2026-03-28
type: Papers
tags: [document-ai, agents, evaluation, multimodal, papers]
draft: true
excerpt: "A paper note on how document understanding is shifting from static extraction toward agentic navigation, evidence gathering, and evaluation over document collections."
---

# Reading "Strategic Navigation or Stochastic Search?": Document AI, Agents, and Evaluation

I’ve been working on **document understanding** for the past four years at Pythonic AI. When I first started in this space, **LayoutLM** felt like a major breakthrough: it brought together layout, OCR, and visual information in a way that made tasks like named entity recognition over documents much more effective and practical [(Xu et al., 2020)](https://arxiv.org/abs/1912.13318). From there, the field kept evolving through models like **LayoutLMv2** [(Xu et al., 2021)](https://arxiv.org/abs/2012.14740), **DocFormer** [(Appalaraju et al., 2021)](https://arxiv.org/abs/2106.11539), and **Donut** [(Kim et al., 2022)](https://arxiv.org/abs/2111.15664), along with the broader rise of multimodal foundation models. As a result, building systems for parsing, extraction, classification, and question answering over documents became much more accessible than it used to be. And once that happened, the harder question was no longer just *can we build these systems?* but *how should we evaluate them — especially when they start behaving more like agents than static predictors?* I enjoyed reading **“Strategic Navigation or Stochastic Search? How Agents and Humans Reason Over Document Collections”** [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180), so I wanted to share it here — partly for anyone else interested in where document understanding is heading, and partly as a note for myself to come back to when I want a quick reminder. Enjoy :)

## From document parsing to document navigation

For a long time, document understanding was framed mostly as a set of familiar tasks:
- OCR
- layout analysis
- document classification
- field extraction
- named entity recognition
- question answering over a document

Those tasks still matter. But they do not fully capture what many real-world document workflows look like.

In practice, useful document systems often need to deal with:
- many documents, not one
- heterogeneous PDF structures
- noisy or incomplete evidence
- questions that require comparing information across files
- iterative search rather than one-shot extraction

That is part of why I found **MADQA**, introduced in **“Strategic Navigation or Stochastic Search? How Agents and Humans Reason Over Document Collections”** [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180), so interesting. The paper shifts the focus from static document prediction toward a more agentic setting: navigating a collection of documents, finding evidence, and answering questions efficiently.

## What this paper is really asking

The central question of the paper is simple but important:

> Are document agents actually reasoning strategically, or are they mostly searching around until they find something that works? [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180)

That distinction matters because a system can still produce the correct final answer even if the path it took was wasteful, repetitive, or poorly planned.

The authors introduce **MADQA**, a benchmark with **2,250 human-authored questions grounded in 800 heterogeneous PDF documents** [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180). The setup is not just about retrieving one chunk and answering. It is about navigating a document collection in a way that looks closer to real search and reasoning behavior.

What makes the framing useful is that the paper does not stop at accuracy. It also looks at **effort**.

## Why accuracy alone is not enough

This was the main takeaway for me.

If two systems answer a question correctly, standard evaluation might treat them as equally good. But in practice, they may have behaved very differently.

For example, imagine a system is asked: **“Across a collection of company reports, when did the organization first commit to a net-zero target?”** A strong agent would not search every document equally. It would prioritize likely sources such as sustainability reports, search for the relevant terms, compare evidence across years, and stop once the answer is supported. A weaker agent might still reach the same conclusion, but only after opening many irrelevant files, repeating similar searches, and wasting effort along the way.

One system might:
- identify the right document quickly
- gather the right evidence
- take only a few meaningful steps

Another might:
- open many irrelevant documents
- repeat similar searches
- get stuck in loops
- eventually land on the right answer through brute force

Those are not the same capability.

That is why I like the paper’s focus on the **accuracy-effort tradeoff** [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180). Correctness still matters, of course, but for agentic systems it is only part of the story. We should also care about:
- how many steps the system took
- whether it followed a sensible evidence path
- whether it wasted compute
- whether it adapted when its first search failed

That feels like a much more honest way to evaluate document agents.

## Strategic navigation vs. stochastic search

The title of the paper is doing real work.

**Strategic navigation** suggests an agent that has some coherent search behavior:
- it chooses promising paths
- updates its plan based on what it finds
- avoids redundant exploration
- stops when it has enough evidence

**Stochastic search** suggests something looser:
- repeated probing
- weak planning
- trial and error
- more effort used to compensate for poor strategy

To be clear, stochastic methods are not inherently bad. Randomness and probabilistic exploration are useful in many settings, including optimization and search. But in the context of this paper, the phrase is pointing to a real weakness: agents may sometimes look stronger than they are because brute-force exploration can mask poor planning [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180).

That is especially important in document settings, where bad search behavior can quickly become expensive.

## Human-level accuracy is not the full story

One of the most interesting results in the paper is that strong agents can approach human-level accuracy in raw performance, but they do not necessarily solve the same problems the same way [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180).

That is a useful reminder that “human-level” is often an incomplete claim.

An agent may match humans on the final score while still:
- taking many more steps
- relying on much broader search
- failing on questions humans solve strategically
- getting stuck in loops humans would avoid

So even when aggregate accuracy looks strong, the underlying capability may still be quite different.

This is why I think evaluation is becoming one of the most interesting parts of the field. Once systems become more agentic, the key question is not just *what answer did they give?* but also *how did they get there?*

## A useful expansion in document AI evaluation

What I like about this paper is not that it replaces the older view of document AI, but that it expands it in a useful direction.

A lot of document understanding work still depends on strong foundations such as OCR, layout modeling, extraction, classification, and question answering. Those problems have not gone away. But when systems start operating over **collections** of documents rather than single pages or single files, a different challenge appears: not just reading documents correctly, but **navigating them efficiently and reasoning across them well**.

That is where this paper feels valuable to me. It does not argue that all of document AI should now be treated as agentic search. But it does show that for multi-document workflows, we need richer evaluation methods — ones that capture search strategy, evidence gathering, and effort, not just final-answer accuracy [(Borchmann et al., 2026)](https://arxiv.org/abs/2603.12180).

That feels especially relevant for systems like:
- contract review assistants
- policy and compliance search tools
- document-heavy enterprise copilots
- multi-document research agents
- workflow systems that reason over reports, forms, manuals, and records

As these systems become easier to build, evaluation becomes more important, not less.

## Why this paper stuck with me

I liked this paper because it sits at an intersection I care about: **document understanding, multimodal systems, agents, and evaluation**.

It also captures something that feels true far beyond this benchmark: a system producing the right answer does not automatically mean it is reasoning well. Sometimes it means the system is genuinely capable. Sometimes it means it had enough time, enough compute, and enough chances to stumble into the answer.

That distinction matters if we care about building systems that are not just impressive in demos, but useful, efficient, and trustworthy in practice.

For me, that is what makes this paper worth remembering.

## Final takeaway

If I had to reduce the paper to one idea, it would be this:

> In agentic document systems, the final answer is not the whole story; navigation strategy, evidence quality, and effort are part of the capability too.

And that feels like a good direction for the field.

## References

- **Xu, Y., Li, M., Cui, L., Huang, S., Wei, F., & Zhou, M. (2020).** LayoutLM: Pre-training of Text and Layout for Document Image Understanding. arXiv. <https://arxiv.org/abs/1912.13318>
- **Xu, Y., Lv, T., Cui, L., Wei, F., Wang, G., Lu, Y., Florencio, D., Zhang, C., Che, W., & Zhang, M. (2021).** LayoutLMv2: Multi-modal Pre-training for Visually-Rich Document Understanding. arXiv. <https://arxiv.org/abs/2012.14740>
- **Appalaraju, S., Jasani, B., Udupa, S., & Xiong, P. (2021).** DocFormer: End-to-End Transformer for Document Understanding. arXiv. <https://arxiv.org/abs/2106.11539>
- **Kim, G., Hong, T., Yim, M., Nam, J., Park, J., Yim, J., et al. (2022).** OCR-free Document Understanding Transformer. arXiv. <https://arxiv.org/abs/2111.15664>
- **Borchmann, Ł., Van Landeghem, J., Turski, M., Padarha, S., Kearns, R. O., Mahdi, A., Niels Rogge, Clémentine Fourrier, Siwei Han, Huaxiu Yao, Artemis Llabrés, Yiming Xu, Dimosthenis Karatzas, Hao Zhang, & Anupam Datta. (2026).** Strategic Navigation or Stochastic Search? How Agents and Humans Reason Over Document Collections. arXiv. <https://arxiv.org/abs/2603.12180>

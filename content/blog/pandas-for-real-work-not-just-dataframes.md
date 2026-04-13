---
title: "pandas for real work, not just DataFrames"
date: 2026-04-12
type: Tools
tags: [pandas, python, data, developer-tools]
draft: false
excerpt: "pandas is one of the most useful tools in Python for inspecting messy data, cleaning it up, and moving quickly from question to answer."
---

pandas is still one of the most practical tools in Python.

I use it when I need to:

- inspect messy tabular data quickly
- clean, transform, and join datasets
- validate outputs from ML or NLP pipelines
- do lightweight analysis without overengineering the workflow

What I like about pandas is that it helps me move fast in the early and middle stages of work.

You can load data, spot problems, test assumptions, and get to something useful quickly. That matters a lot in real projects, where the first job is often just figuring out what is actually in the data.

## A few simple DataFrame patterns

Create a DataFrame from a dictionary:

```python
import pandas as pd

df = pd.DataFrame(
    {
        "name": ["Alice", "Bob", "Charlie"],
        "score": [91, 84, 88],
        "passed": [True, True, True],
    }
)
```

Create a DataFrame from a list of records:

```python
rows = [
    {"ticket_id": 101, "priority": "high", "status": "open"},
    {"ticket_id": 102, "priority": "low", "status": "closed"},
    {"ticket_id": 103, "priority": "medium", "status": "open"},
]

df = pd.DataFrame(rows)
```

Read a CSV and inspect the first few rows:

```python
df = pd.read_csv("results.csv")
print(df.head())
print(df.columns)
```

Filter rows and create a new column:

```python
open_tickets = df[df["status"] == "open"].copy()
open_tickets["is_urgent"] = open_tickets["priority"] == "high"
```

Group and summarize:

```python
summary = df.groupby("priority")["ticket_id"].count().reset_index(name="count")
```

These are small examples, but this is exactly why pandas is useful. You can go from raw data to something inspectable and decision-ready in a few lines.

It is not the answer to everything, and for very large-scale data work you may need other tools. But for day-to-day analysis, debugging, experimentation, and workflow support, pandas earns its place.

I will expand this post later with more realistic examples from NLP and applied AI workflows.
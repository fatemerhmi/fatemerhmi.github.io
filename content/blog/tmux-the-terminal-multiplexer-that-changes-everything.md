---
title: "tmux: The Terminal Multiplexer That Changes How You Work"
date: 2026-03-17
type: Tools
tags: [tmux, terminal, developer-tools, productivity, claude-code]
draft: false
excerpt: "tmux lets you run multiple terminal sessions, split your screen into panes, and keep work running even after you disconnect. Here's everything you need to know, shortcuts and all."
---

# tmux: The Terminal Multiplexer That Changes How You Work

If you've ever lost work because your SSH connection dropped, or found yourself juggling five terminal tabs to run a server, edit a file, and tail logs, tmux is the fix.

tmux (terminal multiplexer) lets you:

- **Split one terminal into multiple panes** side by side or stacked
- **Create multiple windows** (like browser tabs) inside a single session
- **Detach and reattach**: your processes keep running even after you close the terminal
- **Name and switch between projects** without touching your mouse

Once you start using it, you won't go back.

## A Real Example: Claude Code Multi-Agent Setup

Here's what got me hooked. When running [Claude Code](https://claude.ai/code) in multi-agent mode, you often want several agents working in parallel: one orchestrating, others doing sub-tasks. The cleanest way to manage this is with tmux.

A typical setup looks like this:

```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│   orchestrator      │   sub-agent 1       │
│   claude code       │   (file edits)      │
│                     │                     │
├─────────────────────┼─────────────────────┤
│                     │                     │
│   sub-agent 2       │   logs / output     │
│   (web search)      │                     │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

Each pane runs independently. You can watch them all at once, zoom into any one, and the whole setup survives a terminal restart via a single `tmux attach`. No more juggling tabs or restarting agents.

---

## The Three-Layer Architecture

Before diving into shortcuts, understand how tmux is structured:

```
Server
 └── Session (e.g., "work", "personal")
      └── Window (like a tab)
           └── Pane (a split within a window)
```

- **Sessions** are the top level. One per project. They persist after you detach.
- **Windows** are tabs within a session. Full-screen, switchable by number.
- **Panes** are splits within a window. Each runs its own shell.

---

## The Prefix Key

Every tmux shortcut starts with the **prefix key**: press it first, then the command.

The default is `Ctrl+B`. Many people remap it to `Ctrl+A` (like GNU Screen) or `Ctrl+Space`.

To remap in `~/.tmux.conf`:

```bash
unbind C-b
set -g prefix C-Space
bind C-Space send-prefix
```

From here, when I write `prefix + d`, I mean: press your prefix key, release, then press `d`.

---

## Session Management

Sessions are your projects. Create one per context, name them, and switch freely.

| What you want to do | How |
|---------------------|-----|
| Start a new named session | `tmux new -s myproject` |
| List all sessions | `tmux ls` |
| Attach to a session | `tmux attach -t myproject` |
| Start or attach (idempotent) | `tmux new-session -A -s myproject` |
| **Detach** (leave session running) | `prefix + d` |
| Browse sessions interactively | `prefix + s` |
| Rename current session | `prefix + $` |
| Switch to next/previous session | `prefix + )` / `prefix + (` |
| Kill a session | `tmux kill-session -t myproject` |

The `tmux new-session -A -s name` pattern is worth memorizing: it starts the session if it doesn't exist, or attaches if it does. Great for shell aliases.

---

## Window Management

Windows are tabs. Switch between them by number or navigate sequentially.

| What you want to do | How |
|---------------------|-----|
| Create a new window | `prefix + c` |
| Rename current window | `prefix + ,` |
| Go to window by number | `prefix + 0–9` |
| Next / previous window | `prefix + n` / `prefix + p` |
| Last active window | `prefix + l` |
| Browse windows interactively | `prefix + w` |
| Close current window | `prefix + &` |

---

## Pane Management

Panes are where the real power lives. Split your window, run things in parallel, zoom in and out.

### Splitting

| What you want to do | How |
|---------------------|-----|
| Split vertically (left / right) | `prefix + %` |
| Split horizontally (top / bottom) | `prefix + "` |

**Tip:** add this to your config so new panes open in the same directory:

```bash
bind '"' split-window -v -c "#{pane_current_path}"
bind % split-window -h -c "#{pane_current_path}"
```

### Navigating

| What you want to do | How |
|---------------------|-----|
| Move to pane (arrow keys) | `prefix + ←/→/↑/↓` |
| Show pane numbers, then jump | `prefix + q`, then the number |
| Cycle to next pane | `prefix + o` |
| Go to last active pane | `prefix + ;` |

### Resizing

| What you want to do | How |
|---------------------|-----|
| Resize (1 cell) | `prefix + Ctrl+←/→/↑/↓` |
| Resize (5 cells) | `prefix + Alt+←/→/↑/↓` |

### Other pane tricks

| What you want to do | How |
|---------------------|-----|
| **Zoom pane to full screen** | `prefix + z` (toggle) |
| Break pane into its own window | `prefix + !` |
| Close current pane | `prefix + x` |
| Synchronize input to all panes | `prefix + :setw synchronize-panes` |
| Cycle through layouts | `prefix + Space` |

**Zoom (`prefix + z`) is the one I use most.** Zoom into a pane to focus, zoom out to see the full layout again.

---

## Copy Mode

Copy mode turns your terminal into a scrollable buffer, useful for reading output or copying text without a mouse.

| What you want to do | How |
|---------------------|-----|
| Enter copy mode | `prefix + [` |
| Exit copy mode | `q` |
| Paste buffer | `prefix + ]` |

Once inside copy mode (with vi keys enabled):

| What you want to do | How |
|---------------------|-----|
| Move around | `h/j/k/l` |
| Jump forward/back a word | `w` / `b` |
| Go to top / bottom | `g` / `G` |
| Search forward | `/` |
| Start selection | `v` |
| Copy selection | `y` |
| Rectangle select | `Ctrl+v` |
| Clear and exit | `Esc` |

Enable vi-style copy mode in `~/.tmux.conf`:

```bash
set-window-option -g mode-keys vi
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi C-v send-keys -X rectangle-toggle
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
```

---

## A Minimal Config to Start With

Here's a `~/.tmux.conf` that fixes the most common pain points:

```bash
# Remap prefix to Ctrl+Space
unbind C-b
set -g prefix C-Space
bind C-Space send-prefix

# Mouse support
set -g mouse on

# Start windows and panes at 1
set -g base-index 1
set -g pane-base-index 1
set-option -g renumber-windows on

# Open new panes in current directory
bind '"' split-window -v -c "#{pane_current_path}"
bind % split-window -h -c "#{pane_current_path}"

# Vi copy mode
set-window-option -g mode-keys vi
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel

# Reduce escape delay (important for Vim/Neovim)
set -sg escape-time 10

# Larger scrollback
set -g history-limit 50000

# Alt+H/L to cycle windows without prefix
bind -n M-H previous-window
bind -n M-L next-window
```

Apply changes without restarting: `prefix + :source ~/.tmux.conf`

---

## Useful Shell Aliases

```bash
alias ta='tmux attach -t'
alias tls='tmux ls'
alias tn='tmux new -s'
alias tk='tmux kill-session -t'
```

---

## Go Deeper

These are the resources I found most useful:

- **[Tmux has forever changed the way I write code](https://www.youtube.com/watch?v=nTqu6w2wc68)** by Dreams of Code (YouTube). The best modern introduction, covers config, plugins, and Neovim integration. Viral on Hacker News for a reason.
- **[tmuxcheatsheet.com](https://tmuxcheatsheet.com/)**: the cheat sheet to bookmark. Every shortcut, scannable.
- **[tmux Wiki: Getting Started](https://github.com/tmux/tmux/wiki/Getting-Started)**: the official deep dive. Read this when you want to understand *why* things work, not just *how*.
- **[MohamedAlaa's cheat sheet gist](https://gist.github.com/MohamedAlaa/2961058)**: the classic community reference, 16k+ stars, still holds up.
- **[A beginner's guide to tmux (Red Hat)](https://www.redhat.com/en/blog/introduction-tmux-linux)**: good framing if you're using tmux mostly over SSH.

---

The first time you close your terminal, reopen it, run `tmux attach`, and see everything exactly where you left it. That's when it clicks. Start with sessions and pane splitting, ignore plugins until you need them, and go from there.

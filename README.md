# RateMySchedule

RateMySchedule is an AI-assisted schedule optimizer for UT students. Instead of making students brute-force dozens of section combinations inside a registration portal, it turns schedule planning into a recommendation problem: tell the app what you need, what kind of week you want, and it returns ranked schedule paths with clear tradeoffs, weekly visualization, walking analysis, and calendar export.

Live preview: https://skill-deploy-q0taimznfh-codex-agent-deploys.vercel.app

## One-Line Pitch

The decision engine for building a higher-upside semester.

## The Problem

Students do not struggle because course catalogs are missing. They struggle because registration tools answer the wrong question.

Most tools answer:
- What classes exist?
- What sections are open?
- What times do they meet?

Students actually need help answering:
- Which of these schedules is worth living with for four months?
- Which option protects my sleep, commute, professor quality, and workload?
- Which tradeoff is smartest for me personally?

RateMySchedule is built for that decision.

## What The App Does

A student can:
- type a natural-language request like `I need SDS 322, CS 331, M 362K, SDS 375, and a writing flag course. No 8 AMs. Fridays off.`
- manually select hard requirements in the course picker
- express lifestyle preferences like `prefer TTH`, `avoid back-to-back`, `minimize walking`, or `strong professors`
- let the app intelligently treat flexible asks like `a writing flag course` or `one fun elective` as choose-one requirement slots
- compare ranked schedules side by side
- inspect each result in a weekly grid with visible course blocks, buildings, and professor names
- export the winning schedule to calendar and use a registration cheat sheet to act on it

## Why This Has Real Impact

RateMySchedule fits the problem statement because it solves a recurring, emotionally real workflow with clear downstream value. A better schedule changes how a student sleeps, commutes, studies, socializes, and performs academically.

Who it helps:
- UT students planning next semester
- first-years and transfer students who do not yet know the course landscape
- majors with rigid sequencing like CS, SDS, math, and business
- students balancing work, commuting, accessibility, and quality-of-life constraints

Why it can matter long term:
- the problem repeats every semester
- the value is instantly legible in a demo
- the product can grow into live catalog sync, real professor data, saved plans, and advisor collaboration
- it shifts schedule planning from section lookup to decision support

## Core User Flow

1. Enter requirements in plain English, manual course picks, or both.
2. Parse hard requirements separately from flexible requirement groups.
3. Generate conflict-free combinations from curated UT section data.
4. Score each schedule on professor quality, walking feasibility, workload balance, time fit, and seat availability.
5. Present the best schedule paths with explanations and readable comparisons.
6. Inspect the top option in a large weekly grid.
7. Export to calendar and use the registration sheet.

## Why The Demo Works

This project is strong on demo value because the transformation is immediate and visible.

A good live demo:
1. Start on the landing page and frame the problem in one sentence: registration tools show sections, not good schedules.
2. Enter a realistic student prompt.
3. Show that the parser respects hard requirements and handles flexible requirements intelligently.
4. Open the ranked results page and compare three schedule paths.
5. Click into a detail page and use the weekly grid to explain why one schedule is better than another.
6. Export the winner to calendar.

Why judges can watch it and understand it quickly:
- the input is natural language
- the output is visual and ranked
- the tradeoffs are explained in plain English
- the weekly grid makes the recommendation feel concrete
- the export flow proves the app is usable, not just conceptual

## How This Submission Matches The Judging Criteria

### 1. Impact (25%)

RateMySchedule is useful for a clear audience, solves a real problem, and has obvious room to grow. It is not a static planner or mockup. It is a product that helps students make better semester decisions under time pressure.

Why it scores here:
- real pain point
- specific user
- clear value proposition
- repeated long-term use case
- strong path to future expansion

### 2. Codex App (25%)

This project was built as a real Codex collaboration, not a single-pass generation. The app evolved through iterative product feedback, repeated debugging, and modular agent-style responsibilities.

Codex enabled the build by helping with:
- PRD-to-product implementation
- parallel inspection across UI, logic, and styling files
- repeated fixes to schedule ranking behavior
- debugging parser mistakes, Friday-off behavior, and comparison readability
- turning rough ideas into a polished, demo-ready experience

The architecture mirrors that workflow:
- `parserAgent` handles interpretation
- `optimizerEngine` handles generation and ranking
- `explainerAgent` handles naming and summaries
- `calendarAgent` handles export and downstream action

That separation makes the project feel like a true agentic app instead of a monolith.

### 3. Creative Use of Skills (25%)

This submission includes both coding work and non-technical technical work.

Technical work:
- schedule generation from structured and unstructured input
- course-group reasoning for flexible requirements
- multi-factor ranking based on real student needs
- readable schedule comparison UI and detail visualization

Non-technical technical work:
- interpreting two PRDs into a coherent product
- refining the UI through repeated visual feedback
- improving naming, explanations, and presentation quality
- using Codex skills like `copywriting` to make the README and pitch stronger for judges

That matters because strong software submissions are judged on product communication as well as implementation.

### 4. Demo & Pitch (25%)

This project is novel enough to be interesting and implemented enough to be credible. It is not a Figma concept, slide deck, or thin wrapper around a static table. It is a working application with an end-to-end loop from input to export.

What makes it pitchable:
- clear problem statement
- understandable before-and-after transformation
- visually strong results page
- standout weekly grid detail view
- real export behavior
- enough polish that the product feels believable today

## Technical Architecture

This is a React + Vite application with a lightweight local agent architecture.

Important modules:
- `src/agents/parserAgent.js`: interprets natural language and separates fixed requirements from choose-one requirement groups
- `src/agents/optimizerEngine.js`: generates candidate schedules and ranks conflict-free combinations
- `src/agents/explainerAgent.js`: produces schedule explanations and distinct nicknames
- `src/agents/calendarAgent.js`: creates `.ics` exports and registration support output
- `src/components/WeeklyGrid.jsx`: the primary decision surface for understanding a schedule at a glance
- `src/utils/scoring.js`: computes the ranking model across results

## Honest Scope Notes

This is a polished MVP built on curated UT data and local decision logic.

Current strengths:
- complete end-to-end product flow
- strong visual identity and interaction polish
- understandable ranking model
- useful weekly visualization
- real calendar export

Current limitations:
- catalog data is local, not live
- professor ratings and seat data are simulated in the curated dataset
- there is no persistence, auth, or advisor collaboration layer yet

Those are next-step scaling problems. The important thing for this submission is that the core loop already works and demos cleanly.

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Recommended Demo Prompt

```text
I need SDS 322, CS 331, M 362K, SDS 375, and a writing flag course. No 8 AMs, and I want Fridays off.
```

## Project Structure

```text
src/
  agents/
  components/
  context/
  data/
  pages/
  styles/
  utils/
```

## Closing Pitch

RateMySchedule is building the decision layer on top of course registration: not just what classes exist, but which semester is most worth choosing.

That shift from raw options to ranked decisions is the product, and that is where the long-term upside lives.


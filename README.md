# Node.js Mastery Lab

A progressive, practical guide to JavaScript and Node.js: topic notes, runnable examples, deliberate practice, interview revision, and a backend capstone.

Node.js is the JavaScript runtime created by Ryan Dahl. The goal is to understand how JavaScript behaves, how Node handles I/O and processes, and how to design, build, secure, and operate backend services.

## Start here

1. Check your tools with <code>node --version</code> and <code>npm --version</code>. Use a supported Node.js LTS release and verify it at [nodejs.org](https://nodejs.org/).
2. Follow the [learning roadmap](docs/roadmap.md) in order. Do not skip JavaScript foundations.
3. Read a topic, explain it from memory, and run a small experiment.
4. Attempt each [practice challenge](practice/README.md) before reading its reference solution.
5. Build the [capstone task API](projects/capstone-task-api.md), then revisit it with the security and reliability checklists.

## Curriculum

| Stage | Study |
| --- | --- |
| JavaScript foundations | [Values, scope, and control flow](docs/javascript/foundations.md) · [Functions, objects, and prototypes](docs/javascript/functions-objects-prototypes.md) · [Async JavaScript](docs/javascript/async.md) |
| Node.js core | [Runtime and event loop](docs/node/runtime-event-loop.md) · [Modules and npm](docs/node/modules-and-npm.md) · [Files and CLI](docs/node/filesystem-cli.md) |
| Backend engineering | [HTTP and API design](docs/node/http-and-api.md) · [Streams and buffers](docs/node/streams-buffers.md) · [Errors, logging, and config](docs/node/errors-logging-config.md) |
| Production skills | [Security](docs/node/security.md) · [Performance and workers](docs/node/performance-workers.md) · [Databases and reliability](docs/node/database-reliability.md) |
| Practice | [Challenges and solutions](practice/README.md) · [Interview questions](docs/interview/questions-and-answers.md) · [Capstone](projects/capstone-task-api.md) |

## Repository map

- <code>docs/</code>: topic notes, mental models, checklists, and interview review.
- <code>practice/challenges/</code>: prompts with acceptance criteria. Try these before solutions.
- <code>practice/solutions/</code>: reference implementations using built-in Node modules where practical.
- <code>projects/</code>: larger exercises combining multiple topics.
- Existing experiments in <code>real_chat/</code>, <code>server/</code>, <code>modules/</code>, and <code>files/</code> are retained.

## How to study

Predict behavior → run a small experiment → explain the result → solve a challenge → review edge cases. Keep a learning log of what you can explain, what you built, and what is still unclear. Mastery comes from building and debugging repeatedly, not reading notes once.

Official references are linked from the notes and collected in [resources](docs/resources.md). APIs and release support change; use documentation matching the Node version installed on your machine.

## License

Unless a separate license is added, treat this repository as personal learning material.

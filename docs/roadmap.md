# Node.js Mastery Roadmap

Follow this path from language fundamentals to production backend engineering. Spend more time where you cannot yet explain or apply the ideas.

## Stage 0 — Setup and habits

Install a supported Node.js LTS release from the official site. Learn the terminal, editor, Git, and Node REPL. Practice running a file with <code>node file.js</code>, checking help with <code>node --help</code>, and reading stack traces from the first useful frame.

**Ready to continue when:** you can run a script, pass command-line arguments, and explain Node.js versus npm.

## Stage 1 — JavaScript for Node

Read [foundations](javascript/foundations.md), [functions and objects](javascript/functions-objects-prototypes.md), then [async JavaScript](javascript/async.md). Practice scope, closures, <code>this</code>, object references, prototypes, promises, errors, and cancellation.

**Ready to continue when:** you can predict a short snippet and explain why.

## Stage 2 — Runtime and core APIs

Study [runtime and event loop](node/runtime-event-loop.md), [modules and npm](node/modules-and-npm.md), and [filesystem and CLI](node/filesystem-cli.md). Build small command-line tools with built-in modules such as <code>node:fs/promises</code>, <code>node:path</code>, and <code>node:process</code>. Handle malformed input and exit status deliberately.

**Ready to continue when:** you can explain how a process starts, imports a module, handles I/O, and exits.

## Stage 3 — Backend fundamentals

Study [HTTP and API design](node/http-and-api.md), then [buffers and streams](node/streams-buffers.md). Build a small HTTP service with request validation, clear status codes, safe JSON parsing, and graceful shutdown.

**Ready to continue when:** you can implement and consume an endpoint and explain streaming versus buffering.

## Stage 4 — Production concerns

Read [errors, logging, and configuration](node/errors-logging-config.md), [security](node/security.md), [performance and workers](node/performance-workers.md), and [database reliability](node/database-reliability.md).

Practice timeouts, bounded retries, input validation, least privilege, resource cleanup, and graceful shutdown. Measure before optimizing.

**Ready to continue when:** you can identify likely service failure modes and explain how to observe and contain them.

## Stage 5 — Build and explain

Complete the [practice challenges](../practice/README.md) and [task API capstone](../projects/capstone-task-api.md). Rebuild at least one feature without copying. Review the [interview questions](interview/questions-and-answers.md).

For every project, explain the request flow, data model and invariants, behavior on invalid input or dependency failure, and what you measured.

## Weekly loop

- Learn one topic with official docs open beside these notes.
- Recall it without looking.
- Code one exercise and one edge case.
- Add one concrete feature to the capstone.
- Record bugs, causes, and lessons.

Use [Node.js Learn](https://nodejs.org/learn) and the [API reference](https://nodejs.org/api/) as sources of truth. Notes are a map, not a substitute for experiments or current documentation.

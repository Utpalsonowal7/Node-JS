# Node Core and CLI Challenges

Use Node built-ins first. Practice error paths as deliberately as success paths.

## 1. Task summary CLI

Build <code>node summarize-tasks.js &lt;json-file&gt;</code>. The input must be a JSON array of task objects with string <code>title</code> and status <code>open</code> or <code>done</code>. Print total, open, and done counts as JSON.

Requirements: show usage if the path is missing; print a helpful error for missing files or invalid JSON; reject invalid record shapes; set a nonzero <code>process.exitCode</code> on failure; do not print a stack trace to normal stdout.

## 2. Safe path resolution

Write a helper that resolves a user-supplied filename beneath a fixed data directory and rejects paths that escape that directory. Explain how platform path separators and symlinks affect the threat model.

## 3. Atomic JSON save

Write a function that serializes a value to a temporary file next to the target and renames it into place. Clean up the temporary file after failure. Explain why this alone does not make concurrent updates safe.

## 4. Module experiment

Create one ESM module and one CommonJS module. Import each from a clear package boundary and describe what <code>type</code>, <code>.mjs</code>, and <code>.cjs</code> do.

Compare your result with the [filesystem/CLI notes](../../docs/node/filesystem-cli.md) and [reference CLI](../solutions/node-core.js).

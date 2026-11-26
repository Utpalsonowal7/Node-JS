# Filesystem and Command-Line Programs

Node's built-in modules are a strong place to practice. Use promise-based filesystem APIs for straightforward asynchronous work.

## Paths and URLs

Use <code>node:path</code> to compose filesystem paths; do not hard-code slash separators or concatenate paths manually.

~~~js
import path from "node:path";
const outputPath = path.join(process.cwd(), "data", "output.json");
~~~

In ES modules, <code>import.meta.url</code> is a URL for the current module. Convert it with <code>fileURLToPath</code> from <code>node:url</code> when a filesystem path is needed. Keep URLs and filesystem paths distinct.

## Promise-based file I/O

~~~js
import { readFile, writeFile } from "node:fs/promises";

const text = await readFile("input.txt", "utf8");
await writeFile("output.txt", text.toUpperCase(), "utf8");
~~~

Without an encoding, Node returns a Buffer, appropriate for binary data. Handle expected errors such as <code>ENOENT</code> for a missing path. Do not turn every failure into empty data; that can hide loss. For large files, use streams instead of loading everything into memory.

A robust update can write a temporary file in the same directory, then rename it into place. Platform and filesystem details matter. Atomic rename alone does not prevent lost updates from concurrent writers.

Never trust user-controlled paths. Resolve them under a fixed base directory and verify the result stays inside that directory to prevent path traversal.

## CLI inputs and outputs

- <code>process.argv</code> contains the executable, script path, and arguments.
- <code>process.env</code> contains string values or undefined.
- <code>process.cwd()</code> is the caller's working directory.
- Use stdout for normal output and stderr for diagnostics.
- Use <code>process.exitCode</code> for failure without cutting off pending output.

Validate argument count, flags, and types. Print usage for invalid input. Never log secrets or the entire environment.

## Small CLI pattern

~~~js
import { readFile } from "node:fs/promises";

async function main() {
  const [file] = process.argv.slice(2);
  if (!file) throw new Error("Usage: node count-lines.js <file>");
  const content = await readFile(file, "utf8");
  console.log(content.split(/\\r?\\n/).length);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
~~~

When code owns a resource (file handle, server, timer, child process), make its lifetime explicit. Use <code>try/finally</code> or automatic cleanup semantics. Try the [filesystem and CLI challenges](../../practice/challenges/node-core.md).

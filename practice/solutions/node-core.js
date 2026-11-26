import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export function summarizeTasks(tasks) {
  if (!Array.isArray(tasks)) throw new TypeError("Expected a JSON array");

  let open = 0;
  let done = 0;
  for (const [index, task] of tasks.entries()) {
    if (
      task === null ||
      typeof task !== "object" ||
      typeof task.title !== "string" ||
      !["open", "done"].includes(task.status)
    ) {
      throw new TypeError("Invalid task at index " + index);
    }
    if (task.status === "open") open += 1;
    else done += 1;
  }
  return { total: tasks.length, open, done };
}

async function main() {
  const file = process.argv[2];
  if (!file) throw new Error("Usage: node solutions/node-core.js <json-file>");

  const text = await readFile(resolve(file), "utf8");
  const parsed = JSON.parse(text);
  console.log(JSON.stringify(summarizeTasks(parsed), null, 2));
}

main().catch((error) => {
  console.error("Could not summarize tasks: " + error.message);
  process.exitCode = 1;
});

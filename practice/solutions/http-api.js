import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const tasks = new Map();
const MAX_BODY_BYTES = 1_000_000;

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function sendJson(response, statusCode, body, requestId) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "x-request-id": requestId
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const contentType = (request.headers["content-type"] ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    throw httpError(415, "Content-Type must be application/json");
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw httpError(413, "Request body is too large");
    chunks.push(chunk);
  }

  let value;
  try {
    value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw httpError(400, "Request body must be valid JSON");
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw httpError(400, "Request body must be a JSON object");
  }
  return value;
}

export function createTaskServer() {
  return createServer(async (request, response) => {
    const requestId = randomUUID();

    try {
      const url = new URL(request.url ?? "/", "http://localhost");

      if (url.pathname === "/health" && request.method === "GET") {
        return sendJson(response, 200, { ok: true }, requestId);
      }

      if (url.pathname === "/tasks") {
        if (request.method === "GET") {
          return sendJson(response, 200, { tasks: [...tasks.values()] }, requestId);
        }
        if (request.method === "POST") {
          const body = await readJson(request);
          if (typeof body.title !== "string") {
            throw httpError(400, "title must be a string");
          }
          const title = body.title.trim();
          if (title.length < 1 || title.length > 120) {
            throw httpError(400, "title must contain 1 to 120 characters");
          }

          const task = { id: randomUUID(), title, status: "open" };
          tasks.set(task.id, task);
          return sendJson(response, 201, { task }, requestId);
        }
        response.setHeader("allow", "GET, POST");
        throw httpError(405, "Method not allowed");
      }

      const taskPrefix = "/tasks/";
      if (!url.pathname.startsWith(taskPrefix)) throw httpError(404, "Route not found");
      const id = url.pathname.slice(taskPrefix.length);
      if (id.includes("/") || !/^[a-f0-9-]+$/i.test(id)) {
        throw httpError(404, "Route not found");
      }

      const task = tasks.get(id);
      if (!task) throw httpError(404, "Task not found");

      if (request.method === "GET") {
        return sendJson(response, 200, { task }, requestId);
      }
      if (request.method === "PATCH") {
        const body = await readJson(request);
        if (!["open", "done"].includes(body.status)) {
          throw httpError(400, "status must be open or done");
        }
        task.status = body.status;
        return sendJson(response, 200, { task }, requestId);
      }

      tasks.delete(id);
      response.writeHead(204, { "x-request-id": requestId });
      return response.end();
    } catch (error) {
      const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
      if (statusCode >= 500) console.error({ requestId, error });
      return sendJson(
        response,
        statusCode,
        { error: statusCode >= 500 ? "Internal server error" : error.message, requestId },
        requestId
      );
    }
  });
}

export function startTaskServer(port = Number(process.env.PORT ?? 3000)) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new RangeError("PORT must be an integer from 1 to 65535");
  }

  const server = createTaskServer();
  server.listen(port, () => console.log("Task API listening on port " + port));

  let shuttingDown = false;
  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log("Received " + signal + "; closing HTTP server");
    const deadline = setTimeout(() => server.closeAllConnections(), 5_000);
    server.close((error) => {
      clearTimeout(deadline);
      if (error) {
        console.error(error);
        process.exitCode = 1;
      }
    });
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  return server;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  startTaskServer();
}

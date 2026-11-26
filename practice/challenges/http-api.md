# HTTP API Challenge: In-Memory Task Service

Build a small REST API using Node's built-in <code>node:http</code>. Keep route handling separate from task operations.

## Required routes

- <code>GET /health</code> returns JSON indicating the process is ready.
- <code>GET /tasks</code> returns the task collection.
- <code>POST /tasks</code> accepts JSON with a non-empty title (1–120 characters) and creates an open task.
- <code>GET /tasks/:id</code> returns one task or 404.
- <code>PATCH /tasks/:id</code> accepts a valid status change.
- <code>DELETE /tasks/:id</code> deletes the task or returns 404.

## Acceptance criteria

- Use appropriate status codes and <code>application/json</code> responses.
- Reject malformed JSON, unsupported media types, oversized bodies, and invalid fields.
- Never echo internal stack traces to the client.
- Keep the example data in memory and clearly explain that restart loses it.
- Handle unknown routes and methods.
- Add a bounded graceful shutdown when receiving SIGINT or SIGTERM.

## Extensions

Add pagination, query filtering, a database adapter, request IDs, and OpenAPI documentation. For each extension, explain which invariant belongs in the database versus application code.

Review [API design notes](../../docs/node/http-and-api.md), then inspect the [reference server](../solutions/http-api.js). It is intentionally small so you can extend it.

# Capstone: Production-Minded Task API

Build the in-memory [practice API](../practice/challenges/http-api.md), then evolve it into a maintainable service. This is a learning project: make a small complete system before adding infrastructure.

## Core requirements

- Create, list, read, update, and delete tasks.
- Validate every request on the server.
- Separate transport, application logic, persistence, and configuration.
- Return consistent errors with request IDs and appropriate status codes.
- Add pagination and filtering with bounded limits.
- Persist data in PostgreSQL with migrations and parameterized queries.
- Add authentication and per-user authorization before exposing personal task data.
- Support graceful shutdown and bounded database connection pools.

## Suggested structure

~~~text
src/
  app.js
  server.js
  config/
  routes/
  services/
  repositories/
  middleware/
  errors/
  db/
~~~

Keep the entry point responsible for startup and shutdown. The app factory should construct the server without listening, so behavior can be exercised separately from process lifecycle.

## Build milestones

1. **Contract:** document endpoints, input schemas, status codes, and data invariants.
2. **In-memory API:** implement the required routes and body limits.
3. **Persistence:** add schema, migrations, repository functions, and transaction boundaries.
4. **Security:** authentication, authorization, password hashing, rate limits, safe configuration, and dependency review.
5. **Reliability:** request deadlines, graceful shutdown, bounded retries for safe operations, and health/readiness endpoints.
6. **Operations:** structured logs, request IDs, metrics, deployment config, and a concise runbook.

## Review questions

- What is the source of truth for uniqueness and ownership?
- Which writes must be in a transaction?
- What happens when a database query hangs or the pool is exhausted?
- Can retrying a request create duplicate data?
- What information is safe to return to the client?
- How do you roll out a schema change while old and new versions run?
- How would you find a slow endpoint from logs and metrics?

Add a README with setup steps and example requests. Be ready to draw the request flow and explain one failure you found and fixed.

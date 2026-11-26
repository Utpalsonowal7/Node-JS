# HTTP Servers and API Design

Node can create HTTP servers with the built-in <code>node:http</code> module. Frameworks can improve routing and middleware ergonomics, but the HTTP fundamentals still matter.

## Request lifecycle

A client opens or reuses a connection and sends a method, target, headers, and optionally a body. Your server parses the request, validates it, performs work, then sends a status, headers, and response body. A Node request body is a stream; do not assume all bytes arrive in one chunk.

A route should have a clear contract: method, path, accepted input, response shape, status codes, and failure cases. Keep HTTP parsing at the edge; call application functions with validated data.

## Status code baseline

- <code>200</code>: successful read or update with a response body.
- <code>201</code>: resource created; include its representation or location.
- <code>204</code>: success with no response body.
- <code>400</code>: malformed or invalid request.
- <code>401</code>: missing or invalid authentication.
- <code>403</code>: authenticated but not allowed.
- <code>404</code>: resource or route not found.
- <code>409</code>: request conflicts with current state.
- <code>422</code>: syntactically valid input that violates a semantic rule (use consistently).
- <code>429</code>: rate limit reached.
- <code>500</code>: unexpected server failure; do not leak stack traces to clients.
- <code>503</code>: temporarily unable to serve, often due to overload or dependency outage.

Do not return 200 for every outcome. Clients use status codes to decide whether to retry, authenticate, or show an error.

## Read and validate request bodies

Use an explicit byte limit before parsing JSON. Reject unsupported content types and malformed JSON. Validate types, lengths, ranges, and allowed fields; never trust client-side validation alone. Return a stable error shape with a request identifier, but keep internal error detail in server logs.

For larger uploads, use streaming instead of buffering everything. For authentication, authorize the specific resource and action on every request.

## API behavior

- Use resource-oriented paths and the correct HTTP method.
- Make pagination explicit; bound page size.
- Use stable identifiers and document sorting.
- Make retries safe where possible. For create operations, consider idempotency keys and uniqueness constraints.
- Avoid exposing database models directly; map them to response DTOs.
- Version intentionally when breaking compatibility.
- Define CORS only for known browser origins; CORS is not authentication.

## Built-in server versus framework

The built-in server is useful for learning and small services. A framework such as Express or Fastify provides routing and ecosystem conventions, but you still own validation, security, error handling, and API contracts. Keep framework-specific code at the transport layer so core business logic stays testable.

Reference: [Node HTTP API](https://nodejs.org/api/http.html). Practice with the [HTTP API challenge](../../practice/challenges/http-api.md).

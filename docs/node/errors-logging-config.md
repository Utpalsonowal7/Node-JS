# Errors, Logging, and Configuration

Reliable services make failures visible, preserve useful context, and avoid leaking sensitive details.

## Error categories

- **Expected input errors:** respond with a clear client error; do not log these as server crashes.
- **Operational failures:** database unavailable, timeout, file missing, or upstream rejection. Translate them at a boundary and retain the cause.
- **Programming defects:** broken invariant, unexpected type, or unhandled state. Surface these promptly; do not pretend the request succeeded.

Use Error instances. Preserve the original error with <code>cause</code> when adding context. At an HTTP boundary, map known errors to stable status codes and a safe public message. Log the stack and internal details server-side, with secrets redacted.

## Logging

Prefer structured logs (JSON fields) to arbitrary string concatenation. Useful fields include timestamp, severity, message, request ID, route, duration, and dependency name. Avoid passwords, access tokens, cookies, full payment data, and unnecessary personal data.

Choose severity intentionally: debug for local detail, info for normal lifecycle, warn for recoverable anomalies, and error for failures requiring attention. Centralize request IDs so one operation can be traced across logs.

## Configuration

Read deployment configuration from environment variables, validate it once at startup, and pass a configuration object to the code that needs it.

~~~js
function required(name, env = process.env) {
  const value = env[name];
  if (!value) throw new Error("Missing required environment variable: " + name);
  return value;
}
~~~

Convert and range-check numbers; environment values are strings. Fail early on missing or malformed configuration. Keep secrets out of source control, logs, and error messages. Commit an <code>.env.example</code> containing names and safe placeholders, never real credentials.

## Process-level failures

Do not use <code>uncaughtException</code> or <code>unhandledRejection</code> as a way to resume normal service after unknown corruption. Log enough to diagnose, stop accepting work if necessary, close resources with a deadline, and let a supervisor restart the process.

At shutdown, stop the HTTP server, drain in-flight requests, close database pools and queues, then exit. Set <code>process.exitCode</code> rather than calling <code>process.exit()</code> prematurely.

## Observability

Logs answer “what happened?” Metrics answer “how often/how slow?” Traces connect work across services. Track request count, latency percentiles, error rate, event-loop delay, memory, and dependency health. Alert on user-visible symptoms and keep health checks distinct from deep dependency diagnostics.

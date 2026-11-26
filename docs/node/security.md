# Node.js Security Checklist

Security is a design habit across input handling, dependencies, access control, and operations. Start with the official [Node.js security best practices](https://nodejs.org/learn/getting-started/security-best-practices).

## Trust boundaries

Treat request bodies, query strings, headers, cookies, uploaded files, environment variables, database content, and third-party responses as untrusted. Validate allowlisted fields, types, lengths, and ranges on the server. Normalize data once and avoid ambiguous repeated decoding.

## Common web risks

- **Injection:** use parameterized SQL and safe APIs; never build SQL or shell commands by concatenating untrusted text.
- **Path traversal:** resolve paths against a fixed base and confirm the final path remains inside it.
- **Cross-site scripting:** encode output in the right context; avoid unsafe HTML generation.
- **Broken access control:** check authorization on each resource and action, not just during login.
- **Request abuse:** enforce body limits, rate limits, timeouts, and concurrency limits.
- **SSRF:** restrict outbound destinations when users can influence URLs; block private and metadata networks where relevant.
- **Denial of service:** avoid expensive regular expressions and unbounded parsing, queues, or concurrency.

## Authentication and secrets

Store passwords with a dedicated adaptive password hash, never reversible encryption or plain hashes. Use short-lived credentials where practical, rotate and revoke sessions deliberately, and protect cookies with appropriate Secure, HttpOnly, and SameSite settings.

Keep secrets in a secret manager or environment injection system. Never commit tokens, private keys, production dumps, or logs containing credentials. Rotate a secret immediately if exposed.

## Dependencies and runtime

Install only necessary packages. Inspect dependency changes, maintain the lockfile, review install scripts and provenance where available, and update vulnerable packages deliberately. Run the service with least privilege and keep Node patched.

Do not expose debug endpoints, stack traces, internal file paths, or environment values in production responses. Set secure HTTP headers, configure TLS at the deployment edge, and limit allowed CORS origins.

## Security review before shipping

- Are all inputs validated server-side?
- Are authorization checks enforced for every operation?
- Are body size, timeout, rate, and concurrency limits present?
- Are SQL and shell interactions parameterized or safely avoided?
- Are logs free of secrets and sensitive personal data?
- Are dependencies, runtime version, and lockfile reviewed?
- Does shutdown close resources and drain work?
- Can errors be investigated without exposing internals to clients?

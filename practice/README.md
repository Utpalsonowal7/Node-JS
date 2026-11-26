# Practice Lab

These challenges are designed to make the notes usable. Try each prompt before opening the matching file in <code>solutions/</code>. Solutions demonstrate one approach; they are not the only correct implementation.

## Setup

From this directory, use a supported Node.js release:

~~~sh
node --version
npm run core
npm run async
npm run node-core
npm run streams
~~~

The HTTP example starts a local server; use <code>npm run http</code>, then visit <code>http://localhost:3000/health</code>. Stop it with Ctrl+C. No third-party package is required.

## Suggested order

1. [JavaScript fundamentals](challenges/javascript.md)
2. [Async and event loop](challenges/async-event-loop.md)
3. [Node core and CLI](challenges/node-core.md)
4. [HTTP API](challenges/http-api.md)
5. [Streams](challenges/streams.md)

## Practice loop

For each prompt:

1. Write down inputs, outputs, constraints, and edge cases.
2. Implement without looking at the reference.
3. Run the program with normal, empty, invalid, and boundary inputs.
4. Explain time and space tradeoffs.
5. Compare with the reference and improve names, validation, and error behavior.

Do not copy a solution into a real service without understanding its limits. The in-memory HTTP example is a learning exercise, not production storage or a complete security review.

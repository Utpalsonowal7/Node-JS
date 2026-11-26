# Node.js Interview Questions and Answers

Use these as prompts for spoken explanations. Keep answers grounded in an example; don't memorize a sentence without understanding it.

## JavaScript foundations

### 1. What is the difference between <code>let</code>, <code>const</code>, and <code>var</code>?
<code>let</code> and <code>const</code> are block-scoped and have a temporal dead zone. <code>var</code> is function-scoped and has older hoisting behavior. <code>const</code> prevents rebinding, not mutation of the referenced object.

### 2. What is a closure?
A function together with access to its lexical environment. It is useful for callbacks and encapsulated state. It can also keep referenced memory alive.

### 3. How does <code>this</code> work in an arrow function?
An arrow captures <code>this</code> lexically; it does not get a new receiver from the call site.

### 4. What is the difference between shallow and deep copy?
A shallow copy duplicates only the outer container. Nested objects remain shared. Deep copying must define behavior for cycles, dates, maps, prototypes, and other non-JSON values.

### 5. What is the difference between <code>||</code> and <code>??</code>?
<code>||</code> falls back on any falsy value; <code>??</code> falls back only for null or undefined.

## Node runtime and async

### 6. What is Node.js?
A JavaScript runtime built around V8 with APIs for networking, files, processes, and other system work. It is not a language or a web framework.

### 7. Is Node single-threaded?
JavaScript callbacks usually execute on the main thread, but Node and the operating system use asynchronous I/O; some native work uses a worker pool, and worker threads can execute JavaScript in parallel.

### 8. What is the event loop?
The mechanism that schedules callbacks for ready work while the process remains active. Explain phases and microtasks at a high level, and note that exact ordering depends on context and Node version.

### 9. Does async/await block Node?
It pauses the current async function while its promise is pending; other work can continue. CPU-heavy synchronous code still blocks the main JavaScript thread.

### 10. How do Promise.all and Promise.allSettled differ?
All rejects when one input rejects; allSettled waits for every input and reports each outcome. Neither bounds concurrency or automatically cancels work.

### 11. What is backpressure?
A producer slows when a consumer cannot keep up. With streams, respect a false return from write or use pipeline so data flow remains bounded.

### 12. When would you use worker threads?
For measured CPU-bound JavaScript where parallelism outweighs messaging and coordination costs. They are usually unnecessary for ordinary asynchronous I/O.

## Modules and packages

### 13. How do ESM and CommonJS differ?
They use different import/export syntax and have different loading semantics. Node determines format by package type and extension; know the package boundary and avoid mixing styles without a reason.

### 14. Why commit a lockfile?
It records a concrete dependency tree so teammates and CI install reproducibly. It does not prove dependencies are safe; updates still need review.

### 15. What are runtime and development dependencies?
Runtime dependencies are needed by deployed code. Development dependencies support building, linting, or local tooling and should not be required at runtime.

## APIs and production

### 16. How do you handle malformed JSON?
Limit body size, verify the expected content type, parse in a guarded boundary, validate the parsed shape, and return a safe client error.

### 17. What is the difference between 401 and 403?
401 means authentication is missing or invalid; 403 means the caller is authenticated but not authorized for the action.

### 18. How do you avoid blocking the event loop?
Use asynchronous I/O, avoid long synchronous loops and expensive parsing on request paths, bound inputs, and move measured CPU-heavy work to workers or jobs.

### 19. How do you handle errors in an API?
Map known domain and validation errors to stable status codes and public messages. Log unexpected errors with context and a request ID while hiding internals from the client.

### 20. How should a service shut down?
Stop accepting new work, drain in-flight requests with a deadline, close pools and queues, and exit with an appropriate status. Avoid immediate process.exit when cleanup or output remains.

### 21. What is idempotency?
Repeating the same operation has the same effect as performing it once. It matters for retries and payment-like writes; enforce it with a key and durable uniqueness.

### 22. How do you prevent SQL injection?
Use parameterized queries or a query builder/ORM that parameterizes values. Never concatenate untrusted strings into SQL.

### 23. What would you monitor?
Request rate, errors, latency percentiles, event-loop delay, CPU, memory, and dependency health/latency. Logs and traces help explain individual failures.

### 24. How do you investigate high latency?
Reproduce representative traffic, inspect percentile and dependency timings, profile CPU and event-loop delay, then optimize the measured bottleneck and compare against baseline.

## Practice answering

For each answer, add one real example, one limitation, and one follow-up question you would ask. Use the [capstone](../../projects/capstone-task-api.md) to make the examples concrete.

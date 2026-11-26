# Async JavaScript Challenges

Understand the work and failure model before implementing each function.

## 1. Promise delay

Implement <code>delay(ms, value)</code> that fulfills with value after at least the requested delay. Reject a negative or non-finite delay.

## 2. Bounded concurrency map

Implement <code>mapLimit(items, limit, mapper)</code>:

- Run at most <code>limit</code> mapper calls at once.
- Return results in input order.
- Reject when the limit is not a positive integer.
- On a mapper rejection, stop scheduling new items, wait for already-running work to settle, then reject with the first failure.

Explain why unbounded <code>Promise.all(items.map(...))</code> can overload a service.

## 3. Retry with bounded backoff

Implement <code>retry(operation, options)</code> with a finite attempt limit, exponential backoff, and jitter. Inject randomness or the wait function so the algorithm can be reasoned about without wall-clock delays. Do not retry permanent validation or authorization failures.

## 4. Ordering experiment

Create a short script that logs synchronous work, <code>process.nextTick</code>, a promise reaction, <code>setTimeout</code>, and <code>setImmediate</code>. Run it more than once and from an I/O callback. Explain which ordering assumptions are safe and which depend on context/version.

## 5. Cancellation

Extend a long-running operation to accept an AbortSignal, stop future work when aborted, and release any timers or listeners. Explain why racing a promise against a timeout does not necessarily cancel the original operation.

Compare your approach to [async notes](../../docs/javascript/async.md) and then review [reference solutions](../solutions/async.js).

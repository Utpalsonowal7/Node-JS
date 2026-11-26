# Async JavaScript

Node apps spend much time waiting for I/O. Async code lets the process handle other work while an operation is pending. It does not automatically run CPU-heavy JavaScript in parallel.

## Promise lifecycle

A promise is pending, fulfilled, or rejected. It settles once. A <code>.then()</code> handler returns a new promise: its return value fulfills the next promise, and a thrown error rejects it.

~~~js
const result = fetchRecord(id)
  .then((record) => transform(record))
  .catch((error) => {
    throw new Error("Could not prepare record", { cause: error });
  });
~~~

Connect rejection handling to the work that may fail. An unhandled rejection is a defect; a process-wide handler is not normal control flow.

## <code>async</code> and <code>await</code>

An async function always returns a promise. <code>await</code> pauses that function, not the whole event loop.

~~~js
async function loadProfile(id) {
  const response = await fetch("https://example.test/users/" + id);
  if (!response.ok) throw new Error("Request failed: " + response.status);
  return response.json();
}
~~~

Catch where you can recover or add context. Otherwise let rejection reach a boundary that knows how to respond.

## Sequential versus concurrent work

Awaiting each operation in a loop is sequential. Independent operations can run concurrently:

~~~js
const results = await Promise.all(ids.map(loadOne));
~~~

<code>Promise.all</code> rejects on the first rejection. Use <code>Promise.allSettled</code> when every outcome matters. <code>Promise.race</code> picks the first settled promise but does not cancel the others. <code>Promise.any</code> picks the first fulfilled promise or rejects with <code>AggregateError</code> if all reject.

Unbounded concurrency can overload a database or remote API. Use a bounded pool and respect rate limits.

## Cancellation and timeouts

Propagate an <code>AbortSignal</code> when an API accepts one. <code>AbortSignal.timeout(ms)</code> is available in modern Node versions; check the version you support. A wrapper that stops waiting does not necessarily cancel the underlying operation.

Cancellation is cooperative: operations must observe the signal and clean up. Release resources in <code>finally</code> when appropriate.

## Ordering and frequent bugs

Synchronous code runs to completion. Promise reactions are microtasks. Node also has a <code>process.nextTick()</code> queue with special priority. Timer thresholds do not guarantee exact timing. For subtle ordering, consult the [Node event loop guide](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick) and run a minimal example on your Node version.

Common bugs: forgetting to return a promise from <code>.then()</code>; starting async work in <code>forEach</code>; swallowing errors; assuming race cancels; retrying without a limit; firing background work without awaiting or tracking it.

Try [async challenges](../../practice/challenges/async-event-loop.md) before the [reference solutions](../../practice/solutions/async.js).

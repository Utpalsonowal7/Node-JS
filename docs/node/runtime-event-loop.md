# Node.js Runtime and Event Loop

Node.js is a runtime built around V8 and native platform components. V8 executes JavaScript. Node provides APIs for files, networking, timers, streams, and process management. libuv helps implement the event loop and asynchronous I/O across platforms. The exact path depends on the API and operating system.

## Event loop mental model

1. JavaScript runs on the main thread until the current stack is empty.
2. Node and the operating system progress asynchronous work.
3. When work is ready, its callback is scheduled for an appropriate queue or phase.
4. JavaScript handles a callback, then the loop continues.

This is a useful model, not a substitute for detailed rules. Phases include timers, poll, check, and close callbacks; microtasks and <code>process.nextTick()</code> have special behavior. Timer callbacks are not guaranteed to run at an exact millisecond. See the [official event loop guide](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick).

## Blocking work

CPU-heavy synchronous JavaScript blocks the main event loop. A slow regular expression, huge JSON parse, synchronous file operation, or infinite loop can delay unrelated requests.

Use async APIs for I/O in servers. For CPU-bound work, measure first; then consider chunking, worker threads, a child process, or an external job system.

## libuv pool and worker threads

Some Node APIs use a libuv worker pool for selected filesystem, crypto, and DNS work. Pool saturation can delay other operations. This differs from JavaScript worker threads, which can run JavaScript in parallel and communicate through messages or shared memory.

Do not assume every async API uses the worker pool. Check its documentation and profile actual behavior.

## Timers and next tick

- <code>setTimeout(fn, delay)</code> runs after a threshold; a busy process may delay it.
- <code>setImmediate(fn)</code> schedules work for the check phase.
- <code>process.nextTick(fn)</code> runs after the current operation, before the loop continues. Recursive scheduling can starve I/O; use sparingly.
- Promise reactions are microtasks. Ordering depends on where work is scheduled.

If ordering matters, run a short example on the Node version you use. Avoid memorizing an output without its context.

## Process lifecycle and diagnostics

A process stays alive while active work keeps the event loop alive, such as a server, timer, or I/O. <code>process.exit()</code> terminates immediately and can truncate output or cleanup. Prefer setting <code>process.exitCode</code>, closing resources, and allowing the loop to drain.

Handle termination signals to begin graceful shutdown, with a bounded deadline. Useful diagnostics include <code>node --trace-warnings</code>, <code>node --cpu-prof</code>, <code>node --heap-prof</code>, and event-loop delay monitoring.

References: [event loop](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick), [process API](https://nodejs.org/api/process.html), [worker threads](https://nodejs.org/api/worker_threads.html).

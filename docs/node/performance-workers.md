# Performance, Profiling, and Workers

Optimize the bottleneck you measured, not the one you guessed. First establish a baseline and representative workload.

## Measure user-visible behavior

Track throughput, error rate, and latency percentiles such as p50, p95, and p99. Averages can hide a slow tail. Record CPU, heap usage, garbage collection, event-loop delay, and dependency latency.

Compare like with like: same input mix, concurrency, data size, warm-up, and hardware. Keep load tests bounded and separate them from production traffic.

## Common bottlenecks

- Synchronous CPU work blocks other callbacks.
- Large buffers and object graphs increase memory and garbage collection.
- Unbounded concurrency overloads databases and upstream services.
- Missing database indexes or inefficient queries dominate request time.
- Excessive serialization, repeated parsing, and unnecessary copies add CPU cost.
- Too many connections can exhaust file descriptors or dependency pools.

Use streams for large data, paginate queries, bound queues, add appropriate indexes, and cache only when invalidation and freshness are understood.

## Profiling

Use the built-in CPU and heap profiling options, inspect flame graphs, and reproduce the workload. Profiling overhead exists, so compare against a baseline. Investigate retained objects with heap snapshots and memory trends over time.

Do not treat increasing the heap limit as a fix for a leak. Find what retains the memory.

## Worker threads

Worker threads run JavaScript on separate threads and can help with CPU-bound tasks. They add startup, messaging, and coordination cost. They are usually not the first solution for I/O, which Node handles asynchronously.

Use a worker pool for repeated CPU-heavy tasks rather than creating a new worker per tiny task. Define message schemas, error handling, cancellation, limits, and shutdown. Consider child processes when stronger isolation or separate runtimes are needed.

Reference: [Node worker threads](https://nodejs.org/api/worker_threads.html). Never add complexity until a profile shows a suitable hotspot.

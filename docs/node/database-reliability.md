# Databases and Service Reliability

A Node service is only as dependable as the boundaries between requests, databases, queues, and external APIs.

## Connection pools

Reuse a bounded database connection pool rather than opening a connection per query. Set a pool limit appropriate to the database's total connection budget and the number of app instances. Close the pool during graceful shutdown.

Give operations deadlines. A hung query can hold a connection and make the pool unavailable. Distinguish connection timeout, query timeout, and request deadline.

## Transactions and invariants

Use a transaction when several writes must succeed or fail together. Keep transactions short; do not wait on slow external APIs while holding database locks. Enforce critical uniqueness and integrity in the database as well as application validation.

Migrations should be versioned, reviewed, and run in a controlled deployment step. Plan how to roll forward and how old and new application versions coexist during rollout.

## Retries and idempotency

Retry only transient failures, with bounded attempts, backoff, and jitter. Retrying a non-idempotent write can create duplicate effects. Use idempotency keys, unique constraints, or an outbox/inbox pattern where duplicate delivery matters.

Do not retry validation failures, permission errors, or permanent schema errors. Respect upstream retry guidance and an overall deadline.

## Queues and background work

Queues smooth bursts and separate long-running tasks from request latency. Define retry count, dead-letter behavior, visibility timeout, idempotency, and shutdown behavior. A process restart must not silently lose acknowledged work.

## Degradation and recovery

Use timeouts and bulkheads to contain a failing dependency. Serve cached or partial data only when the product contract allows it. Health checks should distinguish process liveness from readiness to receive traffic.

Practice a failure story: database is slow, pool is full, requests time out, retry traffic increases load. Break the feedback loop with limits, observability, and controlled recovery.

export function delay(ms, value) {
  if (!Number.isFinite(ms) || ms < 0) {
    return Promise.reject(new RangeError("Delay must be a non-negative finite number"));
  }
  return new Promise((resolve) => setTimeout(resolve, ms, value));
}

export async function mapLimit(items, limit, mapper) {
  if (!Array.isArray(items) || typeof mapper !== "function") {
    throw new TypeError("Expected an array and a mapper");
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new RangeError("Limit must be a positive integer");
  }

  const results = new Array(items.length);
  let nextIndex = 0;
  let hasFailed = false;
  let firstError;

  async function worker() {
    while (!hasFailed) {
      const index = nextIndex++;
      if (index >= items.length) return;
      try {
        results[index] = await mapper(items[index], index);
      } catch (error) {
        if (!hasFailed) {
          hasFailed = true;
          firstError = error;
        }
      }
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  if (hasFailed) throw firstError;
  return results;
}

export async function retry(operation, options = {}) {
  if (typeof operation !== "function") throw new TypeError("Expected an operation");

  const {
    maxAttempts = 3,
    baseDelayMs = 100,
    maxDelayMs = 2_000,
    random = Math.random,
    wait = delay,
    shouldRetry = () => true
  } = options;

  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new RangeError("maxAttempts must be a positive integer");
  }
  if (!Number.isFinite(baseDelayMs) || baseDelayMs < 0 ||
      !Number.isFinite(maxDelayMs) || maxDelayMs < 0) {
    throw new RangeError("Backoff values must be non-negative finite numbers");
  }
  if (typeof random !== "function" || typeof wait !== "function" ||
      typeof shouldRetry !== "function") {
    throw new TypeError("random, wait, and shouldRetry must be functions");
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (attempt === maxAttempts || !shouldRetry(error)) throw error;
      const ceiling = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      const sample = random();
      if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
        throw new RangeError("random must return a value from 0 inclusive to 1 exclusive");
      }
      await wait(Math.floor(sample * ceiling));
    }
  }
  throw new Error("Unreachable retry state");
}

const values = await mapLimit([1, 2, 3, 4], 2, async (value) => {
  await delay(10);
  return value * 2;
});
console.log("bounded results:", values);

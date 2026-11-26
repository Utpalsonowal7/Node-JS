export function countBy(items, keyFn = (value) => value) {
  if (!Array.isArray(items) || typeof keyFn !== "function") {
    throw new TypeError("Expected an array and a key function");
  }

  const counts = new Map();
  for (const item of items) {
    const key = keyFn(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export function groupBy(items, keyFn) {
  if (!Array.isArray(items) || typeof keyFn !== "function") {
    throw new TypeError("Expected an array and a key function");
  }

  const groups = new Map();
  for (const item of items) {
    const key = keyFn(item);
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }
  return groups;
}

export function uniqueBy(items, keyFn) {
  if (!Array.isArray(items) || typeof keyFn !== "function") {
    throw new TypeError("Expected an array and a key function");
  }

  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

export function flattenOneLevel(items) {
  if (!Array.isArray(items)) throw new TypeError("Expected an array");
  return items.flat(1);
}

export function createCounter(start = 0) {
  if (!Number.isFinite(start)) throw new TypeError("Start must be finite");
  let value = start;
  return {
    next() {
      value += 1;
      return value;
    },
    current() {
      return value;
    }
  };
}

export function compose(...functions) {
  return (initialValue) =>
    functions.reduceRight((value, fn) => fn(value), initialValue);
}

const names = ["Ada", "Lin", "Grace", "Al"];
console.log("name lengths:", [...countBy(names, (name) => name.length)]);
console.log("grouped:", [...groupBy(names, (name) => name.length)]);
console.log("unique lengths:", uniqueBy(names, (name) => name.length));
console.log("flatten:", flattenOneLevel([1, [2, [3]], 4]));
const counter = createCounter(10);
console.log("counter:", counter.next(), counter.current());
console.log("compose:", compose((value) => value + 1, (value) => value * 2)(4));

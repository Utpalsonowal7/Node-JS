# JavaScript Foundations Challenges

Attempt these in order. Keep each function small and write down how it behaves for empty and invalid inputs.

## 1. Count by key

Implement <code>countBy(items, keyFn)</code> returning a Map from each computed key to its frequency. Example: <code>["a", "bb", "c"].count by length</code> should produce counts 1 → 2 and 2 → 1. Do not mutate the input.

## 2. Group by key

Implement <code>groupBy(items, keyFn)</code>, returning a Map whose values are arrays in original input order. Decide how to handle a non-function keyFn and document it.

## 3. Dedupe by identity

Implement <code>uniqueBy(items, keyFn)</code>, keeping the first item for each key and preserving order. Test with objects that share a property but are different references.

## 4. Deeply nested values

Write <code>flattenOneLevel(items)</code> that flattens exactly one level, preserving all other values. Then explain why arbitrary recursive flattening needs an explicit policy for depth and cycles.

## 5. Closure exercise

Implement <code>createCounter(start = 0)</code> returning an object with <code>next()</code> and <code>current()</code>. State whether the returned object can be used to mutate the internal value in any other way.

## Stretch: compose

Implement <code>compose(...functions)</code> so <code>compose(f, g, h)(x)</code> computes <code>f(g(h(x)))</code>. Define the result when no functions are provided.

## Edge cases

Empty list, duplicate keys, keyFn returning undefined, object keys, input order, and a keyFn that throws. Attempt these before reading [solutions](../solutions/javascript.js).

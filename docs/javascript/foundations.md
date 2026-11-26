# JavaScript Foundations for Node.js

Node runs JavaScript outside a browser. Language rules remain the same, but browser globals such as <code>window</code> and <code>document</code> are not automatically available.

## Values and types

Primitives are <code>undefined</code>, <code>null</code>, booleans, numbers, bigints, strings, and symbols. Objects, arrays, and functions are reference values.

~~~js
const original = { count: 1 };
const alias = original;
alias.count++;
console.log(original.count); // 2: both variables point to the same object
~~~

Assignment copies a primitive value, but copies an object reference. A shallow copy such as <code>{ ...original }</code> creates a new outer object while nested objects remain shared.

Use <code>typeof</code> carefully: <code>typeof null</code> is <code>"object"</code>. Use <code>Array.isArray(value)</code> for arrays. Validate the exact shape needed when data comes from outside the program.

## Variables and scope

Prefer <code>const</code> by default, <code>let</code> when rebinding is needed, and avoid <code>var</code> in new code. <code>const</code> prevents rebinding; it does not freeze the object.

~~~js
const settings = { retries: 2 };
settings.retries = 3; // allowed
// settings = {};    // TypeError: cannot reassign a const binding
~~~

<code>let</code> and <code>const</code> have block scope and a temporal dead zone before declaration. <code>var</code> is function-scoped and has older hoisting behavior.

## Equality and conditions

Use <code>===</code> and <code>!==</code> unless coercion is intentional. Falsy values include <code>false</code>, <code>0</code>, <code>0n</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, and <code>NaN</code>. Empty arrays and objects are truthy.

- <code>value || fallback</code> uses the fallback for every falsy value.
- <code>value ?? fallback</code> uses it only for <code>null</code> or <code>undefined</code>.
- <code>value?.property</code> stops on nullish values but does not validate the result.

Do not use truthiness to validate a number if zero is allowed. <code>NaN !== NaN</code>; use <code>Number.isNaN(value)</code>.

## Functions and arrays

Functions are values: pass them to other functions, return them, or store them. Array methods such as <code>map</code>, <code>filter</code>, <code>find</code>, <code>some</code>, and <code>reduce</code> express common transformations.

~~~js
const activeNames = users
  .filter((user) => user.active)
  .map((user) => user.name);
~~~

Choose and document whether a function mutates its input or returns a new value.

## Errors and JSON

Throw <code>Error</code> objects, not strings. Catch only where you can recover, add context, or convert an error at a boundary. JSON cannot represent functions, symbols, undefined, cycles, or bigints.

~~~js
try {
  const data = JSON.parse(text);
  // Validate data before using it.
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("Input is not valid JSON");
  } else {
    throw error;
  }
}
~~~

## Modules and common mistakes

Node supports CommonJS and ECMAScript modules; the format affects imports, exports, and available globals. See [modules and npm](../node/modules-and-npm.md). Avoid assuming that a shallow copy is deep, that const makes an object immutable, or that <code>forEach(async ...)</code> waits for callbacks. Use <code>for...of</code> or <code>Promise.all</code> when waiting is required.

**Check yourself:** explain a binding versus the object it points to; predict <code>0 || 5</code> and <code>0 ?? 5</code>; describe when a shallow copy is insufficient. Then try [core JavaScript practice](../../practice/challenges/javascript.md).

# Functions, Objects, and Prototypes

These language behaviors appear repeatedly in Node code: callbacks, closures, method receivers, object composition, and prototype lookup.

## Functions and callbacks

Declarations, expressions, and arrow functions are callable values, but differ in hoisting and <code>this</code>. A callback is a function passed to another operation.

Be careful passing object methods: <code>setTimeout(service.run, 0)</code> passes the function without its receiver. Use a wrapper or bind explicitly if the method needs <code>this</code>.

## <code>this</code> follows the call

For an ordinary function, <code>this</code> depends on the call site (subject to strict-mode and binding rules). An arrow function captures <code>this</code> lexically and cannot be rebound with <code>call</code>, <code>apply</code>, or <code>bind</code>.

~~~js
const counter = {
  value: 0,
  increment() {
    this.value += 1;
  }
};
counter.increment(); // method call supplies counter as this
~~~

Avoid hidden shared state through <code>this</code> in callbacks. Explicit parameters and dependency injection are often easier to understand.

## Closures

A closure is a function with access to the lexical environment where it was created. Closures are useful for private state, factories, and callbacks.

~~~js
function createCounter() {
  let value = 0;
  return () => ++value;
}
const next = createCounter();
next(); // 1
next(); // 2
~~~

Closures can keep large objects alive longer than intended. Remove listeners and references when their lifetime ends.

## Objects and property lookup

Objects have own properties and a prototype link. Reading a property checks the object, then follows the prototype chain. <code>Object.hasOwn(object, "key")</code> checks only own properties.

~~~js
const parent = { describe() { return "parent"; } };
const child = Object.create(parent);
child.name = "child";
child.describe(); // inherited method
~~~

Use <code>Object.create(null)</code> only when a dictionary without a prototype is required. Use <code>Map</code> for arbitrary keys and frequent key addition/removal.

## Classes and design

JavaScript classes are syntax over prototypes. Instance methods are usually stored on the class prototype and shared. Class fields are per instance. <code>extends</code> establishes prototype inheritance; private fields such as <code>#token</code> provide private instance state.

Prefer composition when a class hierarchy becomes tangled. Keep functions focused, make side effects visible, and use classes when lifecycle or invariants justify them, not merely to wrap every function.

Objects compare by identity, not contents: <code>({ id: 1 }) === ({ id: 1 })</code> is false. Freezing is shallow. Validate at trust boundaries even when values are typed or frozen.

See [foundations](foundations.md) and solve [core JavaScript challenges](../../practice/challenges/javascript.md).

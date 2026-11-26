# Modules, Packages, and npm

Node supports CommonJS (CJS) and ECMAScript modules (ESM). Choose a format per package and avoid mixing styles casually.

## ESM and CommonJS

ESM uses <code>import</code> and <code>export</code>. A package can set <code>"type": "module"</code>; <code>.mjs</code> is ESM and <code>.cjs</code> is CommonJS.

~~~js
// math.js in a package with type: module
export function add(a, b) { return a + b; }
import { add } from "./math.js";
~~~

CommonJS uses <code>require()</code> and <code>module.exports</code>. In CJS, use <code>require("node:fs")</code>; in ESM, import from <code>node:fs/promises</code>. Relative ESM imports generally include the file extension. Loading, caching, and interoperability differ. Read the [packages docs](https://nodejs.org/api/packages.html) and [ESM docs](https://nodejs.org/api/esm.html).

## Package boundaries and npm

<code>package.json</code> describes name, version, scripts, dependencies, and module settings. <code>exports</code> can define public entry points and keep internal paths private. Check current docs when publishing a library.

Useful commands:

- <code>npm init -y</code>: create a manifest.
- <code>npm install package</code>: add a runtime dependency.
- <code>npm install --save-dev package</code>: add a development dependency.
- <code>npm ci</code>: install exactly from the lockfile in CI or clean environments.
- <code>npm run name</code>: run a declared script.
- <code>npm ls --depth=0</code>: inspect direct dependencies.
- <code>npm audit</code>: inspect known advisories; review fixes instead of blindly applying them.

Commit the lockfile for applications; do not commit <code>node_modules</code>. Use semver ranges intentionally and update dependencies regularly.

## Import side effects

Importing a module evaluates its top-level code. Keep top-level work small: avoid opening a database or starting a server merely because a helper was imported. Export an explicit <code>start()</code> function and call it from the entry point.

Install only dependencies you need. Review ownership, release history, install scripts, and lockfile diffs. See [security notes](security.md).

## Checklist

Is the module format clear? Are internal paths private? Are imports free of surprising startup effects? Is the lockfile committed? Can a new developer install and run the project from a clean checkout?

# Streams and Backpressure Challenges

Work with data as bytes or text deliberately. Start with a small input, then reason about a file too large to fit in memory.

## 1. Transform a file

Create a CLI that reads an input file as UTF-8 and writes uppercase text to an output file using a Transform stream and <code>pipeline()</code>. Handle missing arguments and propagate errors. Test a multibyte character split across chunks.

## 2. Respect backpressure

Implement a manual producer that writes many chunks to a slow Writable. When <code>write()</code> returns false, wait for <code>drain</code> before writing more. Compare your code with <code>pipeline()</code> and explain why pipeline is usually safer.

## 3. Line counter

Count lines from a large file without reading the whole file at once. Decide whether the final newline adds a line and document your convention. Ensure chunk boundaries do not change the answer.

## 4. HTTP upload

Stream an upload to disk with a maximum byte limit. Clean up partial files when the client disconnects or the pipeline fails. Explain how disk quotas and authentication affect a production upload endpoint.

Review the [stream notes](../../docs/node/streams-buffers.md), then compare your implementation with [the reference examples](../solutions/streams.js).

# Buffers, Streams, and Backpressure

A Buffer is a fixed sequence of bytes. A string is text interpreted with an encoding such as UTF-8. Do not assume one chunk equals one character: a UTF-8 character can span chunk boundaries.

## Why streams?

Reading a full file into memory uses memory proportional to its size. A stream lets a program process data incrementally. Node streams are useful for files, HTTP bodies, compression, and other data pipelines.

Four main stream types:

- **Readable:** produces data.
- **Writable:** accepts data.
- **Duplex:** readable and writable.
- **Transform:** duplex stream that changes data as it passes.

See the [official stream docs](https://nodejs.org/api/stream.html).

## Backpressure

A writable can accept only a limited amount of queued data. If <code>writable.write(chunk)</code> returns false, the producer should wait for <code>drain</code> before writing more. This prevents a fast producer from overwhelming a slow consumer.

Prefer <code>pipeline()</code> for connecting streams: it forwards errors and closes the pipeline appropriately.

~~~js
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

await pipeline(
  createReadStream("large-input.log"),
  createWriteStream("large-output.log")
);
~~~

For HTTP uploads and downloads, pipe or pipeline streams rather than collecting unbounded chunks into an array.

## Transform example

A transform can process chunks, but transforms must handle chunk boundaries and encoding correctly. For simple byte-preserving operations, use buffers. For text, use a decoder that handles split multibyte sequences.

## Common mistakes

- Calling <code>readFile</code> for an unbounded upload.
- Ignoring a false return value from <code>write()</code>.
- Forgetting to handle errors from one side of a pipeline.
- Converting binary data to strings without specifying an encoding.
- Assuming chunks align with lines, JSON records, or UTF-8 characters.
- Leaving a stream open after the owner has canceled.

Use <code>stream/promises</code> and <code>pipeline</code> for promise-based composition. Handle cancellation and clean up streams on client disconnect. Practice in [stream challenges](../../practice/challenges/streams.md) and inspect [the solutions](../../practice/solutions/streams.js).

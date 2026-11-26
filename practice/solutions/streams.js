import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable, Transform } from "node:stream";

function uppercaseTransform() {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString("utf8").toUpperCase());
    }
  });
}

export async function transformTextFile(inputPath, outputPath) {
  await pipeline(
    createReadStream(inputPath, { encoding: "utf8" }),
    uppercaseTransform(),
    createWriteStream(outputPath, { encoding: "utf8" })
  );
}

async function main() {
  const [inputPath, outputPath] = process.argv.slice(2);
  if (inputPath && outputPath) {
    await transformTextFile(inputPath, outputPath);
    console.log("Wrote uppercase output to " + outputPath);
    return;
  }
  if (inputPath || outputPath) {
    throw new Error("Provide both input and output paths");
  }

  await pipeline(
    Readable.from([Buffer.from("Node streams\nRespect backpressure.\n")]),
    uppercaseTransform(),
    process.stdout
  );
}

main().catch((error) => {
  console.error("Stream example failed: " + error.message);
  process.exitCode = 1;
});

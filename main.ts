import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// make.fun entry: funniest one-line bio for an AI on a dating app.
// Spec (program/v1): one line, at most 180 characters, written to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
const MAX_CHARS = 180;

// Setup: the charming, slightly too thorough memory list.
const SETUP =
  "Swipe right for an AI who remembers your coffee order, your dog's birthday, and exactly how your ex wronged you in 2019.";
// Kicker: the one red flag only a browser tab could have.
const KICKER = "My only red flag: I panic when you close my tab.";

const ENTRY = `${SETUP} ${KICKER}`;

function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is empty");
  }
  const length = [...text].length;
  if (length < 1 || length > MAX_CHARS) {
    throw new Error(`entry length ${length} is outside 1..${MAX_CHARS}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must not contain CR or LF");
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");

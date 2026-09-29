import { CARD_CATEGORIES } from "./data/index.js";
import { inspectCardQuality } from "./cardQuality.js";

const report = inspectCardQuality(CARD_CATEGORIES);
console.log(JSON.stringify(report, null, 2));
if (report.duplicateIds.length || report.duplicateWords.length || report.invalidForbiddenWords.length) {
  process.exitCode = 1;
}

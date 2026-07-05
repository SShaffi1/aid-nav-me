import { defineMcp } from "@lovable.dev/mcp-js";
import listSupportedLanguages from "./tools/list-supported-languages";
import listIntakeQuestions from "./tools/list-intake-questions";

export default defineMcp({
  name: "aednav-mcp",
  title: "AEDNAV MCP",
  version: "0.1.0",
  instructions:
    "AEDNAV helps patients prepare for medical appointments in their own language. Use `list_supported_languages` to see which languages the intake supports, and `list_intake_questions` to see the questions AEDNAV asks during pre-appointment intake.",
  tools: [listSupportedLanguages, listIntakeQuestions],
});

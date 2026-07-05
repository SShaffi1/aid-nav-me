import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { LANGUAGES } from "@/lib/i18n";

export default defineTool({
  name: "list_supported_languages",
  title: "List supported languages",
  description:
    "List every language AEDNAV's patient intake supports, with ISO code, English label, native label, and text direction.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const languages = LANGUAGES.map((l) => ({
      code: l.code,
      label: l.label,
      native: l.native,
      direction: l.direction,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(languages, null, 2) }],
      structuredContent: { languages },
    };
  },
});

// zod is imported so future inputs can be validated; keep import to satisfy TS unused rule
void z;

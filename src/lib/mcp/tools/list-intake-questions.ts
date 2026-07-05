import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { intakeSteps, initialAnswers } from "@/lib/intake";

export default defineTool({
  name: "list_intake_questions",
  title: "List intake questions",
  description:
    "Return the ordered list of questions AEDNAV asks a patient during pre-appointment intake, including field id, English prompt text, placeholder, and any quick-reply suggestions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const questions = intakeSteps.map((step, index) => ({
      order: index + 1,
      id: step.id,
      field: step.field,
      prompt: step.prompt(initialAnswers),
      placeholder: step.placeholder,
      suggestions: step.suggestions ?? [],
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(questions, null, 2) }],
      structuredContent: { questions },
    };
  },
});

void z;

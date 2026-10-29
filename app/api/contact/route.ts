import { z } from "zod";
import { contactSchema } from "../../../lib/validation/contact";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: "Invalid contact details.", ...z.flattenError(result.error) },
      { status: 400 },
    );
  }

  // Connect an email provider or persistence layer here using result.data.
  return Response.json({
    message: "Contact details validated. No message has been sent or stored.",
  });
}

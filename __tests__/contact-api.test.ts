/** @jest-environment node */
import { describe, expect, it } from "@jest/globals";
import { POST } from "../app/api/contact/route";

const validContact = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello!",
};

function submit(body: unknown) {
  return POST(new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }));
}

describe("POST /api/contact", () => {
  it("acknowledges valid input without claiming delivery", async () => {
    const response = await submit(validContact);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: "Contact details validated. No message has been sent or stored.",
    });
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      body: "{",
    }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Request body must be valid JSON." });
  });

  it("returns errors for each invalid field", async () => {
    const response = await submit({ name: "  ", email: "invalid", message: "  " });
    expect(response.status).toBe(400);
    expect((await response.json()).fieldErrors).toEqual({
      name: expect.any(Array), email: expect.any(Array), message: expect.any(Array),
    });
  });

  it.each([null, [], {}, { ...validContact, name: 42 }, {
    name: "a".repeat(101), email: `${"a".repeat(250)}@example.com`, message: "a".repeat(5001),
  }])("rejects invalid input: %p", async (body) => {
    expect((await submit(body)).status).toBe(400);
  });
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { publishingUrl, contactUrl } from "../src/lib/publishing.ts";

const demo = {
  demo: true,
  verified: false,
  domain: "",
  address: "",
  businessPhone: "",
  hours: [],
};
test("demo can build locally without inventing a domain", () =>
  assert.equal(publishingUrl(demo), undefined));
test("production refuses incomplete or unverified business data", () => {
  assert.throws(() => publishingUrl({ ...demo, demo: false }));
  assert.throws(() =>
    publishingUrl({ ...demo, demo: false, domain: "https://pet.real.com" }),
  );
});
test("publishing accepts only an actual HTTPS origin", () => {
  for (const domain of [
    "http://pet.com",
    "https://example.com",
    "https://localhost",
    "https://pet.com/path",
    "https://user:pass@pet.com",
  ])
    assert.throws(() => publishingUrl({ ...demo, domain }));
  assert.equal(
    publishingUrl({ ...demo, domain: "https://pet.real.com/" }),
    "https://pet.real.com",
  );
});
test("production opens only after validating real contact data", () => {
  assert.equal(
    publishingUrl({
      ...demo,
      demo: false,
      verified: true,
      domain: "https://pet.real.com",
      address: "Endereço validado",
      businessPhone: "5513978143448",
      hours: [{ days: ["Monday"], opens: "09:00", closes: "18:00" }],
    }),
    "https://pet.real.com",
  );
});
test("WhatsApp safely encodes context and validates phone", () => {
  const url = new URL(contactUrl("5513978143448", "Olá! Banho & tosa?"));
  assert.equal(url.pathname, "/5513978143448");
  assert.equal(url.searchParams.get("text"), "Olá! Banho & tosa?");
  assert.throws(() => contactUrl("13 978143448", "Olá"));
});
test("production refuses invalid structured opening hours", () => {
  const production = {
    ...demo,
    demo: false,
    verified: true,
    domain: "https://pet.real.com",
    address: "Endereço validado",
    businessPhone: "5513978143448",
  };
  for (const hours of [
    [{ days: ["Funday"], opens: "09:00", closes: "18:00" }],
    [{ days: ["Monday"], opens: "25:00", closes: "18:00" }],
  ])
    assert.throws(() => publishingUrl({ ...production, hours }));
});

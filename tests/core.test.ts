import { describe, it, expect } from "vitest";
import { Legalmind } from "../src/core.js";
describe("Legalmind", () => {
  it("init", () => { expect(new Legalmind().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Legalmind(); await c.search(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Legalmind(); await c.search(); c.reset(); expect(c.getStats().ops).toBe(0); });
});

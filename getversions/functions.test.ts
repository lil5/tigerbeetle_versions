import { expect, test } from "bun:test";
import { CalculateHi, Compare, compare, type List } from "./functions";

test("Calculate highest updatable version", () => {
  const input: List = [
    { v: "0.16.17", c: "0.15.3", u: "0.16.12" },
    { v: "0.16.16", c: "0.15.3", u: "0.16.11" },
    { v: "0.16.14", c: "0.15.3", u: "0.16.10" },
    { v: "0.16.13", c: "0.15.3", u: "0.16.9" },
  ];

  const output = CalculateHi(input);
  expect(output[0].hi).toBe("0.16.17");
  expect(output[1].hi).toBe("0.16.17");
  expect(output[2].hi).toBe("0.16.17");
  expect(output[3].hi).toBe("0.16.17");
});

test("Compare", () => {
  [
    { a: "1.0.0", x: Compare.gt, b: "0.0.1" },
    { a: "1.0.0", x: Compare.gte, b: "0.0.1" },
    { a: "1.0.0", x: Compare.gte, b: "1.0.0" },
    { a: "1.0.0", x: Compare.gte, b: "1.0.0" },
  ].forEach(({ a, x, b }) => {
    expect(compare(a, x, b), `${a} ${x.toString()} ${b}`).toBeTrue();
  });
});

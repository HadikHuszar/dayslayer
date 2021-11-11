import { generateCopyableString } from "./index";

describe("generateCopyableString", () => {
  it("returns formatted string given data", () => {
    expect(
      generateCopyableString([
        { copyableText: "Hello!" },
        { copyableText: "cats" },
      ]),
    ).toEqual("Hello!\ncats");
  });

  it("returns empty string for empty data", () => {
    expect(generateCopyableString([])).toEqual("");
  });

  it("returns empty string for undefined value passed in", () => {
    expect(generateCopyableString()).toEqual("");
  });
});

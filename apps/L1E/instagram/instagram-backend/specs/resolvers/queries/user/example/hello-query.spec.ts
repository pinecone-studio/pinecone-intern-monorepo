import { helloQuery } from "src/resolvers/queries";


describe("Hello Query", () => {
  it("Should call hello query", () => {
    expect(helloQuery()).toBeDefined();
  });
});
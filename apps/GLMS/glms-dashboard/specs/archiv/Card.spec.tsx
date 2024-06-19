import React from "react"
import { render } from "@testing-library/react"
import { CardWithForm } from "../../src/app/archiv/_components";
import { cardData } from "../../src/app/archiv/_components";

describe("CardWithForm component", () => {
  it("renders cards correctly", () => {
    const { getByTestId } = render(<CardWithForm cards={cardData} />);

    // console.log(getByTestId('lessonTitle').textContent)

    // expect(getByTestId("test-card")).toBeDefined()
    
    // expect(getByTestId('test-card')).toBeDefined();
    // console.log(getByTestId("lessonTitle").textContent)
    // expect(getByTestId("lessonTitle").textContent).toBe("")
    
  });
});
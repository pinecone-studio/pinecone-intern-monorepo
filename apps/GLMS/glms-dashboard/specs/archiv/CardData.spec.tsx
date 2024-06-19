import React from 'react';
import { render, screen } from '@testing-library/react';
import { cardData } from "../../src/app/archiv/_components";

describe("cardData", () => {
  it("should have correct structure", () => {
    cardData.forEach((card) => {
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("title");
      expect(card).toHaveProperty("description");
      expect(card).toHaveProperty("image");
      expect(card).toHaveProperty("lessonsCount");
    });
  });

  it("should have correct data types", () => {
    cardData.forEach((card) => {
      expect(typeof card.id).toBe("number");
      expect(typeof card.title).toBe("string");
      expect(typeof card.description).toBe("string");
      expect(typeof card.image).toBe("string");
      expect(typeof card.lessonsCount).toBe("number");
    });
  });

  it("should have correct number of cards", () => {
    expect(cardData.length).toBe(3);
  });
});
import React from "react"
import { render } from "@testing-library/react"
import { CardWithForm } from "../../src/app/archiv/_components";

describe('CardWithForm', () => {
  const props = {
    id: '1',
    thumbnail: 'img',
    title: 'title',
    description: 'des',
  };

  it('renders with correct props and structure', () => {
    const { getByTestId } = render(<CardWithForm {...props} />);
    expect(getByTestId('test-card')).toBeDefined();
  });
});

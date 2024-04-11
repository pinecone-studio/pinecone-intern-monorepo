import React from "react";
import { SearchInput } from "../../src/app/dashboard/_components/SearchInput";
import { render } from "@testing-library/react";

describe('SearchInput', () => {
    it('Should call searchInput component', async () => {
        const { Search } = render(<SearchInput />);
        expect(Search).toBeDefined();
    });
  });
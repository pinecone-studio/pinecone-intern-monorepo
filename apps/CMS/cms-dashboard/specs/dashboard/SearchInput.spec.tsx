import React from "react";
import { SearchInput } from "../../../cms-dashboard/src/app/dashboard/_components/SearchInput";

describe('SearchInput', () => {
    it('Should call searchInput component', async () => {
        const { Search } = render(<SearchInput />);
        expect(Search).toBeDefined();
    });
  });
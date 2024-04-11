import { SearchInput } from "../../../src/app/dashboard/_components/SearchInput";

describe('SearchInput', () => {
    it('Should call searchInput component', async () => {
        await SearchInput()
        expect(SearchInput).toBeDefined();
    });
  });
import { SearchInput } from "../../../cms-dashboard/src/app/dashboard/_components/SearchInput";

describe('SearchInput', () => {
    it('Should call searchInput component', async () => {
        await SearchInput()
        expect(SearchInput).toBeDefined();
    });
  });
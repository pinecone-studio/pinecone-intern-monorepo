import { buildTypeFilter } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/queries/filter/type-filter";

describe('buildTypeFilter', () => {
  it('should returns $in filter when types exist', () => {
    expect(buildTypeFilter(['HOUSE', 'APARTMENT'])).toEqual({ type: { $in: ['HOUSE', 'APARTMENT'] } });
  });

  it('should returns empty object when no types', () => {
    expect(buildTypeFilter([])).toEqual({});
  });
});
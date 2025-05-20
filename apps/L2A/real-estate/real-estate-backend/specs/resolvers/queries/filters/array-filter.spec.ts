import { buildArrayFilter } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/queries/filter/array-filter";

describe('buildArrayFilter', () => {
  it('should returns empty object if values are empty', () => {
    expect(buildArrayFilter('totalRooms', [])).toEqual({});
  });

  it('should returns Mongo $in filter when values exist', () => {
    expect(buildArrayFilter('restrooms', [1, 2])).toEqual({ restrooms: { $in: [1, 2] } });
  });
});
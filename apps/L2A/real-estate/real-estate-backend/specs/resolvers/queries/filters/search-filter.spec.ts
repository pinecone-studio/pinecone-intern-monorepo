import { buildSearchFilter } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/queries/filter/search-filter";

describe('buildSearchFilter', () => {
  it('should return an empty object if input is empty string', () => {
    expect(buildSearchFilter('')).toEqual({});
  });

  it('should return an empty object if input is whitespace only', () => {
    expect(buildSearchFilter('   ')).toEqual({});
  });

  it('should return correct $or filter for valid input', () => {
    const result = buildSearchFilter('Ulaanbaatar');
    expect(result).toEqual({
      $or: [
        { 'location.city': { $regex: 'Ulaanbaatar', $options: 'i' } },
        { 'location.district': { $regex: 'Ulaanbaatar', $options: 'i' } },
      ],
    });
  });

  it('should be case-insensitive (i option in regex)', () => {
    const result = buildSearchFilter('test');
    expect(result.$or && result.$or[0] && result.$or[0]['location.city'] && result.$or[0]['location.city'].$options).toBe('i');
  });
});

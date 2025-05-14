import { buildBooleanFilter } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/queries/filter/boolean-filter";

describe('buildBooleanFilter', () => {
  it('should returns filter with true when value is true', () => {
    expect(buildBooleanFilter('garage', true)).toEqual({ garage: true });
  });

  it('should returns empty object when value is false', () => {
    expect(buildBooleanFilter('lift', false)).toEqual({});
  });

  it('should returns empty object when value is undefined', () => {
    expect(buildBooleanFilter('balcony')).toEqual({});
  });
});
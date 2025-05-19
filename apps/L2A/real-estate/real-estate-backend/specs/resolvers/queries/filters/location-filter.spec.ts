import { buildLocationFilter } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/queries/filter/location-filter";

describe('buildLocationFilter', () => {
  it('should returns both city and district when present', () => {
    expect(buildLocationFilter({ city: 'UB', district: 'SBD' })).toEqual({
      'location.city': 'UB',
      'location.district': 'SBD'
    });
  });

  it('should returns only city when district is missing', () => {
    expect(buildLocationFilter({ city: 'UB' })).toEqual({ 'location.city': 'UB' });
  });

  it('should returns empty when both are missing', () => {
    expect(buildLocationFilter()).toEqual({});
  });
});
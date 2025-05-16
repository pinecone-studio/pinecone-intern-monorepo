import { buildPriceFilter } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/queries/filter/price-filter";

describe('buildPriceFilter', () => {
  it('should returns empty object if no min/max', () => {
    expect(buildPriceFilter()).toEqual({});
  });

  it('should includes only $gte when min exists', () => {
    expect(buildPriceFilter({ min: 100 })).toEqual({ price: { $gte: 100 } });
  });

  it('should includes only $lte when max exists', () => {
    expect(buildPriceFilter({ max: 500 })).toEqual({ price: { $lte: 500 } });
  });

  it('should includes both $gte and $lte when both exist', () => {
    expect(buildPriceFilter({ min: 100, max: 500 })).toEqual({ price: { $gte: 100, $lte: 500 } });
  });
});
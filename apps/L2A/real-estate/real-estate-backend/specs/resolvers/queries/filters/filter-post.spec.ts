import { POST_MODEL } from "apps/L2A/real-estate/real-estate-backend/src/models/post";
import { filterPosts } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/queries/filter/filter-post";

jest.mock('../../../../src/models/post');

describe('filterPosts resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (POST_MODEL.find as jest.Mock).mockResolvedValue([]);
  });

  it('should return empty query when no filter provided', async () => {
    await filterPosts(null, {});
    expect(POST_MODEL.find).toHaveBeenCalledWith({});
  });

  it('should handle undefined filter', async () => {
    await filterPosts(null, { filter: undefined });
    expect(POST_MODEL.find).toHaveBeenCalledWith({});
  });

  it('should build type filter', async () => {
    await filterPosts(null, { filter: { type: ['APARTMENT'] } });
    expect(POST_MODEL.find).toHaveBeenCalledWith({
      type: { $in: ['APARTMENT'] }
    });
  });

  it('should build location filter', async () => {
    await filterPosts(null, { filter: { location: { city: 'UB' } } });
    expect(POST_MODEL.find).toHaveBeenCalledWith({
      'location.city': 'UB'
    });
  });

  it('should build price filter', async () => {
    await filterPosts(null, { filter: { price: { min: 100 } } });
    expect(POST_MODEL.find).toHaveBeenCalledWith({
      price: { $gte: 100 }
    });
  });

  it('should build array filters', async () => {
    await filterPosts(null, { filter: { totalRooms: [2], restrooms: [1] } });
    expect(POST_MODEL.find).toHaveBeenCalledWith({
      totalRooms: { $in: [2] },
      restrooms: { $in: [1] }
    });
  });

  it('should build boolean filters (true values only)', async () => {
    await filterPosts(null, { filter: { garage: true, balcony: true } });
    expect(POST_MODEL.find).toHaveBeenCalledWith({
      garage: true,
      balcony: true
    });
  });

  it('should combine all filters', async () => {
    await filterPosts(null, {
      filter: {
        type: ['APARTMENT'],
        location: { city: 'UB' },
        price: { min: 100 },
        totalRooms: [2],
        garage: true
      }
    });
    expect(POST_MODEL.find).toHaveBeenCalledWith({
      type: { $in: ['APARTMENT'] },
      'location.city': 'UB',
      price: { $gte: 100 },
      totalRooms: { $in: [2] },
      garage: true
    });
  });

  it('should handle null filter values', async () => {
    await filterPosts(null, { filter: { type: null, location: null } });
    expect(POST_MODEL.find).toHaveBeenCalledWith({});
  });
});
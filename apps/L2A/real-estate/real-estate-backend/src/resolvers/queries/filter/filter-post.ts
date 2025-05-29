import { POST_MODEL } from '../../../models/post';
import { buildArrayFilter } from './array-filter';
import { buildBooleanFilter } from './boolean-filter';
import { buildLocationFilter } from './location-filter';
import { buildPriceFilter } from './price-filter';
import { buildSearchFilter } from './search-filter';
import { buildTypeFilter } from './type-filter';

export const filterPosts = async (_: any, { filter }: { filter: any }) => {
  const query = {
    ...buildTypeFilter(filter?.type),
    ...buildLocationFilter(filter?.location),
    ...buildPriceFilter(filter?.price),
    ...buildArrayFilter('totalRooms', filter?.totalRooms),
    ...buildArrayFilter('restrooms', filter?.restrooms),
    ...buildBooleanFilter('garage', filter?.garage),
    ...buildBooleanFilter('lift', filter?.lift),
    ...buildBooleanFilter('balcony', filter?.balcony),
    ...buildSearchFilter(filter?.debouncedSearch)
  };
  return POST_MODEL.find(query);
};
  
import { buildType } from "./build-type";
import { buildPrice } from "./build-price";
import { buildRooms } from "./build-room";
import { buildRestrooms } from "./build-rest-room";
import { buildLocation } from "./build-location";
import { buildBooleans } from "./build-boolean";
import { buildSearch } from "./build-search";


export const buildFilters = (params: Record<string, any>) => ({
  ...buildType(params.type),
  ...buildRooms(params.totalRooms),
  ...buildRestrooms(params.restrooms),
  ...buildLocation(params.city, params.district),
  ...buildPrice(params.minPrice, params.maxPrice),
  ...buildBooleans(params),
  ...buildSearch(params.searchValue)
});
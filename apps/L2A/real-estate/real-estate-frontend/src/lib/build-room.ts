export const buildRooms = (rooms?: string) => {
  return rooms ? { totalRooms: rooms.split(',').map(Number) } : {};
};
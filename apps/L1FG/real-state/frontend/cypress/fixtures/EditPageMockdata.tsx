export const mockData = {
  getPostById: {
    _id: 'test-id',
    title: 'Test Property',
    price: '100000',
    description: 'Test Description',
    status: 'PENDING',
    propertyDetail: {
      houseType: 'Apartment',
      size: '120',
      totalRooms: 3,
      images: ['/test-image.jpg', '/another-image.png'],
      garage: false,
      restrooms: 2,
      location: {
        city: 'Test City',
        district: 'Test District',
        subDistrict: 'Test SubDistrict',
        address: 'Test Address',
      },
      details: {
        completionDate: '2025-01-01',
        windowsCount: 4,
        windowType: 'Double Glass',
        floorMaterial: 'Hardwood',
        floorNumber: 2,
        totalFloors: 10,
        balcony: true,
        lift: true,
      },
    },
  },
};

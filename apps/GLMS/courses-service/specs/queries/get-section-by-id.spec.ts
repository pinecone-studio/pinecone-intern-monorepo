import { getSectionById } from '@/graphql/resolvers/queries';
import sectionModel from '@/model/section-model';
import { GraphQLResolveInfo } from 'graphql';

describe('getSectionById resolver', () => {
    it('should return section if found', async () => {
      const mockSectionId = 'mockSectionId';
      const mockSection = { _id: mockSectionId, name: 'Mock Section' };
      const mockArgs = { id: mockSectionId };
      
      jest.spyOn(sectionModel, 'findById').mockResolvedValue(mockSection);
  
      const result = await getSectionById!({}, mockArgs, {},{} as GraphQLResolveInfo);
  
      expect(result).toEqual(mockSection);
      expect(sectionModel.findById).toHaveBeenCalledWith(mockSectionId);
    });
  
    it('should throw an error if section is not found', async () => {
      const mockArgs = { id: 'nonExistingId' };
  
      jest.spyOn(sectionModel, 'findById').mockResolvedValue(null);
  
      await expect(getSectionById!({}, mockArgs, {}, {} as GraphQLResolveInfo)).rejects.toThrow('unknown error');
      expect(sectionModel.findById).toHaveBeenCalledWith('nonExistingId');
    });
  
    it('should throw an error if an unknown error occurs', async () => {
      const mockArgs = { id: 'mockId' };
      const mockError = new Error('Mock Error');
  
      jest.spyOn(sectionModel, 'findById').mockRejectedValue(mockError);
  
      await expect(getSectionById!({}, mockArgs, {}, {} as GraphQLResolveInfo)).rejects.toThrow('unknown error');
      expect(sectionModel.findById).toHaveBeenCalledWith('mockId');
    });
  });
  

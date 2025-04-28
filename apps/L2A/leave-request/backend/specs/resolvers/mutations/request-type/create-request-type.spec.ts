import { createRequestType } from '../../../../src/resolvers/mutations/request-type/create-request-type';
import { RequestType } from '../../../../src/models/models';
import type { RequestTypeInput } from '../../../../src/generated';

jest.mock('../../../../src/models/models');

describe('Request type mutation createRequestType resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockArgs: { args: RequestTypeInput } = {
    args: {
      name: 'Test Request Type',
      limit: 10,
      period: 'monthly',
    } as RequestTypeInput,
  };

  it('should create and save a new RequestType successfully', async () => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    (RequestType as unknown as jest.Mock).mockImplementation(() => ({
      save: saveMock,
      ...mockArgs.args, // Spread the mock args directly here
    }));

    const result = await createRequestType(null, mockArgs);

    expect(RequestType).toHaveBeenCalledWith({ ...mockArgs.args });
    expect(saveMock).toHaveBeenCalled();
    // Check that the result contains the properties we expect
    expect(result).toEqual(
      expect.objectContaining({
        name: mockArgs.args.name,
        limit: mockArgs.args.limit,
        period: mockArgs.args.period,
      })
    );
  });

  it('should throw an error if saving fails', async () => {
    const saveMock = jest.fn().mockRejectedValue(new Error('Save failed'));
    (RequestType as unknown as jest.Mock).mockImplementation(() => ({
      save: saveMock,
      ...mockArgs.args, // Spread the mock args directly here
    }));

    await expect(createRequestType(null, mockArgs)).rejects.toThrow('Failed to create requestType: Error: Save failed');

    expect(RequestType).toHaveBeenCalledWith({ ...mockArgs.args });
    expect(saveMock).toHaveBeenCalled();
  });
});

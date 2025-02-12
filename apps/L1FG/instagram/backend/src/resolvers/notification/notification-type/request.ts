import { Request } from '../../../generated';
import { RequestModel } from '../../../models';

export const request = async ({ userId, ownerId }: { userId: string | null; ownerId: string | null }, _: unknown, __: unknown) => {
  if (!userId && !ownerId) {
    return null;
  }

  const foundRequest: Request | null = await RequestModel.findOne({ from: userId, to: ownerId });

  if (!foundRequest) {
    throw new Error('not found request');
  }

  const status = foundRequest.status;

  return status;
};

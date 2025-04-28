import { RequestType } from '../../../models/models';
import type { RequestTypeInput } from '../../../generated';

export async function createRequestType(_parent: any, args: { args: RequestTypeInput }) {
  try {
    const newRequestType = new RequestType({ ...args.args });
    await newRequestType.save();
    return newRequestType;
  } catch (error) {
    throw new Error(`Failed to create requestType: ${error}`);
  }
}

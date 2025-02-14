import { Follow, FriendshipStatusType, Request } from '../../../generated';

export type StatusType = Follow | Request | null;
const returnNames = ['following', 'incomingRequest', 'outgoingRequest', 'followedBy'];
export const statusBooleanConverter = ({ arg }: { arg: StatusType[] }) => {
  const returnObj: {
    [key: string]: boolean;
  } = {};
  for (let i = 0; i < arg.length; i++) {
    returnObj[returnNames[i]] = arg[i] ? true : false;
  }
  return returnObj as FriendshipStatusType;
};

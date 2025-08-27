import { QueryResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';
import type { User, Match } from 'src/generated';
import type { IUserLean, IMatchLean, IInterestLean } from 'src/types';

const defaultToUndefined = <T>(value: T | undefined | null): T | undefined => (value === null ? undefined : value);

const mapUserPersonalInfo = (u: IUserLean) => ({
  name: defaultToUndefined(u.name),
  bio: defaultToUndefined(u.bio),
  dateOfBirth: defaultToUndefined(u.dateOfBirth),
});

const mapUserPreferences = (u: IUserLean) => ({
  gender: defaultToUndefined(u.gender),
  genderPreferences: defaultToUndefined(u.genderPreferences),
});

const mapUserProfileExtras = (u: IUserLean) => ({
  images: u.images ?? [],
  profession: defaultToUndefined(u.profession),
  schoolWork: defaultToUndefined(u.schoolWork),
});

const mapUser = (u: IUserLean): User => {
  if (!u.email) throw new Error('Email is missing');

  return {
    id: u._id.toString(),
    email: u.email,
    ...mapUserPersonalInfo(u),
    ...mapUserPreferences(u),
    ...mapUserProfileExtras(u),
    matchIds: [],
    likedBy: [],
    likedTo: [],
  };
};

const mapMatch = (m: any, currentUserId: string): Match => {
  const matchedUserRaw = m.users.find((u: any) => u._id.toString() !== currentUserId);
  if (!matchedUserRaw) {
    throw new Error('Matched user not found');
  }
  const matchedUser = mapUser(matchedUserRaw);

  return {
    id: m._id.toString(),
    matchedAt: m.matchedAt,
    unmatched: m.unmatched ?? false,
    startedConversation: m.startedConversation ?? false,
    matchedUser,
  };
};

async function fetchPopulatedUser(userId: string): Promise<IUserLean> {
  const user = await Usermodel.findById(userId)
    .populate({
      path: 'likedBy',
      populate: { path: 'matchIds', populate: { path: 'users' } },
    })
    .populate({
      path: 'likedTo',
      populate: { path: 'matchIds', populate: { path: 'users' } },
    })
    .populate({
      path: 'matchIds',
      populate: { path: 'users' },
    })
    .populate('interests')
    .lean<IUserLean>();

  if (!user) throw new Error('User not found');

  return user;
}

function mapMatchIds(matchIds: IMatchLean[] | null | undefined, currentUserId: string): Match[] {
  if (!matchIds) return [];
  return matchIds.map((m) => mapMatch(m, currentUserId));
}

function mapLikedBy(likedBy: IUserLean[] | null | undefined) {
  if (!likedBy) return [];
  return likedBy.map(mapUser);
}

function mapLikedTo(likedTo: IUserLean[] | null | undefined) {
  if (!likedTo) return [];
  return likedTo.map(mapUser);
}

function mapInterests(interests: IInterestLean[] | null | undefined) {
  if (!interests) return [];
  return interests
    .filter((i) => i && i._id)
    .map((i) => ({
      _id: i._id.toString(),
      interestName: i.interestName,
    }));
}

function mapBaseUserFields(user: IUserLean, userId: string) {
  if (!user.email) {
    throw new Error('User email is missing');
  }

  return {
    id: user._id.toString(),
    email: user.email,
    images: user.images ?? [],
    matchIds: mapMatchIds(user.matchIds, userId),
    likedBy: mapLikedBy(user.likedBy),
    likedTo: mapLikedTo(user.likedTo),
  };
}

function mapOptionalUserFields(user: IUserLean) {
  return {
    name: defaultToUndefined(user.name),
    bio: defaultToUndefined(user.bio),
    dateOfBirth: defaultToUndefined(user.dateOfBirth),
    gender: defaultToUndefined(user.gender),
    genderPreferences: defaultToUndefined(user.genderPreferences),
    profession: defaultToUndefined(user.profession),
    schoolWork: defaultToUndefined(user.schoolWork),
  };
}

function mapPopulatedUserToUser(user: IUserLean, userId: string): User {
  return {
    ...mapBaseUserFields(user, userId),
    ...mapOptionalUserFields(user),
    interests: mapInterests(user.interests),
  };
}

export const getMe: QueryResolvers['getMe'] = async (_parent, _args, context, _info): Promise<User> => {
  const userId = context.userId;

  if (!userId) throw new Error('Not authenticated');

  const user = await fetchPopulatedUser(userId);

  return mapPopulatedUserToUser(user, userId);
};

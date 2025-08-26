import { QueryResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';
import type { User, Match } from 'src/generated';
import { PopulatedUser } from 'src/types';

const defaultToUndefined = <T>(value: T | undefined | null): T | undefined => (value === null ? undefined : value);

const mapUserPersonalInfo = (u: any) => ({
  name: u.name ?? null,
  bio: u.bio ?? null,
  dateOfBirth: u.dateOfBirth ?? null,
});

const mapUserPreferences = (u: any) => ({
  gender: u.gender ?? null,
  genderPreferences: u.genderPreferences ?? null,
});

const mapUserProfileExtras = (u: any) => ({
  images: u.images ?? [],
  profession: u.profession ?? null,
  schoolWork: u.schoolWork ?? null,
});

const mapUser = (u: any): User => {
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
    matchedAt: m.matchedAt?.toISOString(),
    unmatched: m.unmatched ?? false,
    matchedUser,
  };
};

async function fetchPopulatedUser(userId: string): Promise<PopulatedUser> {
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
    .lean<PopulatedUser>();

  if (!user) throw new Error('User not found');

  return user;
}
function mapMatchIds(matchIds: any[] | undefined, currentUserId: string): Match[] {
  if (!matchIds) return [];
  return matchIds.map((m) => mapMatch(m, currentUserId));
}

function mapLikedBy(likedBy: any[] | undefined) {
  if (!likedBy) return [];
  return likedBy.map(mapUser);
}

function mapLikedTo(likedTo: any[] | undefined) {
  if (!likedTo) return [];
  return likedTo.map(mapUser);
}
function mapInterests(interests: any[] | undefined) {
  if (!interests) return [];
  return interests
    .filter((i) => i && i._id)
    .map((i) => ({
      _id: i._id.toString(),
      interestName: i.interestName,
    }));
}
function mapBaseUserFields(user: PopulatedUser, userId: string) {
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

function mapOptionalUserFields(user: PopulatedUser) {
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

function mapPopulatedUserToUser(user: PopulatedUser, userId: string): User {
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

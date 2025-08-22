import { QueryResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';
import type { User, Match } from 'src/generated';
import { PopulatedUser } from 'src/types';

const mapMatch = (m: any): Match => ({
  id: m._id.toString(),
  matchedAt: m.matchedAt?.toISOString(),
  unmatched: m.unmatched ?? false,
  users:
    m.users?.map((u: any) => ({
      id: u._id.toString(),
      email: u.email,
      name: u.name ?? null,
      bio: u.bio ?? null,
      dateOfBirth: u.dateOfBirth ?? null,
      gender: u.gender ?? null,
      genderPreferences: u.genderPreferences ?? null,
      images: u.images ?? [],
      matchIds: [],
      profession: u.profession ?? null,
      schoolWork: u.schoolWork ?? null,
      likedBy: [],
      likedTo: [],
    })) ?? [],
});

const mapUser = (u: any): User => ({
  id: u._id.toString(),
  email: u.email,
  name: u.name ?? null,
  bio: u.bio ?? null,
  dateOfBirth: u.dateOfBirth ?? null,
  gender: u.gender ?? null,
  genderPreferences: u.genderPreferences ?? null,
  images: u.images ?? [],
  matchIds: u.matchIds?.map(mapMatch) ?? [],
  profession: u.profession ?? null,
  schoolWork: u.schoolWork ?? null,
  likedBy: [],
  likedTo: [],
});

export const getMe: QueryResolvers['getMe'] = async (_parent, _args, context, _info): Promise<User> => {
  const userId = context.userId;

  if (!userId) throw new Error('Not authenticated');

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
    .lean<PopulatedUser>();

  if (!user) throw new Error('User not found');

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name ?? undefined,
    bio: user.bio ?? undefined,
    dateOfBirth: user.dateOfBirth ?? undefined,
    gender: user.gender ?? undefined,
    genderPreferences: user.genderPreferences ?? undefined,
    images: user.images ?? [],
    profession: user.profession ?? undefined,
    schoolWork: user.schoolWork ?? undefined,
    matchIds: user.matchIds?.map(mapMatch) ?? [],
    likedBy: user.likedBy?.map(mapUser) ?? [],
    likedTo: user.likedTo?.map(mapUser) ?? [],
  };
};

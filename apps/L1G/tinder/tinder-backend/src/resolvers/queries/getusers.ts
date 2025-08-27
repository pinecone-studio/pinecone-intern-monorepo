import { Usermodel } from 'src/models/user';
import { IInterestLean, IMatchLean, IUserLean } from 'src/types';

export const mapSimpleUser = (user: IUserLean) => ({
  id: user._id!.toString(),
  email: user.email,
  name: user.name,
  dateOfBirth: user.dateOfBirth,
  genderPreferences: user.genderPreferences,
  gender: user.gender,
  bio: user.bio,
  interests:
    user.interests && user.interests.length > 0
      ? user.interests
          .filter((interest): interest is IInterestLean => !!interest && !!interest._id)
          .map((interest) => ({
            _id: interest._id!.toString(),
            interestName: interest.interestName,
          }))
      : undefined,
  profession: user.profession,
  schoolWork: user.schoolWork,
  images: user.images ?? [],
  likedBy: [],
  likedTo: [],
  matchIds: [],
});

export const mapMatchedUsers = (matched: IUserLean[] | null = []) => (Array.isArray(matched) ? matched.map(mapSimpleUser) : []);

export const mapLikedByUsers = (likedBy: IUserLean[] | null = []) => (Array.isArray(likedBy) ? likedBy.map(mapSimpleUser) : []);

export const mapLikedToUsers = (likedTo: IUserLean[] | null = []) => (Array.isArray(likedTo) ? likedTo.map(mapSimpleUser) : []);
/* eslint-disable-next-line complexity */
const mapMatch = (match: IMatchLean, currentUserId: string) => {
  const matchedUser = Array.isArray(match.users) ? match.users.find((user) => user._id.toString() !== currentUserId) : null;

  return {
    id: match._id.toString(),
    matchedAt: match.matchedAt,
    unmatched: match.unmatched,
    startedConversation: match.startedConversation ?? false,
    matchedUser: matchedUser
      ? {
          id: matchedUser._id.toString(),
          name: matchedUser.name,
          email: matchedUser.email,
          images: matchedUser.images ?? [],
          profession: matchedUser.profession,
          dateOfBirth: matchedUser.dateOfBirth,
          bio: matchedUser.bio,
          schoolWork: matchedUser.schoolWork,
          interests:
            matchedUser.interests && matchedUser.interests.length > 0
              ? (() => {
                  const filtered = matchedUser.interests.filter((interest): interest is IInterestLean => !!interest && !!interest._id);
                  return filtered.length > 0
                    ? filtered.map((interest) => ({
                        _id: interest._id!.toString(),
                        interestName: interest.interestName,
                      }))
                    : null;
                })()
              : null,
          gender: matchedUser.gender,
          genderPreferences: matchedUser.genderPreferences,
        }
      : null,
  };
};

/* eslint-disable-next-line complexity */
const transformUser = (user: IUserLean & { matchIds?: IMatchLean[] | null }) => ({
  id: user._id ? user._id.toString() : '',
  email: user.email,
  name: user.name,
  dateOfBirth: user.dateOfBirth,
  genderPreferences: user.genderPreferences,
  gender: user.gender,
  bio: user.bio,
  interests:
    user.interests && user.interests.length > 0
      ? user.interests.map((interest) => ({
          _id: interest._id ? interest._id.toString() : '',
          interestName: interest.interestName,
        }))
      : undefined,
  profession: user.profession,
  schoolWork: user.schoolWork,
  images: user.images ?? [],
  matchIds: user.matchIds ? user.matchIds.map((m) => mapMatch(m, user._id!.toString())) : [],
  likedBy: mapLikedByUsers(user.likedBy),
  likedTo: mapLikedToUsers(user.likedTo),
});

export const getusers = async () => {
  try {
    const users = await Usermodel.find()
      .populate('likedBy')
      .populate('likedTo')
      .populate({
        path: 'matchIds',
        populate: {
          path: 'users',
          model: 'User',
          select: 'name email _id images profession dateOfBirth gender genderPreferences bio interests schoolWork',
        },
      })
      .populate('interests')
      .lean<IUserLean[]>();

    return users.map(transformUser);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error while fetching users';

    if (process.env.NODE_ENV !== 'production') {
      console.error('⚠️ Failed to fetch users:', error);
    }

    throw new Error(message);
  }
};

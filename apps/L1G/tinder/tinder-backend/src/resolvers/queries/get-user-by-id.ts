import { QueryResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';

export const getUser: QueryResolvers['getUser'] = async (_, { _id }) => {
  const user = await Usermodel.findById(_id)
    .populate('interests')
    .populate('likedBy')
    .populate('likedTo')
    .populate({
      path: 'matchIds',
      populate: {
        path: 'users',
        select: 'name email _id images profession dateOfBirth gender genderPreferences bio interests schoolWork',
      },
    });

  if (!user) {
    throw new Error('User not found');
  }

  const userObj = user.toObject();

  /* eslint-disable-next-line complexity */
  const mappedMatchIds = (userObj.matchIds ?? []).map((match: any) => {
    const matchedUser = (match.users ?? []).find((u: any) => u._id.toString() !== _id.toString());

    return {
      id: match._id.toString(),
      startedConversation: match.startedConversation,
      unmatched: match.unmatched,
      matchedAt: match.matchedAt,
      matchedUser: matchedUser
        ? {
            name: matchedUser.name,
            email: matchedUser.email,
            images: matchedUser.images,
            profession: matchedUser.profession,
            schoolWork: matchedUser.schoolWork,
            bio: matchedUser.bio,
            gender: matchedUser.gender,
            genderPreferences: matchedUser.genderPreferences,
            interests:
              matchedUser.interests && matchedUser.interests.length > 0
                ? (() => {
                    const filtered = matchedUser.interests.filter((interest: any) => !!interest && !!interest._id);
                    return filtered.length > 0
                      ? filtered.map((interest: any) => ({
                          _id: interest._id.toString(),
                          interestName: interest.interestName,
                        }))
                      : null;
                  })()
                : null,

            dateOfBirth: matchedUser.dateOfBirth,
            id: matchedUser._id.toString(),
          }
        : null,
    };
  });

  return {
    id: userObj._id.toString(),
    email: userObj.email,
    interests: userObj.interests,
    profession: userObj.profession,
    schoolWork: userObj.schoolWork,
    images: userObj.images,
    matchIds: mappedMatchIds,
    likedBy: userObj.likedBy,
    likedTo: userObj.likedTo,
    bio: userObj.bio,
    dateOfBirth: userObj.dateOfBirth,
    gender: userObj.gender,
    name: userObj.name,
  };
};

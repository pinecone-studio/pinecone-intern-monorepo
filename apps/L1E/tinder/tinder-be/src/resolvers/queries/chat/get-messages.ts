// import { QueryResolvers } from '../../../generated';
// import FolderModel from '../../../models/chat/conversation.model';
// import { userModel } from '../../../models/user/user.model';

// export const getMessages: QueryResolvers['getMessages'] = async (_, { sender, chosenUserId }) => {
//   console.log(sender, chosenUserId);

//   const folder = await FolderModel.find({
//     $and: [{ userOne: sender }, { userTwo: chosenUserId }],
//   });

//   console.log('Individual conversation:', folder);

//   //   const user = await userModel.findOne({ _id: sender });

//   //   if (!user) {
//   //     throw new Error('User not found');
//   //   }

//   // Find conversations where the user is either `userOne` or `userTwo`
//   return folder; // Adjust the return type as needed
// };

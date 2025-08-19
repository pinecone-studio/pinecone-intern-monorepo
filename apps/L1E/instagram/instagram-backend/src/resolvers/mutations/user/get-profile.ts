import { MutationResolvers } from "src/generated";
import { User } from "src/models";

export const getProfiles: MutationResolvers['getProfiles'] = async (_, { userName }) => {
    try {
        const search = userName.toLowerCase();
        const users = await User.find();
        return users.filter(u => u.userName.toLowerCase().includes(search))
        // return users || []
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return []
    }
};

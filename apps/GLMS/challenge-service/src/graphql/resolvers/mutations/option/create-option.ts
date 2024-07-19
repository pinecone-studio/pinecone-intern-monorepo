import { CreateOptionInput } from "@/graphql/generated";
import { OptionModel } from "@/models/option-model";
import { GraphQLError } from "graphql";

export const createOption = async (_: unknown, {createInput}: {createInput: CreateOptionInput}) => {
    try {
        const newOption = await OptionModel.create({...createInput})
        return newOption
    } catch (error){
        const message = (error as Error).message;
        throw new GraphQLError(`Failed to create option: ${message}`);
    }
}
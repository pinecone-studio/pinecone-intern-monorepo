import { QueryResolvers } from "@/graphql/generated";
import { OptionModel } from "@/models/option-model";
import { GraphQLError } from "graphql";

export const getOptions: QueryResolvers['getOptions'] = async () => {
  try {
    const getOptions = await OptionModel.find({})
    return getOptions
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get options ${message}`)
  }
}
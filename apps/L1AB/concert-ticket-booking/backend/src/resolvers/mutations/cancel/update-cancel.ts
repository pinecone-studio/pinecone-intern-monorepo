import {  CancelUpateInput, } from "../../../generated";
import { cancelModel } from "../../../models";


export const updateCancel=async(_: unknown, { input }: { input:CancelUpateInput })=>{
    try{
        const { status} = input;
        const updateCancel = await cancelModel.findByIdAndUpdate(
            { _id: input._id, status},
            {
                status,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updateCancel) {
            throw new Error('Event not found');
          }
      
          return updateCancel;
        } catch (error) {
          throw new Error('Failed to update event');
        }
      }
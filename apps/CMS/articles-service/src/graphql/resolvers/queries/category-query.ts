import { CategoryModel } from "@/models/category.model";

export const categoryQuery = async () => {
    try {
        const data = await CategoryModel.find({})
        return data
    } catch (error) {
        console.log(error);
    }
}
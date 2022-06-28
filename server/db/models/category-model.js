import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model('categories', CategorySchema);

export class CategoryModel {
    async create(categoryInfo) {
        const createdNewCategory = await Category.create(categoryInfo);
        return createdNewCategory;
    }

    async findAll() {
        const categories = await Category.find({});
        return categories;
    }

    async findOne(categoryInfo) {
        const category = await Category.findOne(categoryInfo);
        return category;
    }

    async update(category_id, newCategoryInfo) {
        const filter = { _id: category_id };

        const updatedCategory = await Category.updateOne(filter, newCategoryInfo);
        return updatedCategory;
    }

    async remove(category_id) {
        const filter = { _id: category_id };

        const deletedCategory = await Category.deleteOne(filter);
        return deletedCategory;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel }

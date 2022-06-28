import { categoryModel } from '../db';

class CategoryService {

    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async addCategory(categoryInfo) {
        const foundCategory = await this.categoryModel.findOne(categoryInfo);

        if (foundCategory) {
            throw new Error("이미 등록되어 있는 카테고리 입니다.");
        }

        const createdNewCategory = await this.categoryModel.create(categoryInfo);
        return createdNewCategory;
    }

    async getCategories() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }

    async getSpecificCategory(categoryInfo) {
        const category = await this.categoryModel.findOne(categoryInfo);
        return category;
    }

    async updateCategory(category_id, newCategoryInfo) {
        const updatedCategory = await this.categoryModel.update(category_id, newCategoryInfo);
        return updatedCategory;
    }

    async deleteCategory(category_id) {
        const deletedCategory = await this.categoryModel.remove(category_id);
        return deletedCategory;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
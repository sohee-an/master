import { categoryService } from "../services";
import { Router } from "express";
import is from '@sindresorhus/is';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();

        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
});

categoryRouter.post('/register', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        const { largeCategory, mediumCategory } = req.body;
        const newCategory = await categoryService.addCategory({ largeCategory, mediumCategory });

        res.status(200).json(newCategory);
    } catch (err) {
        next(err);
    }
});

categoryRouter.patch('/:id', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        const category_id = req.params.id;
        const { largeCategory, mediumCategory } = req.body;

        const updatedCategory = await categoryService.updateCategory(category_id, { largeCategory, mediumCategory });

        res.status(200).json(updatedCategory);
    } catch (err) {
        next(err)
    }
});

categoryRouter.delete('/:id', async (req, res, next) => {
    try {
        const category_id = req.params.id;

        const deletedCategory = await categoryService.deleteCategory(category_id);

        res.status(200).json(deletedCategory);
    } catch (error) {
        next(err)
    }
});

export { categoryRouter };
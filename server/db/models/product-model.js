import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model('products', ProductSchema);
class ProductModel {

    async create(productInfo) { //productInfo는 객체이다.
       
        const createdProduct = await Product.create(productInfo);
        console.log(createdProduct);
        return createdProduct;
    }

    async findAll() {
        console.log("모델 들어옴")
        const products = await Product.find({}).populate('userId')
       
        return products;
    }

    async findOneById(product_id) {
        const product = await Product.findOne({ _id: product_id }).populate('category_id');
        return product;
    }

    async findOneByNameAndBrand(productInfo) {
        const product = await Product.findOne(productInfo);
        return product;
    }

    async update(product_id, updateProductInfo) { //updateProductInfo는 객체이다.
        const filter = { _id: product_id };

        const updatedProduct = await Product.updateOne(filter, updateProductInfo);

        return updatedProduct;
    }

    //  리뷰 갯수랑 별점구해서 저장하는 거
    async updateReview(productId, updateReviews) {
        const filter = { _id: productId };
        console.log(updateReviews);
        const updateReview = await Product.updateOne(filter, updateReviews);
        console.log(updateReview);
    }

    async remove(product_id) {
        const filter = { _id: product_id };

        const removedProduct = await Product.deleteOne(filter);

        return removedProduct;
    }

    async findByString(productName) {
        const filter = { name: new RegExp(productName) }

        const searchedProducts = await Product.find(filter);

        return searchedProducts;
    }
}

const productModel = new ProductModel();

export { productModel };

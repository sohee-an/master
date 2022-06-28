import { productModel } from "../db";
import multer from 'multer'

class ProductService {
    constructor(productModel) {
        this.productModel = productModel
    }

    async addProduct(productInfo) {
        
        const {title,content,category,price,priceConsulation,img}=productInfo
       
    console.log(title.title);
    const newProductInfo= {
        title:title.title,
        content:content.content,
        category:category.category,
        price:price.price,
        priceConsulation:priceConsulation.priceConsulation,
        img:img.img
    }
    console.log("!!!!!!!!!")
    console.log(newProductInfo)
        // const foundProduct = await this.productModel.findOneByNameAndBrand({ name: productInfo.name, brand: productInfo.brand });

        // if (foundProduct) {
        //     throw new Error("이미 등록된 상품입니다.");
        // }

        // const createProduct = await this.productModel.create(newProductInfo);
        //  return createProduct;
    }

    async getProductAll() {
        const products = await this.productModel.findAll();
        //const productsLike= await this.productModel.findLike();
        console.log("!!!!!!!!!!!!!!!!!!!!")
        console.log(products)
        
        return products;
    }

    async getProductDetail(product_id) {
        const product = await this.productModel.findOneById(product_id);
        return product;
    }

    async deleteProduct(product_id) {
        const deletedProduct = await this.productModel.remove(product_id);
        return deletedProduct;
    }

    async updateProductInfo(product_id, updateProductInfo) {

        const updatedProduct = await this.productModel.update(product_id, updateProductInfo)
        return updatedProduct;
    }

    async updateProduct(productId, reviewsDate) {
        const updateReview = await this.productModel.updateReview(productId, reviewsDate)
        console.log(updateReview);
    }

    async getSearchedProducts(productName) {
        const searchedProducts = await this.productModel.findByString(productName);

        if (searchedProducts.length === 0) {
            throw new Error("조회된 상품이 없습니다.")
        }

        return searchedProducts;
    }

}

const productService = new ProductService(productModel);

export { productService }
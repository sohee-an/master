import { model } from 'mongoose';
import { ReviwsSchema } from '../schemas/review-schema';

const Reviews = model('reviews', ReviwsSchema);

export class ReviewsModel {
  async addReview(reviews) {
    const createdReviews = await Reviews.create(reviews);
    return createdReviews;
  }// like부분 추가하기 
  async addLkie(like){
    const createdLkie=await Reviews.create(like);
    console.log(createdLkie)
  }// llike부분 찾아오기 
  async findLike(productId){
    const findLike=await Reviews.find({productId:productId}).populate("userId")//.populate("productId");
    console.log(findLike)
    return findLike;
  
  }

  // 맞는 상품의 아이디의 주문 갯수 
  async totalRevew(productId) {
    const total = await Reviews.find({ productId: productId });
    return total;
  }

  async productReveiew(productId) {
    const productReveiew = await Reviews.find({ productId: productId }).populate('userId');
    return productReveiew;
  }
}

const reviewsModel = new ReviewsModel();
export { reviewsModel };

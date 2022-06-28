import { model } from 'mongoose';
import { ReviwsSchema } from '../schemas/review-schema';

const Reviews = model('reviews', ReviwsSchema);

export class ReviewsModel {
  async addReview(reviews) {
    const createdReviews = await Reviews.create(reviews);
    return createdReviews;
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

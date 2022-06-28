import { reviewsModel, productModel } from '../db';

class ReviewService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(reviewModel) {
    this.reviewModel = reviewModel;
  }

  // 리뷰 저장하기 
  async addReview(reviews) {
    //console.log(reviews);
    const addedReview = await this.reviewModel.addReview(reviews);
    return addedReview;

  }

  async productRevewUpdate(productId, rating) {
    const product_totalData = await this.reviewModel.totalRevew(productId);

    // 리뷰 합치기 
    let product_ratingTotals = rating;
    for (let i = 0; i < product_totalData.length; i++) {
      product_ratingTotals += product_totalData[i].rating
    }

    //리뷰갯수+현재보내는거 합치기 
    const product_reviewTotal = product_totalData.length + 1;

    const product_RatingAvg = (product_ratingTotals / product_reviewTotal).toFixed(1);
    return { reviewTotal: product_reviewTotal, ratingAvg: product_RatingAvg }
  }

  ////// 이건 불러오는거 ////
  async reviewData(productId) {
    // 상품 총 갯수 구함 
    const productTotalData = await this.reviewModel.totalRevew(productId);
    const reviewTotal = productTotalData.length;
    let ratingTotals = 0;

    for (let i = 0; i < reviewTotal; i++) {
      ratingTotals += productTotalData[i].rating

    }
    const ratingAvg = (ratingTotals / (reviewTotal)).toFixed(1);

    return { reviewTotal: reviewTotal, ratingAvg: ratingAvg }

  }

  async prodcutReview(productId) {
    const prodcutData = await this.reviewModel.productReveiew(productId);

    let productReviews = [];
    for (let i = 0; i < prodcutData.length; i++) {
      const fullName = prodcutData[i].userId.fullName;
      const reviewText = prodcutData[i].reviewText;
      const rating = prodcutData[i].rating;

      productReviews.push({
        fullName: fullName,
        reviewText: reviewText,
        rating: rating

      });
    }
    return productReviews

  }

}

const reviewService = new ReviewService(reviewsModel);

export { reviewService };

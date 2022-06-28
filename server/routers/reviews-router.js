import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { reviewService, productService } from '../services';

const reviwRouter = Router();

//리뷰한거 저장하는거  //여기에 평균별점이랑 리뷰갯수 저장해보자 
reviwRouter.post('/', loginRequired, async (req, res, next) => {

    try {

        const userId = req.currentUserId;
        const reviewText = req.body.reviewText;
        const rating = req.body.rating
        const productId = req.body.productId;
        // 프로덕트 아이디가지고 리뷰갯수찾기

        const reviewsDate = await reviewService.productRevewUpdate(productId, rating);
        const productReviews = await productService.updateProduct(productId, reviewsDate);

        const addReviews = await reviewService.addReview({
            userId,
            reviewText,
            rating,
            productId,
        });

        res.status(201).json(addReviews);
    } catch (error) {
        next(error);
    }
});



// 상품에 대한 별점의 평균 그리고 전체 리뷰수 
reviwRouter.get('/reviewRating/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const resReviewData = await reviewService.reviewData(productId);

        res.status(201).json(resReviewData);

    } catch (error) {
        next(error);
    }
});

// 상품에 코멘트한 유저이름,코멘트 내용, 개별 별점 이렇게 보내주는 것
reviwRouter.get('/productReview/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const resProductReviw = await reviewService.prodcutReview(productId);

        res.status(201).json(resProductReviw);

    } catch (error) {
        next(error);
    }
})




export { reviwRouter };

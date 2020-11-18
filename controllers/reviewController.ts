import { Review } from './../angular/app/pages/review-page/review-page-review.model';
import { catchAsyncErrors } from '../utils/catchAsyncErrors';
const createResErr = require('./../utils/createResErr');

const ReviewModel = require('./../models/reviewModel');

exports.createReview = catchAsyncErrors(
  async (req: any, res: any, next: any) => {
    const jsonReview = {
      gameName: req.body.gameName,
      tagline: req.body.tagline,
      blurb: req.body.blurb,
      review: req.body.review,
      allowComments: req.body.allowComments,
      author: req.body.author
    };

    try {
      const newReview = await ReviewModel.create(jsonReview);
      res.status(201).json(newReview);
    } catch (err) {
      next(err);
    }
  }
);

exports.getReview = catchAsyncErrors(async (req: any, res: any, next: any) => {
  // get review from slug
  const review = await ReviewModel.findOne({ slug: req.params.slug });

  if (!review) {
    createResErr(res, 404, 'No review found with that ID');
  } else {
    res.status(200).json({
      status: 'success',
      data: review
    });
  }
});

exports.getAllReviews = catchAsyncErrors(
  async (req: any, res: any, next: any) => {
    try {
      // const allReviews = await ReviewModel.find({}).select({
      //   gameName: 1,
      //   tagline: 1,
      //   slug: 1,
      //   image: 1
      // });
      const allReviews = await ReviewModel.find({});
      res.status(200).json(allReviews);
    } catch ( err ) {
      next( err );
    }
  }
);

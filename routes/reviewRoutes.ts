const express = require('express');
const cors = require('cors');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

// routes:

router.options('/createReview', cors());
router.post(
  '/createReview',
  cors(),
  // authController.protect,
  reviewController.createReview
);

router.options('/', cors());
router.get('/', cors(), reviewController.getAllReviews);

router.options('/:reviewId', cors());
router.get('/:reviewId', cors(), reviewController.getReviewById);

// router.options('/:slug', cors());
// router.get('/:slug', cors(), reviewController.getReviewBySlug);

module.exports = router;

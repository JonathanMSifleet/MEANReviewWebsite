const express = require('express');
const cors = require('cors');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

// routes:

router.options('/', cors());
router.post('/', cors(),
  // authController.protect,
  reviewController.createReview
);

router.options('/', cors());
router.get('/', cors(), reviewController.getAllReviews);

router.options('/:reviewId', cors());
router.get('/:reviewId', cors(), reviewController.getReviewById);

router.options('/:reviewId', cors());
router.put('/:reviewId', cors(), reviewController.updateReview);

router.options('/:reviewId', cors());
router.delete('/:reviewId', cors(), reviewController.deleteReview);

// router.options('/:slug', cors());
// router.get('/:slug', cors(), reviewController.getReviewBySlug);

module.exports = router;

const ReviewController = require('../../controllers/reviewController');
const ReviewModel = require('../../models/reviewModel');
const httpMocks = require('node-mocks-http');
const newReview = require('../mock-data/new-review.json');
const allReviews = require('../mock-data/all-reviews.json');

ReviewModel.create = jest.fn();
ReviewModel.find = jest.fn();
ReviewModel.findOne = jest.fn();
ReviewModel.findById = jest.fn();
ReviewModel.findByIdAndUpdate = jest.fn();
ReviewModel.findByIdAndDelete = jest.fn();
const reviewId = '5f7c6248171bdd46c0f9b7db';

let req;
let res;
let next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res =  httpMocks.createResponse();
  next = jest.fn();
});

describe('ReviewController.createReview', () => {
  beforeEach(() => {
    req.body = newReview;
  });

  it('should have a createReview function', () => {
    expect(typeof ReviewController.createReview).toBe('function');
  });
  it('should call ReviewModel.create', () => {
    ReviewController.createReview(req, res, next);
    expect(ReviewModel.create).toBeCalledWith(newReview);
  });
  it('should return 201 response code', async () => {
    await ReviewController.createReview(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    ReviewModel.create.mockReturnValue(newReview);
    await ReviewController.createReview(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newReview);
  });
  it('should handle errors', async () => {
    const errorMessage = { message: 'Author property misisng' };
    const rejectedPromise = Promise.reject(errorMessage);
    ReviewModel.create.mockReturnValue(rejectedPromise);
    await ReviewController.createReview(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('ReviewController.getAllReviews', () => {
  it('should have a getAllReviews function', () => {
    expect(typeof ReviewController.getAllReviews).toBe('function');
  });
  it('should call ReviewModel.find({})', async () => {
    await ReviewController.getAllReviews(req, res, next);
    expect(ReviewModel.find).toHaveBeenCalledWith({});
  });
  it('should return response with status 200 and all reviews', async () => {
    ReviewModel.find.mockReturnValue(allReviews);
    await ReviewController.getAllReviews(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allReviews);
  });
  it('should handle errors in getAllReviews', async () => {
    const errorMessage = { message: 'Error finding' };
    const rejectedPromise = Promise.reject(errorMessage);
    ReviewModel.find.mockReturnValue(rejectedPromise);
    await ReviewController.getAllReviews(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('ReviewController.getReviewById', () => {
  it('should have a getReviewById', () => {
      expect(typeof ReviewController.getReviewById).toBe('function');
    });
  it('should call ReviewModel.findById with route parameters', async () => {
    req.params.reviewId = reviewId;
    await ReviewController.getReviewById(req, res, next);
    expect(ReviewModel.findById).toBeCalledWith(reviewId);
  });
  it('should return json body and response code 200', async () => {
    ReviewModel.findById.mockReturnValue(newReview);
    await ReviewController.getReviewById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newReview);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should do error handling', async () => {
    const errorMessage = { message: 'error finding ReviewModel' };
    const rejectedPromise = Promise.reject(errorMessage);
    ReviewModel.findById.mockReturnValue(rejectedPromise);
    await ReviewController.getReviewById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('ReviewController.updateReview', () => {
  it('should have an updateReview function', () => {
    expect(typeof ReviewController.updateReview).toBe('function');
  });
  it('should update with Reviewmodel.findByIdAndUpdate', async () => {
    req.params.reviewId = reviewId;
    req.body = newReview;
    await ReviewController.updateReview(req, res, next);
    expect(ReviewModel.findByIdAndUpdate).toHaveBeenCalledWith(reviewId, newReview, {
      new: true,
      useFindAndModify: false
    });
  });
  it('should return a response with json data and http code 200', async () => {
    req.params.reviewId = reviewId;
    req.body = newReview;
    ReviewModel.findByIdAndUpdate.mockReturnValue(newReview);
    await ReviewController.updateReview(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newReview);
  });
  it('should do error handling', async () => {
    const errorMessage = { message: 'error finding reviewModel' };
    const rejectedPromise = Promise.reject(errorMessage);
    ReviewModel.findById.mockReturnValue(rejectedPromise);
    await ReviewController.getReviewById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
  it('should handle 404', async () => {
    ReviewModel.findByIdAndUpdate.mockReturnValue(null);
    await ReviewController.updateReview(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('ReviewConroller.deleteReview', () => {
  it('should have a deleteReview function', () => {
    expect(typeof ReviewController.deleteReview).toBe('function');
  });
  it('should call findByIdAndDelete', async () => {
    req.params.reviewId = reviewId;
    await ReviewController.deleteReview(req, res, next);
    expect(ReviewModel.findByIdAndDelete).toBeCalledWith(reviewId);
  });
  it('should return 200 OK and deleted reviewmodel', async () => {
    ReviewModel.findByIdAndDelete.mockReturnValue(newReview);
    await ReviewController.deleteReview(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newReview);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should handle errors', async () => {
    const errorMessage = { message: 'Error deleting'};
    const rejectedPromise = Promise.reject(errorMessage);
    ReviewModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await ReviewController.deleteReview(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
  it('should handle 404', async () => {
    ReviewModel.findByIdAndDelete.mockReturnValue(null);
    await ReviewController.deleteReview(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

// describe('ReviewController.getReview', () => {
//   it('should have a getReview', () => {
//     expect(typeof ReviewController.getReview).toBe('function');
//   });
//   it('should call ReviewModel.getReview with route parameters', async () => {
//     req.params.slug = 'test-game-1234';
//     await ReviewController.getReview(req, res, next);
//     expect(ReviewModel.getReview).toBeCalledWith('test-game-1234');
//   });
//   it('should return json body and response code 200', async () => {
//     ReviewModel.findOne.mockReturnValue(newReview);
//     await ReviewController.getReview(req, res, next);
//     expect(res.statusCode).toBe(200);
//     expect(res._getJSONData()).toStrictEqual(newReview);
//     expect(res._isEndCalled()).toBeTruthy();
//   });
//   it('should do error handling', async () => {
//     const errorMessage = { message: 'error finding ReviewModel'};
//     const rejetedPromise = Promise.reject(errorMessage);
//     ReviewModel.findOne.mockReturnValue(rejetedPromise);
//     await ReviewController.getReview(req, res, next);
//     expect(next).toHaveBeenCalledWith(errorMessage);
//   });
//   it('should return 404 when item doesnt exist', async () => {
//     ReviewModel.findOne.mockReturnValue(null);
//     await ReviewController.getReview(req, res, next);
//     expect(res.statusCode).toBe(404);
//     expect(res._isEndCalled()).toBeTruthy();
//   });
// });

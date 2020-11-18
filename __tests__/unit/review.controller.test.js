const ReviewController = require('../../controllers/reviewController');
const ReviewModel = require('../../models/reviewModel');
const httpMocks = require('node-mocks-http');
const newReview = require('../mock-data/new-review.json');
const allReviews = require('../mock-data/all-reviews.json');

ReviewModel.create = jest.fn();
ReviewModel.find = jest.fn();

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
const ReviewController = require('../../controllers/reviewController');
const ReviewModel = require('../../models/reviewModel');
const httpMocks = require('node-mocks-http');
const newReview = require('../mock-data/new-review.json');

ReviewModel.create = jest.fn();

let req;
let res;
let next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res =  httpMocks.createResponse();
  next = null;
})

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
  it("should return 201 or 200 response code", () => {
    ReviewController.createReview(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', () => {
    ReviewModel.create.mockReturnValue(newReview);
    ReviewController.createReview(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newReview);
  });
});

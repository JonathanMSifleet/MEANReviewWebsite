const ReviewController = require('../../controllers/reviewController');

describe('ReviewController.createReview', () => {
  it('should have a createReview function', () => {
    expect(typeof ReviewController.createReview).toBe('function');
  });
  
});

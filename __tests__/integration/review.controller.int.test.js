const request = require('supertest');
const app = require('../../app');
const newReview = require('../mock-data/new-review.json');

const endpointUrl = '/review/createReview';

describe(endpointUrl, () => {
  it('POST ' + endpointUrl, async () => {
    const response = await request(app)
     .post(endpointUrl)
     .send(newReview);
    expect(response.statusCode).toBe(201);
    expect(response.body.gameName).toBe(newReview.gameName);
    expect(response.body.tagline).toBe(newReview.tagline);
    expect(response.body.blurb).toBe(newReview.blurb);
    expect(response.body.review).toBe(newReview.review);
    expect(response.body.allowComments).toBe(newReview.allowComments);
    expect(response.body.author).toBe(newReview.author);
  });
  // will fail if it exists in the database
  it('should return error 500 on malformed data with POST ' + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({
          gameName: "Test Game 1234",
          tagline: "Test tagline",
          blurb: "Test Game blurb",
          review: "Review text",
          allowComments: true
        });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message:
          'Review validation failed: author: Path `author` is required.'
      });
    }
  );
});

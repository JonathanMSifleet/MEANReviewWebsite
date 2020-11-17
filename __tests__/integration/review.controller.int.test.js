const request = require('supertest');
const app = require('../../server');
const newReview = require('../mock-data/new-review.json');

const endpointUrl = '/review/';

describe(endpointUrl, () => {
  it('POST ' + endpointUrl, async () => {
    const response = await request(app)
     .post(endpointUrl)
     .send(newReview);
    expect(response.statusCode).toBe(201);
    expect(response.body.gameName).toBe(newReview.gameName);
    expect(response.body.tagline).toBe(newReview.tagline);
    // expect(response.body.blurb).toBe(newReview.blurb);
    // expect(response.body.review).toBe(newReview.review);
    // expect(response.body.allowComments).toBe(newReview.allowComments);
    // expect(response.body.author).toBe(newReview.author);
  });
});

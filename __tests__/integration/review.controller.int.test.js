const request = require('supertest');
const app = require('../../app');
const newReview = require('../mock-data/new-review.json');

let endpointUrl = '/review/';
let firstReview;
let newReviewId;

const nonExistingReviewId = "5d5fff416bef3c07ecf11f77";

// check tests below regarding
// what to do if 1 test fails

describe(endpointUrl, () => {
  test('GET ' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].gameName).toBeDefined();
    expect(response.body[0].tagline).toBeDefined();
    expect(response.body[0].blurb).toBeDefined();
    expect(response.body[0].review).toBeDefined();
    expect(response.body[0].author).toBeDefined();
    expect(response.body[0].allowComments).toBeDefined();
    firstReview = response.body[0];
  });
  test("GET by Id " + endpointUrl + ":reviewId", async () => {
    const response = await request(app).get(endpointUrl + firstReview._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.gameName).toBe(firstReview.gameName);
    expect(response.body.tagline).toBe(firstReview.tagline);
    expect(response.body.blurb).toBe(firstReview.blurb);
    expect(response.body.review).toBe(firstReview.review);
    expect(response.body.allowComments).toBe(firstReview.allowComments);
    expect(response.body.author).toBe(firstReview.author);
  });
  test("GET review by id doesn't exist" + endpointUrl + ":reviewId", async () => {
    const response = await request(app).get(
      endpointUrl + nonExistingReviewId
    );
    expect(response.statusCode).toBe(404);
  });
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
    newReviewId = response.body._id;
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
  test('PUT ' + endpointUrl, async () => {
    const testData = { gameName: 'Bleep', tagline: 'Bleep bloop', blurb: 'Bleep bloop bleep', review: 'Test', author: 'Jonathan', allowComments: true};
    const res = await request(app)
      .put(endpointUrl + '5f7c6248171bdd46c0f9b7db') // .put(endpointUrl + newReviewId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.gameName).toBe(testData.gameName);
    expect(res.body.tagline).toBe(testData.tagline);
    expect(res.body.blurb).toBe(testData.blurb);
    expect(res.body.review).toBe(testData.review);
    expect(res.body.author).toBe(testData.author);
    expect(res.body.allowComments).toBe(testData.allowComments);
  });
  it('should return 404 on PUT ' + endpointUrl, async () => {
    const testData = { gameName: 'Bleep', tagline: 'Bleep bloop'};
    const res = await request(app)
      .put(endpointUrl + nonExistingReviewId)
      .send(testData);
    expect(res.statusCode).toBe(404);
  });
});

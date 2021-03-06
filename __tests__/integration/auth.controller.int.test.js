const { sign } = require('crypto');
const request = require('supertest');
const app = require('../../app');
const newUser = require('../mock-data/new-user.json');

const loginEndpoint = '/auth/login/';
const signupEndpoint = '/auth/signup/';
let endpointUrl = '/auth/';
let newUserId;

const nonExistingUserId = '5d5fff416bef3c07ecf11f77';
const testData = {
  email: 'jonathans@apadmi.com',
  firstName: 'Jonathan',
  password: 'test1234',
  passwordConfirm: 'test1234',
  username: 'JonathanSifleet'
};

describe(signupEndpoint, () => {
  it('POST ' + signupEndpoint, async () => {
    const response = await request(app)
      .post(signupEndpoint)
      .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.firstName).toBe(newUser.firstName);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.passwordConfirm).toBe(newUser.passwordConfirm);
    newUserId = response.body._id;
  });
  // will fail if it exists in the database
  it('should return error 500 on malformed data with POST ' + signupEndpoint,
    async () => {
      const response = await request(app)
        .post(signupEndpoint)
        .send({
          email: 'jonathans@apadmi.com',
          firstName: 'Jonathan',
          password: 'test1234',
          passwordConfirm: 'test1234',
        });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message:
          'User validation failed: username: USERNAME REQUIRED'
      });
    }
  );
});

describe(loginEndpoint, () => {
  it('POST ' + loginEndpoint, async () => {
    const response = await request(app)
      .post(loginEndpoint)
      .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.password).toBe(newUser.password);
    newUserId = response.body._id;
  });
  // will fail if it exists in the database
  it('should return error 500 on malformed data with POST ' + loginEndpoint,
    async () => {
      const response = await request(app)
        .post(loginEndpoint)
        .send({
          email: 'jonathans@apadmi.com',
          password: 'test'
        });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        error:
          'Incorrect email or password'
      });
    }
  );
});

describe(endpointUrl, () => {
  test('HTTP DELETE', async () => {
    const res = await request(app)
      .delete(endpointUrl + newUserId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.gameName).toBe(testData.gameName);
    expect(res.body.tagline).toBe(testData.tagline);
    expect(res.body.blurb).toBe(testData.blurb);
    expect(res.body.user).toBe(testData.user);
    expect(res.body.author).toBe(testData.author);
    expect(res.body.allowComments).toBe(testData.allowComments);
  });
  test('HTTP DELETE 404', async () => {
    const res = await request(app)
      .delete(endpointUrl + nonExistingUserId)
      .send();
    expect(res.statusCode).toBe(404);
  });
  // PATCH
});
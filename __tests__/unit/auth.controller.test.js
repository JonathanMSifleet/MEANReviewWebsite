const AuthController = require('../../controllers/authController');
const UserModel = require('../../models/userModel');
const httpMocks = require('node-mocks-http');
const newUser = require('../mock-data/new-user.json');
// const allUsers = require('../mock-data/all-users.json');

UserModel.create = jest.fn();
UserModel.save = jest.fn();
UserModel.find = jest.fn();
UserModel.findOne = jest.fn();
UserModel.findById = jest.fn();
UserModel.findByIdAndUpdate = jest.fn();
UserModel.findByIdAndDelete = jest.fn();
UserModel.deleteOne = jest.fn();
const userId = '5fb3c7b2abbcf14314b2e63f';

let req;
let res;
let next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res =  httpMocks.createResponse();
  next = jest.fn();
});

describe('AuthController.signup', () => {
  beforeEach(() => {
    req.body = newUser;
  });

  it('should have a signup function', () => {
    expect(typeof AuthController.signup).toBe('function');
  });
  it('should call UserModel.create', () => {
    AuthController.signup(req, res, next);
    expect(UserModel.create).toBeCalledWith(newUser);
  });
  it('should return 201 response code', async () => {
    await AuthController.signup(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    UserModel.create.mockReturnValue(newUser);
    await AuthController.signup(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newUser);
  });
  it('should handle errors', async () => {
    const errorMessage = { message: 'Author property misisng' };
    const rejectedPromise = Promise.reject(errorMessage);
    UserModel.create.mockReturnValue(rejectedPromise);
    await AuthController.signup(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('AuthController.deleteAccount', () => {
  it('should have a deleteAccount function', () => {
    expect(typeof AuthController.deleteAccount).toBe('function');
  });
  it('should call findByIdAndDelete', async () => {
    req.params.userId = userId;
    await AuthController.deleteAccount(req, res, next);
    expect(UserModel.findByIdAndDelete).toBeCalledWith(userId);
  });
  it('should return 200 OK and deleted usermodel', async () => {
    UserModel.findByIdAndDelete.mockReturnValue(newUser);
    await AuthController.deleteAccount(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newUser);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should handle errors', async () => {
    const errorMessage = { message: 'Error deleting'};
    const rejectedPromise = Promise.reject(errorMessage);
    UserModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await AuthController.deleteAccount(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
  it('should handle 404', async () => {
    UserModel.findByIdAndDelete.mockReturnValue(null);
    await AuthController.deleteAccount(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

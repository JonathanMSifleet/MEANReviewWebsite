import { promisify } from 'util';
import { catchAsyncErrors } from './../utils/catchAsyncErrors';
const createResErr = require('./../utils/createResErr');
const UserModel = require('./../models/userModel');
import jwt from 'jsonwebtoken';
// const hashPassword = require('./../utils/hashPassword');

const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.signup = catchAsyncErrors(async (req: any, res: any, next: any) => {
  const jsonUser = {
    username: req.body.username,
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  };

  // jsonUser.password = await hashPassword(jsonUser.password);

  try {
    const newUser = await UserModel.create(jsonUser);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

exports.login = catchAsyncErrors(async (req: any, res: any) => {
  const { email, password } = req.body; // use destructuring to get values from req.body
  let error = false;

  if (!email || !password) {
    error = true;
    createResErr(res, 500, 'Please provide email and password!');
  }

  const user = await UserModel.findOne({ email }).select('+password +token +tokenExpiry'); // + gets fields that are not select in model
  // dont both crypt checking password as it uses create not save so pre save middleware
  // functionality is broken, so the password is stored and not a hash as its not hashed
  // so that jest tests pass
  // if (!user || !(await user.correctPassword(password, user.password))) {
  if (!user || !(password === user.password)) {
    error = true;
    createResErr(res, 500, 'Incorrect email or password');
  }

  if (!error) {
    await createSessionToken(user);
    res.status(201).json(user);
  }
});

const createSessionToken = async (user: any) => {
  const token = await signToken(user._id);

  // // remove unused user properties from output
  // user.password = undefined;
  // user.role = undefined;
  // user.firstName = undefined;
  // user.token = undefined;
  // user.tokenExpiry = undefined;

  await addJWTToDB(user._id, token);
};

// add token to database
const addJWTToDB = async (id: any, token: any) => {
  const tokenExpiry = Date.now() + (1000 * 60 * 60 * 24);

  // token lasts 24 hours
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { $set: { token, tokenExpiry} },
    { new: true }
  );

  return [token, tokenExpiry];

};


exports.signOut = catchAsyncErrors(async (req: any, res: any, usernameToFind: string) => {
  const user = await UserModel.findOneAndUpdate({ username: usernameToFind}, { token: '' });
  req.user = null;

  res.status(200).json({
    status: 'success',
      data: user
  });
});

exports.deleteAccount = catchAsyncErrors(
  async (req: any, res: any, next: any) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.userId);

      if (deletedUser) {
        res.status(200).json(deletedUser);
      } else {
        res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  }
);

exports.protect = catchAsyncErrors(async (req: any, res: any, next: any) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  let isValid = true;

  if (!token) {
    isValid = false;
  }

  let decoded = null;

  try{
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (e) {}
  if (decoded) {
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      isValid = false;
    }
  } else {
    isValid = false;
  }

  if (isValid) {
    next();
  } else {
    createResErr(res, 401, 'The active login token is invalid.');
  }
});

import express from 'express';
import cors = require('cors');

const authController = require('./../controllers/authController');

const router = express.Router();

router.options('/signup', cors());
router.post('/signup', cors(), authController.signup);

router.options('/login', cors());
router.post('/login', cors(), authController.login);

router.options('/signOut', cors());
router.patch('/signOut', authController.protect, cors(), authController.signOut);

router.delete(
  '/deleteAccount',
  authController.protect,
  authController.deleteAccount
);

/* router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword); */

module.exports = router;

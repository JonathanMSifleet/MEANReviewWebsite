import express from 'express';
import cors = require('cors');
const authController = require('./../controllers/authController');

const router = express.Router();

router.options('/', cors());
router.post('/', cors(), authController.signup);

// router.options('/login', cors());
// router.post('/login', cors(), authController.login);

// router.options('/signOut', cors());
// router.patch('/signOut',  cors(), authController.protect, authController.signOut);

router.options('/', cors());
router.delete(
  '/:userId', cors(),
  // authController.protect,
  authController.deleteAccount
);

module.exports = router;

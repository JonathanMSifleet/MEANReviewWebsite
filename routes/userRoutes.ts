import express from 'express';
import cors = require('cors');
const authController = require('./../controllers/authController');

const router = express.Router();

router.options('/', cors());
router.post('/', cors(), authController.signup);

// router.options('/login', cors());
// router.post('/login', cors(), authController.login);

router.options('/', cors());
router.patch('/',  cors(), authController.protect, authController.signOut);

router.options('/:username', cors());
router.delete(
  '/:username', cors(),
  // authController.protect,
  authController.deleteAccount
);

module.exports = router;

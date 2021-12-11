const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const home = require('../controllers/home');


router.route('/remix')
   .post(catchAsync(home.remixTargets))

router.route('/member/:id')
   .get(catchAsync(home.showMember))

router.route('/')
   .get(catchAsync(home.showHome))

module.exports = router;
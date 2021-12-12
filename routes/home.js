const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const home = require('../controllers/home');


router.route('/draw')
   .get(catchAsync(home.showDrawPage))
   .post(catchAsync(home.drawTargets))

router.route('/member/:id')
   .get(catchAsync(home.showMember))

router.route('/')
   .get(catchAsync(home.showHome))

module.exports = router;
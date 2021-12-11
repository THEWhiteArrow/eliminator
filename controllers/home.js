const ExpressError = require('../utils/ExpressError');
const Member = require('../models/member');
const { seedDB } = require('../utils/functions');

module.exports.showHome = async (req, res) => {
   const members = await Member.find({ checked: false });

   res.render('home', { members });
}
module.exports.showMember = async (req, res, next) => {
   const { id } = req.params;

   const member = await Member.findById(id);
   if (member == null || member.checked)
      return next(new ExpressError("The member has already checked their target or doesn't exist!", 403));
   await Member.findByIdAndUpdate(id, { checked: true });


   res.render('member', { member });

}

module.exports.remixTargets = async (req, res, next) => {
   const { password } = req.body;

   if (password != process.env.REMIX_PASSWORD)
      return next(new ExpressError("The password is incorrect!", 403));


   await seedDB();

   res.redirect('/');
}
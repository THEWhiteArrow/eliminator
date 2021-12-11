const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
   checked: {
      type: Boolean,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   surname: {
      type: String,
      required: true,
   },
   target: {
      type: Object,
      required: true,
   }
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
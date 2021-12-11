const participants = require('../seeds/participants');
const Member = require('../models/member');

const mixArr = (arr) => {
   for (let i = 1; i < arr.length * arr.length * arr.length; ++i) {
      let r1 = Math.floor(Math.random() * arr.length);
      let r2 = Math.floor(Math.random() * arr.length);
      let temp = arr[r1];
      arr[r1] = arr[r2];
      arr[r2] = temp;
   }

   return arr;
}


module.exports.seedDB = async () => {
   await Member.deleteMany({});
   let arr = [];
   for (let el of participants)
      arr.push({ ...el, target: {} });



   // console.log(arr);

   arr = mixArr(arr);
   // console.log(arr);

   for (let i = 0, k = 1; i < arr.length; ++i) {
      if (i == arr.length - 1)
         k = -i;
      arr[i].target = {
         name: arr[i + k].name,
         surname: arr[i + k].surname,
         height: arr[i + k].height,
         weight: arr[i + k].weight,
         gender: arr[i + k].gender,
      }
   }

   // console.log(arr);

   arr = mixArr(arr);


   // console.log(arr);

   for (let i = 0; i < arr.length; ++i) {

      const member = new Member({
         checked: false,
         ...arr[i]
      })
      await member.save();
   }
}


if (process.env.NODE_ENV !== "production") {
   require('dotenv').config();
}
const mongoose = require('mongoose');
const { seedDB } = require('../utils/functions');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
// console.log(dbUrl);
mongoose.connect(dbUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


seedDB().then(() => {
   mongoose.connection.close();
})
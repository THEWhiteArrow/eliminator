if (process.env.NODE_ENV !== "production") {
   require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const mongoSanitize = require('express-mongo-sanitize');
const ExpressError = require('./utils/ExpressError');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

const homeRoutes = require('./routes/home');


mongoose.connect(dbUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({ replaceWith: '_' }));



app.use('/', homeRoutes);


app.all('*', (req, res, next) => {
   next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
   const { statusCode = 500 } = err;
   if (!err.message) err.message = 'Oh No, Something Went Wrong!';
   res.status(statusCode).render('error', { err });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Serving on port ${port}`)
})



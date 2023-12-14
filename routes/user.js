const express = require('express');

const userController = require('../controllers/userController');
const { Book } = require('../models/Book');
const { Review } = require('../models/review');
const ReviewModel = require("../models/review");
const BookModel = require("../models/Book");

//const { GetAdmin,  } = require('../controllers/adminController');
const userRouter = express.Router();

userRouter.get('/books', userController.getUserAllBooks );
  
  // Route: GET /books/:id
  // Description: Get a book by ID
  userRouter.get('/bookById/:id', userController.getBookByID);

//Route for book reviews for the users 
// /user/: id / reviews or 
// /user/bookById/:id/reviews
userRouter.post('/bookById/:id/reviews', async (req, res) => {
  const books = await BookModel.Book.findById(req.params.id);
  const review = new ReviewModel.Review(req.body.review);
  books.reviews.push(review);

  await review.save();
  await books.save();
  res.redirect(`/user/bookById/${books._id}`);

  })
module.exports = userRouter;
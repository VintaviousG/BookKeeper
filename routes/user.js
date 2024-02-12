const express = require('express');

const userController = require('../controllers/userController');
const { Book } = require('../models/Book');
const { Review } = require('../models/review');
const ReviewModel = require("../models/review");
const BookModel = require("../models/Book");
const { isLoggedIn } = require('../config/auth');

//const { GetAdmin,  } = require('../controllers/adminController');
const userRouter = express.Router();

userRouter.get('/books', isLoggedIn, userController.getUserAllBooks );
  
  // Route: GET /books/:id
  // Description: Get a book by ID
  userRouter.get('/bookById/:id', isLoggedIn, userController.getBookByID);

//route for deleting reviews
userRouter.delete('/bookById/:id/reviews/:reviewId', userController.deleteReview );

//Route for book reviews for the users 
// /user/: id / reviews or 
// /user/bookById/:id/reviews
//Leave a review for a book

userRouter.post('/bookById/:id/reviews', isLoggedIn, async (req, res) => {
try {
  const books = await BookModel.Book.findById(req.params.id);
  const review = new ReviewModel.Review(req.body.review);

  const userID = req.user._id;
  if (!books) {
    return res.status(404).json({error: 'Book not found'})
  }

  const newReview = {
    body: req.body.body, 
    rating: req.body.rating, 
    user: userID,
  }

  // Create a new review and get its ObjectId
  const createdReview = await ReviewModel.Review(newReview);

  //save the review ti the database
  await createdReview.save();

  books.reviews.push(createdReview);

  //await review.save();

  //Save the updated book
  await books.save();
  console.log("Review Saved")
  res.redirect(`/user/bookById/${books._id}`);

} catch (error) {
  console.log(error);
  res.status(500).json({error: 'Internal Server Error'})
}

  })
module.exports = userRouter;
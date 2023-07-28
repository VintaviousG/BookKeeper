const express = require('express');

const userController = require('../controllers/userController');
//const { GetAdmin,  } = require('../controllers/adminController');
const userRouter = express.Router();

userRouter.get('/books', userController.getUserAllBooks );
  
  // Route: GET /books/:id
  // Description: Get a book by ID
  userRouter.get('/bookById/:id',  userController.getBookByID);

module.exports = userRouter;
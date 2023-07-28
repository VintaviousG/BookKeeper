// For now User will be used for view all books, and books by id
// I want the user to have a view page for the user and they see a list of books available and view those by id
// Their profile should also show up on their own book's detail pages so that other users

const express = require('express');
//const router = express.Router();
const BookModel = require('../models/Book');

// Route: GET /books
// Description: Get all books

const getUserAllBooks =  async (req, res) => {
    try {
      const books = await BookModel.Book.find({});
      res.render('user/books', { books: books });
    } catch (error) {
      console.log(error);
      res.send('Something went wrong on the Book Routes'); // Handle error appropriately
    }
};

const getBookByID = async (req, res) => {
    try {
        const book = await BookModel.Book.findById(req.params.id);
        if (!book) {
          return res.status(404).send('Book not found');
        }
        res.render('user/bookById', { book });
      } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
      }
}
  

//Proper way exports
exports.getUserAllBooks = getUserAllBooks;
exports.getBookByID = getBookByID;

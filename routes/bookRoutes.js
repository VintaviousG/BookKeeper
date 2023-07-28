const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get route to view all books
router.get('/index', bookController.bookIndex);
//Get route to go to create book form page
router.get('/create', bookController.bookCreateForm);

//Post route for post action for the create form page
router.post('/create', bookController.bookCreate);

//Get route for viewing book details by ID
router.get('/:id', bookController.bookDetails);

// Edit/Update admin: GET Route to display the book edit form by ID
router.get('/:id/edit', bookController.bookEditForm);
// Edit/Update: POST Route to update the admin by ID
router.post('/:id', bookController.bookUpdate);


router.delete('/:id', bookController.bookDelete);

// Delete admin: GET Route to display the admin delete form by ID
router.get('/:id/delete', bookController.deleteBookFormPage)
//Delete admin
// DELETE route to delete the admin by ID
router.post('/:id/delete', bookController.bookDelete);

module.exports = router;
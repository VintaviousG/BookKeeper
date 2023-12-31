//This file will only have routes for admin use
/**
 For admin, CRUD features for certain things, view and manage books, 
 see which users have the book rented, 
 and send notifications via phone number or email using an API.
 */

const express = require('express');

const adminController = require('../controllers/adminController');
const adminRouter = express.Router();


// GET or view all admin
adminRouter.get('/all', adminController.adminList);
//GET admin by a certain ID
adminRouter.get("/byId/:id", adminController.getAdminByID);

//Get route to render the admin creation form
adminRouter.get('/create', (req, res) => {
   
   res.render('admin/admin-create') //Render the admin create form

})
// Should create a new admin form 
adminRouter.post('/create', adminController.createAdmin);

//Admin can see a list of Users
//GET route to view list of users
adminRouter.get('/users', adminController.getUserList);

// Edit/Update admin: GET Route to display the admin edit form by ID
adminRouter.get('/:id/edit', adminController.editAdminByIDForm )
// Edit/Update: POST Route to update the admin by ID
adminRouter.post('/:id', adminController.postEditAdminID);

// Delete admin: GET Route to display the admin delete form by ID
adminRouter.get('/:id/delete', adminController.deleteAdminFormPage)
//Delete admin
// DELETE route to delete the admin by ID
adminRouter.post('/:id/delete', adminController.deleteAdmin);


module.exports = adminRouter;



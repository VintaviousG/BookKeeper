//Logic For the Admin Routes would go hear

//imprt functions related to querying the database
//Optionally I could create a service folder this 

//Below are functions to control the function for the all admin routes, 
//Once complete export to routes/admin file
//const { QueryListOfAdmin } = (req, res)
//import { QueryListOfAdmin, QueryAdminById } from "../models/Users_Admin"
const AdminModel = require('../models/Users_Admin')
const UserModel  = require('../models/User')

//Create a new admin
const createAdmin = async (req, res) => {
    try {
     
      const { firstName, lastName, username, password, email } = req.body;
      const admin = new AdminModel.Admin({
        firstName,
        lastName,
        username,
        password,
        email
      });;
        await admin.save();
     // res.status(201).json(admin);
      console.log(admin);
      //res.render("admin/admin-create")
      res.redirect('/admin/all')
      console.log("Should be on the admin-create ejs file, to create a new admin")
      } catch (err) {
        console.error(err);
        res.status(400).send(err);
      }
}




//View all admin from database and render as table to ejs file
const adminList = async (req, res) => {
  try {

  const admins = await AdminModel.Admin.find({});
  console.log(admins)
    // Render the admin list template with the list of admins
    res.render('admin/admin_list', { admins: admins });
    console.log("Should be on the admin List page")
 } catch (error) {
   console.error(error);
  console.log("SOMETHING IS WRONG")
 }
};

//Read/View an Admin by ID
const getAdminByID = async (req, res) => {
    try {
      const admin = await AdminModel.Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
        //res.json(admin);
      console.log(admin)
        res.render('admin/dashboard', {admin: admin})
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };
//Update an Admin
const updateAdmin = async (req, res) => {
    try {
      const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      res.json(admin);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
};
  
// GET Route to display the admin edit form by ID
const editAdminByIDForm = async (req, res) => {
  try {
    const admin = await AdminModel.Admin.findById(req.params.id);
    res.render('admin/admin_edit', { admin });
  } catch (error) {
    console.log(error);
    console.log("Error with the editing admin form page")
    res.redirect('/admins');
  }
}

//POST Route to update the admin by ID
const postEditAdminID = async (req, res) => {
  try {
    const { firstName, lastName, username, email } = req.body;
    await AdminModel.Admin.findByIdAndUpdate(req.params.id, { firstName, lastName, username, email });
    res.redirect('/admin/all');
  } catch (error) {
    console.log(error);
    console.log("Error that went wrong")
    res.send("Error that went wrong with posting to edeit form");
  }
}


// Delete Form Page
const deleteAdminFormPage = async (req, res) => {
  try {
    const admin = await AdminModel.Admin.findById(req.params.id);
    res.render('admin/delete-admin', { admin });
  } catch (error) {
    console.log(error);
    res.redirect('/admin/all');
  }
}

//Delete an Admin
const deleteAdmin = async (req, res) => {
    try {
      const admin = await AdminModel.Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      //res.json(admin);
      res.redirect('/admin/all')
      console.log(admin);
      console.log("Deleted Admin")
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };




const GetAllAdmins = (req, res) => {
    const adminList = QueryListOfAdmin();

    return res.json(adminList);
}

const GetAdmin = (req, res) => {
    const userId = req.params.id;
    const user = QueryAdminById(userId)

    return res.json(user);
}

//Allow Admin to have a list of user signed up 
const getUserList = async (req, res) => {
  try {
    const users = await UserModel.User.find();
    // Render a view with the list of users
    res.render('admin/view-users', { users });
} catch (error) {
    // Handle errors, e.g., database connection issues
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
}
}

//Proper way to export functions
exports.createAdmin = createAdmin;
exports.adminList = adminList;
exports.getAdminByID = getAdminByID;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
exports.deleteAdminFormPage = deleteAdminFormPage;
exports.editAdminByIDForm = editAdminByIDForm;
exports.postEditAdminID = postEditAdminID;
exports.getUserList = getUserList;

// module.exports =
// {
//   GetAdmin, GetAllAdmins, admin_list,

//   }
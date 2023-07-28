// User schema
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/BookshelfApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
  // Other user-related fields
});

const User = mongoose.model('User', userSchema);

//Insert multiple users into User Collection
const multipleUsers = () => {
  const user = User.insertMany([
    { firstName: 'John', lastName: 'Doe', username: 'JohnDoe123', password: 'JDoe123', email: 'JohnDoe@gmail.com' },
    { firstName: 'Rio', lastName: 'Axel', username: 'R_Axel', password: 'Rio_12', email: 'R_Axel_10'}
  ]).then(() => {
    //Success Response
    console.log("Data Has been inserted into User Collection");
  }).catch((error) => {
    //Failure caught with catch 
    console.log(error)
  })


}

// Admin schema
const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: String,
    default: 'admin'
  }
  // Other admin-related fields
});

const Admin = mongoose.model('Admin', adminSchema);

const makeAdmin = async () => {
  const adminOne = new Admin({
    firstName: 'Vinnie',
    lastName: 'Gilbert',
    username: 'VinnieG',
    password: 'Example123',
    email: 'VinnieG@gmail.com',
    role: 'admin'

  })

  const res = adminOne.save();
  console.log(res)
}


const insertAdmins = async () => {
  const admins = [
    {
      firstName: "Barack",
      lastName: "Obama",
      username: "barack123",
      password: "password123",
      email: "barack@gmail.com",
      role: "admin"
    },
    {
      firstName: "Elon",
      lastName: "Musk",
      username: "elon123",
      password: "password123",
      email: "elon@gmail.com",
      role: "admin"
    },
    { firstName: 'Angelina', lastName: 'Jolie', username: 'angelinajolie', password: 'password2', email: 'angelinajolie@gmail.com', role: 'admin' },
  ]
  try {
    const result = await Admin.insertMany(admins);
    console.log(`${result.length} admins inserted successfully`);
    
  } catch (error) {
    console.error(`Error inserting admins: ${error.message}`);
  }

}

//insertAdmins();




//Insert multiple Users 
//multipleUsers();

//Make a single admin
//makeAdmin();

//Proper way to export functions
exports.User = User;
exports.Admin = Admin;


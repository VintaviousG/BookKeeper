//npm packages I will need express, mongoose, dotenv, ejs, ejs-mate
const express = require('express')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');

const adminRoutes = require('./routes/admin')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authRoutes');


const app = express();
//Use Morgan Middleware
app.use(morgan('dev'));
//Using EJS for templating
app.engine('ejs', ejsMate)

app.set("view engine", "ejs");
//Connect to MongoDB Database
mongoose.connect('mongodb://127.0.0.1:27017/BookshelfApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// parse json objects
app.use(express.json()) 

// parse url encoded objects- data sent through the url
app.use(express.urlencoded({ extended: true})) 


//Setup or basic route
app.get('/', function (req, res) {
  res.send('Hello World: Bookshelf or Library Application')
})

// use admin routes as middleware
app.use('/admin', adminRoutes)

//Book routes
app.use("/books", bookRoutes)

// Use user routes
app.use('/user', userRoutes);

// Use auth routes
app.use('/auth', authRoutes);

//Listening on Port 3000
app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});
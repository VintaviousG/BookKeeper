// User schema
//New Use Schema because using passport
const Schema = mongoose.Schema;
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/BookshelfApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    required: true,
    unique: true,
        
    }
    
});

userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model('User', userSchema);
// exports.User = User;
module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookReviewSchema = new Schema({
    body: String,
    rating: Number,
  
})

module.exports = mongoose.model("Review", bookReviewSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookReviewSchema = new Schema({
    body: String,
    rating: Number,
  
})

const Review = mongoose.model("Review", bookReviewSchema);
exports.Review = Review; 
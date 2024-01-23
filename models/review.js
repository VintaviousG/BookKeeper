const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookReviewSchema = new Schema({
    body: String,
    rating: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  
})

const Review = mongoose.model("Review", bookReviewSchema);
exports.Review = Review; 
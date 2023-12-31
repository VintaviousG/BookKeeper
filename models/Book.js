const mongoose = require("mongoose");
const { Review } = require("../models/review");
const Schema = mongoose.Schema;

mongoose
    .connect("mongodb://127.0.0.1:27017/BookshelfApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const Book = mongoose.model("Book", bookSchema);

const insertManyBooks = async () => {
    const Books = [
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classics",
            description:
                "A novel set in the roaring 20s, chronicling the decadence and excess of the era.",
            price: 10.99,
            stock: 20,
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Classics",
            description:
                "A story set in the deep south, dealing with racial inequality and injustice.",
            price: 12.99,
            stock: 15,
        },
        {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            genre: "Classics",
            description:
                "A story about teenage angst and alienation in the 1950s.",
            price: 9.99,
            stock: 25,
        },
        {
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian",
            description:
                "A novel about a future totalitarian society where individualism is suppressed.",
            price: 8.99,
            stock: 18,
        },
        {
            title: "Brave New World",
            author: "Aldous Huxley",
            genre: "Dystopian",
            description:
                "A novel about a future society that has achieved a stable, peaceful existence through the suppression of individuality and emotion.",
            price: 11.99,
            stock: 10,
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Romance",
            description:
                "A novel about the romantic entanglements of the Bennet family, particularly the relationship between Elizabeth Bennet and Mr. Darcy.",
            price: 7.99,
            stock: 30,
        },
        {
            title: "The Shining",
            author: "Stephen King",
            genre: "Horror",
            description:
                "Jack Torrance, a struggling writer and recovering alcoholic, accepts a job as the caretaker of the Overlook Hotel in Colorado. As the winter months wear on, Jack begins to experience increasingly disturbing visions and delusions, and his behavior becomes increasingly erratic and violent.",
            price: 12.99,
            stock: 10,
        },
        {
            title: "It",
            author: "Stephen King",
            genre: "Horror",
            description:
                "In the small town of Derry, Maine, a group of childhood friends are forced to confront an ancient, shape-shifting evil that preys on the town's children. As they band together to stop the monster, they must also confront their own fears and traumas from the past.",
            price: 14.99,
            stock: 5,
        },
        {
            title: "Dracula",
            author: "Bram Stoker",
            genre: "Horror",
            description:
                "When young lawyer Jonathan Harker travels to Transylvania to help a rich nobleman purchase an estate in England, he has no idea what he's getting into. He soon finds himself trapped in the castle of the enigmatic Count Dracula, who is far more dangerous than he ever imagined.",
            price: 9.99,
            stock: 15,
        },
        {
            title: "The Exorcist",
            author: "William Peter Blatty",
            genre: "Horror",
            description:
                "When 12-year-old Regan MacNeil begins exhibiting bizarre and frightening behavior, her mother turns to two priests for help. They soon realize that Regan is possessed by a demon, and they must perform an exorcism to save her soul.",
            price: 11.99,
            stock: 8,
        },
        {
            title: "The Haunting of Hill House",
            author: "Shirley Jackson",
            genre: "Horror",
            description:
                "A group of strangers gather at Hill House, a mansion with a dark and disturbing past, in the hopes of investigating its supernatural phenomena. But as they spend more time in the house, they begin to experience increasingly terrifying and inexplicable events.",
            price: 10.99,
            stock: 12,
        },
    ];
    try {
        const result = await Book.insertMany(Books);
        console.log(`${result.length} Books added successfully`);
    } catch (error) {
        console.error(`Error inserting Books: ${error.message}`);
    }
};


exports.Book = Book;

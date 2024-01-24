const BookModel = require("../models/Book");
const axios = require("axios");

// Function to fetch book cover URL based on the book title
//Example for practing git
async function fetchBookCoverUrl(url) {
    //This may not work or probbly wont use
    const bookUrl = "https://openlibrary.org/works/OL45883W";
    const apiUrl = `${bookUrl}.json`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const covers = data.cover;
            if (covers) {
                console.log(covers[0]);
            } else {
                console.log("No cover available.");
            }
        })
        .catch((error) => console.log(error));
}

// Display all books
const bookIndex = async (req, res) => {
    try {
        const books = await BookModel.Book.find({});
        console.log(books.title);

        console.log(`Width of book cover is: $`);

        res.render("books/index", {
            books: books,
        });
    } catch (error) {
        console.log(error);
        res.send("Something went wrong on the Book Routes"); // Handle error appropriately
    }
};

// Display book create form
const bookCreateForm = (req, res) => {
    res.render("books/create");
};

// Create a new book
const bookCreate = async (req, res) => {
    try {
        const { title, author, genre, description, price, stock, isbn } =
            req.body;
        const book = new BookModel.Book({
            title,
            author,
            genre,
            description,
            price,
            stock,
            isbn,
        });
        await book.save();

        console.log(book);

        res.redirect("/books/index");
    } catch (error) {
        console.log(error);
        res.redirect("/books/create"); // Handle error appropriately
        console.error(error);
    }
};

// Display book details
const bookDetails = async (req, res) => {
    try {
        const book = await BookModel.Book.findById(req.params.id);
        //Get current user id, to use for reviews
        const currentUser = req.user;
        res.render("books/details", { book});
    } catch (error) {
        console.log(error);
        res.redirect("/books"); // Handle error appropriately
    }
};

// Display book edit form
const bookEditForm = async (req, res) => {
    try {
        const book = await BookModel.Book.findById(req.params.id);
        res.render("books/edit", { book });
    } catch (error) {
        console.log(error);
        res.redirect("/books"); // Handle error appropriately
    }
};

//POST Route to update the book by ID
const bookUpdate = async (req, res) => {
    try {
        const { title, author, genre, description, price, stock, isbn } =
            req.body;

        await BookModel.Book.findByIdAndUpdate(req.params.id, {
            title,
            author,
            genre,
            description,
            price,
            stock,
            isbn,
        });
        res.redirect("/books/index");
    } catch (error) {
        console.log(error);
        console.log("Error that went wrong");
        res.send("Error that went wrong with posting to edit form");
    }
};

// Delete Form Page
const deleteBookFormPage = async (req, res) => {
    try {
        const book = await BookModel.Book.findById(req.params.id);
        res.render("books/delete", { book });
    } catch (error) {
        console.log(error);
        res.redirect("/books/index");
    }
};

// Delete a book
const bookDelete = async (req, res) => {
    try {
        const book = await BookModel.Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).send("Book not found");
        }
        //res.json(admin);
        res.redirect("/books/index");
        console.log();
        console.log(`Book Deleted was: ${book}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/books/${req.params.id}`); // Handle error appropriately
    }
};

//Proper way to export functions
exports.bookIndex = bookIndex;
exports.bookCreateForm = bookCreateForm;
exports.bookCreate = bookCreate;
exports.bookDetails = bookDetails;
exports.bookEditForm = bookEditForm;
exports.bookUpdate = bookUpdate;
exports.bookDelete = bookDelete;
exports.deleteBookFormPage = deleteBookFormPage;

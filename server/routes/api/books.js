const express = require("express");
const router = express.Router();
const middleware = require("../../middleware");

// Load Book model
const {Book} = require("../../models/book");

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get("/test", (req, res) => res.send("book route testing!"));

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
});

router.get("/books/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobookfound: "No Book found" }));
});

// @route   GET api/books/:id
// @desc    Get single book by id
// @access  Public
router.get("/:id",(req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobookfound: "No Book found" }));
});

// @route   POST api/books
// @desc    Add/save book
// @access  Public
router.post("/",middleware, (req, res) => {
  const bookData = new Book({
    title: req.body.title,
    image: req.body.image,
    isbn: req.body.isbn,
    author: req.body.author,
    description: req.body.description,
    published_date: req.body.published_date,
    publisher: req.body.publisher,
    submitted_by: req.user.id,
  })
  bookData.save()
    .then((book) => res.json({ message: "Book added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this book" }));
});

// @route   PUT api/books/:id
// @desc    Update book by id
// @access  Public
router.put("/:id",middleware, async (req, res) => {
  try {
    const exist = await Book.findById(req.params.id);
    if (exist.submitted_by._id.toString() === req.user.id) {
      await Book.findByIdAndUpdate(req.params.id, req.body);
      res.json({ message: "Updated successfully" });
    } else {
      res.status(200).json({ message: "You are not allowed to update this book" });
    }
  } catch (err) {
    res.status(400).json({ error: "Unable to update the Database" });
  }
});

// @route   DELETE api/books/:id
// @desc    Delete book by id
// @access  Public
router.delete("/:id", middleware, async (req, res) => {
  try {
    const exist = await Book.findById(req.params.id);
    if (exist.submitted_by._id.toString() === req.user.id) {
      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: "Book entry deleted successfully" });
    } else {
      res.status(200).json({ message: "You are not allowed to delete this book" });
    }
  } catch (err) {
    res.status(404).json({ nobookfound: "No Book found" });
  }
});

module.exports = router;

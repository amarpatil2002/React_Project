const Book = require('./model'); // Adjust path as needed

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            isbn,
            publishedDate,
            publisher,
            pages,
            genre,
            description,
            price,
            stock
        } = req.body;

        // Validation
        if (!title || !author || !isbn || !publishedDate || !publisher ||
            !pages || !genre || !description || !price || stock === undefined) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate data types
        if (isNaN(pages) || parseInt(pages) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Pages must be a positive number"
            });
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        if (isNaN(stock) || parseInt(stock) < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a non-negative number"
            });
        }

        // Validate ISBN format (basic check)
        const cleanIsbn = isbn.replace(/[-\s]/g, '');
        if (cleanIsbn.length < 10 || cleanIsbn.length > 17) {
            return res.status(400).json({
                success: false,
                message: "Invalid ISBN format"
            });
        }

        // Check if ISBN already exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(409).json({
                success: false,
                message: "A book with this ISBN already exists"
            });
        }

        // Create new book
        const newBook = new Book({
            title,
            author,
            isbn,
            publishedDate,
            publisher,
            pages: parseInt(pages),
            genre,
            description,
            price: parseFloat(price).toFixed(2),
            stock: parseInt(stock)
        });

        await newBook.save();

        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        });

    } catch (error) {
        console.error("Error creating book:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Update an existing book
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            author,
            isbn,
            publishedDate,
            publisher,
            pages,
            genre,
            description,
            price,
            stock
        } = req.body;

        // Check if book exists
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        // Validation for provided fields
        if (pages !== undefined && (isNaN(pages) || parseInt(pages) <= 0)) {
            return res.status(400).json({
                success: false,
                message: "Pages must be a positive number"
            });
        }

        if (price !== undefined && (isNaN(price) || parseFloat(price) <= 0)) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        if (stock !== undefined && (isNaN(stock) || parseInt(stock) < 0)) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a non-negative number"
            });
        }

        // If ISBN is being updated, check if it's already taken by another book
        if (isbn && isbn !== book.isbn) {
            const existingBook = await Book.findOne({ isbn, _id: { $ne: id } });
            if (existingBook) {
                return res.status(409).json({
                    success: false,
                    message: "A book with this ISBN already exists"
                });
            }
        }

        // Update fields
        if (title) book.title = title;
        if (author) book.author = author;
        if (isbn) book.isbn = isbn;
        if (publishedDate) book.publishedDate = publishedDate;
        if (publisher) book.publisher = publisher;
        if (pages) book.pages = parseInt(pages);
        if (genre) book.genre = genre;
        if (description) book.description = description;
        if (price) book.price = parseFloat(price).toFixed(2);
        if (stock !== undefined) book.stock = parseInt(stock);

        await book.save();

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });

    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if book exists and delete
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book
        });

    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get a single book by ID
exports.getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });

    } catch (error) {
        console.error("Error retrieving book:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.getAllBook = async (req, res) => {
    try {
        const { limit = 10, page = 1, search = '' } = req.query;

        // Build query based on search term
        let query = {};

        if (search && search.trim() !== '') {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } },
                    { isbn: { $regex: search, $options: 'i' } },
                    { genre: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const skip = (page - 1) * limit;

        const books = await Book.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalBooks = await Book.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / limit);

        res.json({
            success: true,
            data: books,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalBooks,
                totalPages
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

module.exports = exports;
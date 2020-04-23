const { v4: uuidv4 } = require('uuid');
const Book = require("../datalayer/Book");


module.exports = {

    createBook: async function (params) {

        let { title } = params;

        if (!title) {

            return "Missing title";
        }

        const _id = uuidv4();
        const comments = [];

        const book = {
            _id,
            title,
            comments
        }

        const doc = await Book.createBook(book);
        return doc;
    },


    addCommentToBook: async function (params) {

        const { _id, comment } = params;

        if (!_id || !comment) {

            return "Missing params";
        }

        const book = await Book.getBookById(_id);

        if (!book) {

            return "no book exists";
        }

        // consider insert (upsert) ?
        book.comments.push(comment);

        const find = { _id: book._id };
        const update = { comments: book.comments };

        const response = await Book.updateBook({ find, update });

        return book;
    },


    getAllBooks: async function () {

        const params = {};
        const books = await Book.getBooks(params);

        const booksWithCommentCount = books.map(item => ({
            _id: item._id,
            title: item.title,
            commentcount: item.comments.length
        }))

        return booksWithCommentCount;
    },

    getBookById: async function (_id) {

        if (!_id) {

            return "no book exists";
        }

        const book = await Book.getBookById(_id);

        if (!book) {

            return "no book exists";
        }

        return book;
    },

    deleteBookById: async function (_id) {

        if (!_id) {

            return "missing params";
        }

        const response = await Book.deleteBookById(_id);

        if (response.lastErrorObject.n == 0) {

            return 'delete failed';
        }
        
        return 'delete successful';
    },


    deleteAllBooks: async function () {

        const response = await Book.deleteAllBooks();

        return 'complete delete successful';
    }
}
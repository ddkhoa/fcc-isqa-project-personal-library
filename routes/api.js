/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const bookController = require("../controller/bookController");

module.exports = function (app) {

    app.route('/api/books')
        .get(async function (req, res) {
            //response will be array of book objects
            //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

            const books = await bookController.getAllBooks();
            res.json(books);
        })

        .post(async function (req, res) {
            var title = req.body.title;
            //response will contain new book object including atleast _id and title

            const params = { title };
            const book = await bookController.createBook(params);
            res.json(book);
        })

        .delete(async function (req, res) {
            //if successful response will be 'complete delete successful'

            const response = await bookController.deleteAllBooks();
            res.json(response);
        });



    app.route('/api/books/:id')
        .get(async function (req, res) {
            var bookid = req.params.id;
            //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

            const book = await bookController.getBookById(bookid);
            res.json(book);
        })

        .post(async function (req, res) {
            var bookid = req.params.id;
            var comment = req.body.comment;
            //json res format same as .get

            const params = { _id : bookid, comment };
            const book = await bookController.addCommentToBook(params);
            res.json(book);
        })

        .delete(async function (req, res) {
            var bookid = req.params.id;
            //if successful response will be 'delete successful'

            const response = await bookController.deleteBookById(bookid);
            res.json(response);
        });

};

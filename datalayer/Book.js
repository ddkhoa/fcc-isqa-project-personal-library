const connection = require("./connection");


module.exports = {

    createBook: async function (params) {
        const client = connection.getClient();
        const bookCollection = client.db("book").collection("books");
        const response = await bookCollection.insertOne(params);
        const doc = response.ops[0];
        return doc;
    },

    updateBook: async function (params) {
        const { find, update } = params;
        const client = connection.getClient();
        const bookCollection = client.db("book").collection("books");
        const response = await bookCollection.findOneAndUpdate(find, { $set: update });
        return response;
    },

    getBooks: async function (params) {
        const client = connection.getClient();
        const bookCollection = client.db("book").collection("books");
        const docs = await bookCollection.find(params).toArray();
        return docs;
    },

    getBookById: async function (_id) {
        const client = connection.getClient();
        const bookCollection = client.db("book").collection("books");
        const doc = await bookCollection.findOne({ _id: _id })
        return doc;
    },

    deleteBookById: async function (_id) {

        const client = connection.getClient();
        const bookCollection = client.db("book").collection("books");
        const response = await bookCollection.findOneAndDelete({ _id: _id });
        return response;
    },

    deleteAllBooks: async function () {

        const client = connection.getClient();
        const bookCollection = client.db("book").collection("books");
        const response = await bookCollection.deleteMany({});
        return response;
    }
}
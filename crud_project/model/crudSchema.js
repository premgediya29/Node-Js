const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    publishedCopies: {
        type: String,
        required: true
    }
});

const CrudTbl = mongoose.model("Crud", crudSchema);

module.exports = CrudTbl;

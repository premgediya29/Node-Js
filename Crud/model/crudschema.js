const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Crud = mongoose.model("Crud", crudSchema);

module.exports = crudSchema;

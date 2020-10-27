const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    }
});


module.exports = mongoose.model('Category', categorySchema);
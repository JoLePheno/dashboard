var mongoose = require('mongoose');

var UserwidgetSchema = new mongoose.Schema({
    userEmail: String,
    service: String,
    widget: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    config: Object
});

module.exports = mongoose.model('UserWidget', UserwidgetSchema);

/*
var BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    description: String,
    published_year: String,
    publisher: String,
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);
*/
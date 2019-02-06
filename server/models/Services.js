var mongoose = require('mongoose');

var servicesSchema = new mongoose.Schema({
    service: String,
    name: Array,
    icon: String
});

module.exports = mongoose.model('services', servicesSchema);

const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Backend - Node.js', 'Design', 'Flutter', 'Frontend']
    },
    imageUrl: {
        type: String,
        required: true
    }
});
const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
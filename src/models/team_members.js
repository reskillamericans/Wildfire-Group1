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
    },
    imageUrl: {
        type: String,
        required: true
    }
});

memberSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
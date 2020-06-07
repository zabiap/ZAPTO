const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);
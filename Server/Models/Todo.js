const mysql = require('mysql2');

const TodoSchema = new mongoose.Schema({
    task:String
})

const TodoModel = mysql.model("todo",TodoSchema)
module.exports = TodoModel
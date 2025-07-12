const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
app.use(cors())
app.use(express.json())

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'demodb' // Replace with your MySQL database name
})

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message)
        process.exit(1) // Exit the process if connection fails
    }
    console.log('Connected to MySQL database')
})

// Get all tasks
app.get('/get', (req, res) => {
    const query = 'SELECT * FROM todos';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        } else {
            console.log('Fetched tasks:', results); // Debugging line
            res.json(results);
        }
    });
});

// Add a new task
app.post('/add', (req, res) => {
    const task = req.body.task
    const query = 'INSERT INTO todos (task) VALUES (?)'
    db.query(query, [task], (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json(err)
        } else {
            res.json({ id: result.insertId, task })
        }
    })
})

// Delete a task
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const query = 'DELETE FROM todos WHERE id = ?'
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json(err)
        } else {
            res.json({ message: 'Task deleted successfully' })
        }
    })
})

app.listen(3001, () => {
    console.log('Server is Running')
})
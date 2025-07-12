import { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import './Home.css'

const Home = () => {
    const [todo, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => setTodos(todo.filter(item => item.id !== id)))
            .catch(err => console.log(err))
    }

    const handleEdit = (id) => {
        setTodos(todo.map(item => 
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    }

    return (
        <div className="home-container">
            <h2>Todo List</h2>
            <Create />
            {
                todo.length === 0 ?
                    <div>
                        <h2>No Record</h2>
                    </div>
                    :
                    todo.map(item => (
                        <div key={item.id} className={`task-item ${item.completed ? 'completed' : ''}`}>
                            <button
                                className={`circle-button ${item.completed ? 'checked' : ''}`}
                                onClick={() => handleEdit(item.id)} // Pass the id to handleEdit
                            >
                                {item.completed && '✔'}
                            </button>
                            <span className="task-text">{item.task}</span>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(item.id)}
                            >
                                🗑️
                            </button>
                        </div>
                    ))
            }
        </div>
    )
}

export default Home
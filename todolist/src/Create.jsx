import React, { useState } from 'react'
import './Create.css'
import axios from 'axios'
function Create () {
      const [task,setTask]=useState()
 const handleAdd =() => {
  axios.post('http://localhost:3001/add',{task:task})
  .then(resu)
   
 }


  return (
    <div className="create-container">
        <div className="create-form">
            <input 
              type="text" 
              className="task-input"
              placeholder="Enter a new task..."
              onChange={(e) => setTask(e.target.value)}
             
            />
            <button type="button" className="add-button" onClick={handleAdd}>Add</button>
        </div>
    </div>
  )
}

export default Create
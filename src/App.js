import { useEffect, useState } from 'react';
import './App.css';
import { MdOutlineDelete } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
function App() {
  const [isCompleteScreen,setIsCompleted] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");

  const handleAddTodo = () =>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo){
      setTodos(savedTodo);
    }
  })
  return (
    <div className="App">
      {/* Heading */}
      <header>
        <h1>My ToDos</h1>
      </header>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          {/* For taking the title Input */}
          <div className='todo-input-item'>
            <label for="Title">Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Enter a Task ...' name='Title'/>
          </div>
          <div className='todo-input-item'>
            {/* For taking the Description Input */}
            <label for="Des">Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='Enter Description ...' name='Des'/>
          </div>
            {/* For the button to add the task to the list */}
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        {/* Button For ToDo and Completed */}
        <div className='btn-area'>
          <button  className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleted(false)}>ToDo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleted(true)}>Completed</button>
        </div>

        {/* To Do list items */}
        <div className='todo-list'>
          
            {allTodos.map((item,index) => {
              return(
                <div className='todo-list-item' key={index}>
                  <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  </div>
                  <div>
                  <MdOutlineDelete 
                    className='icon' 
                    // onClick={() => handleDeleteTodo (index) }
                    title="Delete?"
                  />
                  <IoMdCheckmark
                    className='check-icon icon' 
                    // onClick={() => handleComplete (index)}
                    title="Complete?"
                  />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default App;

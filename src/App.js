import { useEffect, useState } from 'react';
import './App.css';
import { MdOutlineDelete } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
function App() {
  const [isCompleteScreen,setIsCompleted] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);

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

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(filteredItem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleteArr));
  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedCompletedTodo));
    setCompletedTodos(reducedCompletedTodo);
  }

  // To Load the Existing data about the todo list from memory
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
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
          <button  className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
            onClick={()=>setIsCompleted(false)}>ToDo
          </button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} 
            onClick={()=>setIsCompleted(true)}>Completed
          </button>
        </div>

        {/* To Do list items */}
        <div className='todo-list'>
          {/* For the Todo Tab */}
            {isCompleteScreen===false && allTodos.map((item,index) => {
              return(
                <div className='todo-list-item' key={index}>
                  <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  </div>
                  <div>
                  <MdOutlineDelete 
                    className='icon' 
                    onClick={() => handleDeleteTodo (index) }
                    title="Delete?"
                  />
                  <IoMdCheckmark
                    className='check-icon icon' 
                    onClick={() => handleComplete (index)}
                    title="Complete?"
                  />
                  </div>
                </div>
              );
            })}
          {/* For the Completed Screen */}
            {isCompleteScreen===true && completedTodos.map((item,index) => {
              return(
                <div className='todo-list-item' key={index}>
                  <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On : {item.completedOn}</small></p>
                  </div>
                  <div>
                  <MdOutlineDelete 
                    className='icon' 
                    onClick={() => handleDeleteCompletedTodo (index) }
                    title="Delete?"
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

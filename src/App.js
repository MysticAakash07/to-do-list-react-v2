import { useState } from 'react';
import './App.css';
function App() {
  const [isCompleteScreen,setIsCompleted] = useState(false);
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
            <input type="text" placeholder='Enter a Task ...' name='Title'/>
          </div>
          <div className='todo-input-item'>
            {/* For taking the Description Input */}
            <label for="Des">Description</label>
            <input type="text" placeholder='Enter Description ...' name='Des'/>
          </div>
            {/* For the button to add the task to the list */}
          <div className='todo-input-item'>
            <button type='button' className='primaryBtn'>Add</button>
          </div>
        </div>

        {/* Button For ToDo and Completed */}
        <div className='btn-area'>
          <button  className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleted(false)}>ToDo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleted(true)}>Completed</button>
        </div>

        {/* To Do list items */}
        <div className='todo-list'>
          <div>
            <h3>Task 1</h3>
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

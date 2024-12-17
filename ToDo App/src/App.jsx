import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setTodos] = useState([]); 
  const [toDo, setTodo] = useState('');

  const addTodo = () => {
    if (toDo.trim()) {
      setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setTodo('');
    }
  };


  const toggleStatus = (id) => {
    setTodos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };


  const deleteTodo = (id) => {
    setTodos(toDos.filter((todo) => todo.id !== id));
  };


  const clearAll = () => {
    setTodos([]);
  };

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };


  const pendingTasks = toDos.filter((todo) => !todo.status);
  const completedTasks = toDos.filter((todo) => todo.status);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Organize Your Day Like a Pro! 🌟</h2>
      </div>

   
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="🖊️ Add item..."
          aria-label="Add a new task"
        />
        <i onClick={addTodo} className="fas fa-plus" title="Add Task"></i>
      </div>

 
      {toDos.length > 0 && (
        <div className="clear-all">
          <button onClick={clearAll}>Clear All Tasks</button>
        </div>
      )}

      
      <div className="todos">
        <h2>Pending Tasks ({pendingTasks.length}):</h2>
        {pendingTasks.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={obj.status}
                onChange={() => toggleStatus(obj.id)}
                aria-label={`Mark ${obj.text} as completed`}
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i
                className="fas fa-times"
                onClick={() => deleteTodo(obj.id)}
                title="Delete Task"
              ></i>
            </div>
          </div>
        ))}
      </div>

      <div className="todos completed">
        <h2>Completed Tasks ({completedTasks.length}):</h2>
        {completedTasks.map((obj) => (
          <div className="todo completed" key={obj.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={obj.status}
                onChange={() => toggleStatus(obj.id)}
                aria-label={`Mark ${obj.text} as pending`}
              />
              <p style={{ textDecoration: 'line-through' }}>{obj.text}</p>
            </div>
            <div className="right">
              <i
                className="fas fa-times"
                onClick={() => deleteTodo(obj.id)}
                title="Delete Task"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

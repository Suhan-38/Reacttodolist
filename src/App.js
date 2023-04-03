import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  // Fetch todos from API when component have initial render
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => {
        setTodos(response.data.slice(0,10));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Add a new todo
  

  const handleAddTodo = async() => {
    if(todos.length>189){
      alert("delete few items");
      return;
    }
    const newTodoItem = {
      id: todos.length+10,
      title: newTodo,
      completed: false,
    };
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodoItem)
      .then(response => {
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  

// Edit a todo
const handleEditTodo = (id, newTitle) => {
  const updatedTodoItem = {
    title: newTitle,
    completed: todos.find(todo => todo.id === id).completed,
  };
  axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodoItem)
    .then(response => {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return response.data;
        } else {
          return todo;
        }
      });
      setTodos(updatedTodos);
    })
    .catch(error => {
      console.log(error);
    });
};

  

  // Delete a todo
  const handleDeleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        setTodos(todos.filter(todo => todo.id !== id));
      }).then(()=>{
        console.log(todos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='todolist'>
      <div className='todo-container'>
      <div className='header'>
      <h1>Todo List</h1>
      <div className='topinput'>
        <input type="text" value={newTodo} onChange={(event) => setNewTodo(event.target.value)} className="addtodo" />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      </div>
      <div className='listcontainer'>
      <ul>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            
          />
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}

export default App;


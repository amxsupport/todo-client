import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    const token = localStorage.getItem('jwtToken');

    try {
      const response = await axios.get('http://localhost:3000/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos. Please try again.');
    }
  };

  const handleAddTodo = async () => {
    const token = localStorage.getItem('jwtToken');

    try {
      const response = await axios.post(
        'http://localhost:3000/todos',
        { title: newTodo, completed: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('jwtToken');

    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

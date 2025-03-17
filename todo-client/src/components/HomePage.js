import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const fetchTodos = async () => {
    const token = localStorage.getItem('jwtToken');

    try {
      const response = await axios.get('http://localhost:3000/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched todos:', response.data);
      setTodos(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch todos. Please try again.');
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const token = localStorage.getItem('jwtToken');

    try {
      const response = await axios.post(
        'http://localhost:3000/todos',
        { title: newTodo.trim(), completed: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Added todo:', response.data);
      setTodos(prevTodos => [...prevTodos, response.data]);
      setNewTodo('');
      setError('');
    } catch (err) {
      console.error('Add error:', err);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (!todoId) {
      console.error('Invalid todo ID for deletion:', todoId);
      return;
    }

    const token = localStorage.getItem('jwtToken');

    try {
      console.log('Deleting todo with ID:', todoId);
      await axios.delete(`http://localhost:3000/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
      setError('');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const handleToggleTodo = async (todo) => {
    if (!todo.id) {
      console.error('Invalid todo for update:', todo);
      return;
    }

    const token = localStorage.getItem('jwtToken');

    try {
      console.log('Updating todo:', todo);
      const response = await axios.put(
        `http://localhost:3000/todos/${todo.id}`,
        { ...todo, completed: !todo.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Update response:', response.data);
      setTodos(prevTodos => prevTodos.map(t => 
        t.id === todo.id ? response.data : t
      ));
      setError('');
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Todo List</h1>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, {user?.username}!</span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Todo
        </button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li 
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              gap: '10px'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo)}
              style={{ marginRight: '10px', cursor: 'pointer' }}
            />
            <span style={{ 
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#6c757d' : '#212529'
            }}>
              {todo.title}
            </span>
            <button 
              onClick={() => handleDeleteTodo(todo.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>No todos yet. Add some!</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;

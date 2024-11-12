import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filter, setFilter] = useState('all');     

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  
  const filteredTodos = todos.filter(todo => {
    
    if (filter === 'completed' && !todo.completed) return false;
    if (filter === 'notCompleted' && todo.completed) return false;

    
    return (
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.userId.toString().includes(searchTerm)
    );
  });

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h2>Список задач</h2>
      
      {}
      <input 
        type="text" 
        placeholder="Поиск по UserID или названию" 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)} 
      />

      {/* кнопки */}
      <div>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('completed')}>Выполнено</button>
        <button onClick={() => setFilter('notCompleted')}>Не выполнено</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              backgroundColor: todo.completed ? 'lightgreen' : 'lightcoral', 
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <strong>Задача {todo.id}</strong>: {todo.title}
            </div>
            <div>Статус: {todo.completed ? 'Выполнено' : 'Не выполнено'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

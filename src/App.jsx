import { useState } from 'react';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import "./index.css"

function App() {
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState(null);
    const [showCompleted, setShowCompleted] = useState(false);

    function handleAdd(text) {
        setTodos([...todos, { id: Date.now(), text }]);
    }

    function handleRemove(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function handleEdit(todo) {
        setEditing(todo);
    }

    function handleSave(todo) {
        const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        setTodos(updatedTodos);
        setEditing(null);
    }

    function handleCancel() {
        setEditing(null);
    }

    const handleToggle = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleShowCompleted = (e) => {
        setShowCompleted(e.target.value === 'completed');
    };

    const visibleTodos = todos.filter((todo) => {
        if (showCompleted) {
            return todo.completed;
        } else {
            return !todo.completed;
        }
    });

    return (
      <div>
          <h1> ToDo List </h1>
          <label>
              <select onChange={handleShowCompleted}>
                  <option value="all"> All Items </option>
                  <option value="completed"> Completed </option>
              </select>
          </label>
          <ul>
              {visibleTodos.map((todo) => (
                <li key={todo.id}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                    />
                    <span
                      style={{textDecoration: todo.completed ? 'line-through' : 'none',}}
                    >
                            {todo.text}
                        </span>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                    <button onClick={() => handleRemove(todo.id)}>Remove</button>
                </li>
              ))}
          </ul>
          <AddTodo onAdd={handleAdd} />
          {editing && (
            <EditTodo todo={editing} onSave={handleSave} onCancel={handleCancel} />
          )}
      </div>
    );
}

export default App;




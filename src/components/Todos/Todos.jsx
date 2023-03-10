import { useState } from 'react';
import AddTodo from "./AddTodo.jsx";
import EditTodo from "./EditTodo.jsx";
import TodoItem from "./TodoItem.jsx";
function Todos() {

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
                <TodoItem todo={todo} onEdit={handleEdit} onRemove={handleRemove} onToggle={handleToggle}/>
            ))}
        </ul>
        <AddTodo onAdd={handleAdd} />
        {editing && (
            <EditTodo todo={editing} onSave={handleSave} onCancel={handleCancel} />
        )}
    </div>
);
}
export default Todos;
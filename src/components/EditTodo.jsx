import { useState } from 'react';

function EditTodo({ todo, onSave, onCancel }) {
    const [text, setText] = useState(todo.text);

    function handleSubmit(e) {
        e.preventDefault();
        if (!text) return;
        onSave({ ...todo, text });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default EditTodo;

import { useState } from 'react'
function EditTodo({ todo, onSave }) {
  const [text, setText] = useState(todo.text)

  function handleSubmit(e) {
    e.preventDefault()
    if (!text) return
    onSave({ ...todo, text })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}
export default EditTodo

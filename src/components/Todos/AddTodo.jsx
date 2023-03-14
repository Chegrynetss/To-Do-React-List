import React, { useState } from 'react'

function AddTodo({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!text) {
      return
    }
    onAdd(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="input__Form">
      <input
        className="input__Input"
        type="text"
        placeholder="Add a new Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

export default AddTodo

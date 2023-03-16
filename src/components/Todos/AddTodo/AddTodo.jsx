import React, { useState } from 'react'
import './AddTodo.styles.css'

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
    <form onSubmit={handleSubmit} className="Form__shape">
      <input
        className="Form__input"
        type="text"
        placeholder="Add a new Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

export default AddTodo

import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { createTodoRequest } from '../../../redux/actions/actions'
import './AddTodo.styles.css'

function AddTodo({ onAdd, onToggleClick, onToggleActive, showToggle }) {
  const [text, setText] = useState('')
  // const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    if (!text) {
      return
    }
    // dispatch(createTodoRequest(text))
    onAdd(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="AddTodo__shape">
      {showToggle ? (
        <>
          <input
            type="button"
            id="toggle-id"
            className="AddTodo__all-input--toggle"
          />
          <label
            htmlFor="toggle-id"
            onClick={onToggleClick}
            className={`AddTodo__button-toggle-all ${
              onToggleActive ? 'AddTodo__button-toggle-all--active' : ''
            }`}
          />
        </>
      ) : null}
      <input
        className={`AddTodo__input ${text ? 'AddTodo__input--typing' : ''}`}
        type="text"
        placeholder="What needs to be done? "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

export default AddTodo

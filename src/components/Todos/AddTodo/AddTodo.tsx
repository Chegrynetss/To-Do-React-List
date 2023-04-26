import React, { useState, FormEvent } from 'react'
import { useStyles } from './AddTodo.styles'

type Props = {
  onAdd: (text: string) => void
  onToggleClick: () => void
  onToggleActive: boolean
  showToggle: boolean
}

function AddTodo({ onAdd, onToggleClick, onToggleActive, showToggle }: Props) {
  const [text, setText] = useState('')

  const { classes } = useStyles()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!text) {
      return
    }
    onAdd(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className={classes.shape}>
      {showToggle ? (
        <>
          <input
            type="button"
            id="toggle-id"
            className={classes.allInputToggle}
          />
          <label
            htmlFor="toggle-id"
            onClick={onToggleClick}
            className={`${classes.buttonToggleAll} ${
              onToggleActive ? `${classes.buttonToggleAll}--active` : ''
            }`}
          />
        </>
      ) : null}
      <input
        className={`${classes.input} ${text ? `${classes.input}--typing` : ''}`}
        type="text"
        placeholder="What needs to be done? "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

export default AddTodo

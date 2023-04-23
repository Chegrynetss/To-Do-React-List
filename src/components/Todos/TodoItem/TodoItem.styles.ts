import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()({
  checkbox: {
    width: 29,
    height: 29,
    margin: '0 10px',
    background: 'none',
    padding: '0.5px',
    border: '1px solid rgb(200, 194, 194)',
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconChecked: {
    width: 20,
    height: 20,
    margin: 'unset',
  },

  boxValue: {
    display: 'grid',
    gridTemplateColumns: '58px 1fr',
    alignItems: 'center',
  },

  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },

  item: {
    width: '100%',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 58px',
    height: 60,
    borderBottom: '1px solid #ededed',
  },

  editing: {
    gridTemplateColumns: '1fr !important',
  },

  inputEditing: {
    width: '97.5%',
    height: '82%',
    fontSize: '24px',
    padding: '6px',
    border: '1px solid #999',
    boxShadow: 'inset 0 -1px 5px 0 rgb(0 0 0 / 20%)',
    fontWeight: 'inherit',
    fontFamily: 'inherit',
  },

  todoText: {
    textDecoration: 'none',
    color: 'inherit',
    userSelect: 'none',

    '&.completed': {
      textDecoration: 'line-through',
      color: '#d9d9d9',
    },
  },

  buttonDeleting: {
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 10,
    bottom: 0,
    width: 40,
    height: 40,
    margin: 'auto 0',
    fontSize: 40,
    color: '#cc9a9a',
    marginBottom: 11,
    transition: 'color 0.2s ease-out',
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,

    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      height: 20,
      width: 1,
      backgroundColor: 'currentColor',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },

    '&::after': {
      transform: 'translate(-50%, -50%) rotate(-45deg)',
    },

    '&:hover::before, &:hover::after': {
      backgroundColor: '#bd4141',
    },
  },
})

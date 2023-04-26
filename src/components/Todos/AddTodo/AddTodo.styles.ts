import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()({
  shape: {
    width: 550,
    height: '100%',
    padding: 0,
    margin: 0,
  },

  input: {
    width: '100%',
    height: '100%',
    margin: 0,
    border: 'none',
    lineHeight: '1.4em',
    padding: '12px',
    paddingLeft: '33px',
    fontSize: 24,
    fontWeight: 'inherit',
    boxSizing: 'border-box',
    color: 'rgb(77, 77, 77)',
    opacity: 0.2,
    fontFamily: 'inherit',
    fontStyle: 'italic',
    background: 'rgba(0, 0, 0, 0.003)',
    boxShadow: 'inset 0 -2px 1px rgb(0 0 0 / 3%)',

    '&:focus': {
      outline: 'none',
    },

    '&.--typing': {
      opacity: 1,
      fontStyle: 'normal',
    },
  },

  allInputToggle: {
    position: 'absolute',
    opacity: 0,
    left: -12,
    top: -8,
  },

  buttonToggleAll: {
    position: 'relative',
    height: 0,

    '&::before': {
      position: 'absolute',
      content: '"❯"',
      color: '#e6e6e6',
      fontSize: 22,
      left: -6,
      top: -8,
      transform: 'rotate(90deg)',
      zIndex: 1,
    },

    '&.--active::before': {
      color: '#737373',
    },
  },
})

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()({
  button: {
    color: 'rgb(119, 119, 119)',
    fontFamily: 'inherit',
    fontWeight: 400,
    padding: '4px 8px',
    margin: 3,
    border: '1px solid transparent',
    background: 'rgba(0, 0, 0, 0.003)',
    borderRadius: 4,
    textDecoration: 'none',
    '&:hover': {
      borderColor: 'rgba(200, 112, 112, 0.2)',
    },
    '&.--active': {
      borderColor: 'rgba(175, 47, 47, 0.2)',
    },
  },
})

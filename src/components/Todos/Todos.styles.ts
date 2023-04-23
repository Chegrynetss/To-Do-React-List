import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'rgba(175, 47, 47, 0.15)',
    fontSize: '100px',
    fontWeight: 100,
    width: '100%',
    margin: '24px',
    textAlign: 'center',
  },

  form: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
  },

  box: {
    width: 600,
    height: 'auto',
    border: '0.3px solid transparent',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
    position: 'relative',
  },

  boxSection: {
    width: 600,
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  listItems: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontSize: 24,
  },

  footer: {
    display: 'flex',
    height: '41px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px',
    boxSizing: 'border-box',
  },

  buttonCount: {
    fontFamily: 'inherit',
    fontWeight: 300,
    color: 'rgb(119, 119, 119)',
  },

  buttonClear: {
    fontFamily: 'inherit',
    fontWeight: 300,
    border: 'none',
    backgroundColor: 'transparent',
    color: 'rgb(119, 119, 119)',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  buttonClearHidden: {
    opacity: 0,
    pointerEvents: 'none',
  },

  titleLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    height: '100vh',
    width: '100%',
    position: 'fixed',
    fontWeight: 'inherit',
    top: 0,
    left: 0,
    fontSize: '1.8rem',
  },
})

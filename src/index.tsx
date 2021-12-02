import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: 'white',
        },
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

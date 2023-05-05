import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles.less'
import { ThemeWrapper } from './ThemeWrapper'

// const ThemeContext = React.createContext('light');


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // <ThemeContext.Provider value="light">
  //   <App />
  // </ThemeContext.Provider>
    <ThemeWrapper><App /></ThemeWrapper>

)

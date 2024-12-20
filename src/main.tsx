import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './styles/index.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

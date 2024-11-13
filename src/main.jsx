// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Choose your theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import store from './redux/store.js'
import { Provider } from'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)



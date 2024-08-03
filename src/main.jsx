import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './Componet/DataProvider/DataProvider.jsx'
import{reducer,initialstate} from './Util/reducer.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider  reducer={reducer} initialstate={initialstate}>
    <App />
    </DataProvider>
  </React.StrictMode>,
)

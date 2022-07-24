import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import FirebaseContext from './Contexts/FirebaseContext'
import { firebase, db } from './Lib/firebase'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={(firebase, db)}>
            <App />
        </FirebaseContext.Provider>
    </React.StrictMode>
)

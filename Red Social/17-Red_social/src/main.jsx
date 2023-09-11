import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//Importard recursos
import './assets/fonts/fontawesome/css/all.css';
import './assets/css/normalize.css';
import './assets/css/styles.css';
import './assets/css/responsive.css';
//Cargar configuracio raxt time agp
import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es.json'

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)


ReactDOM.createRoot(document.getElementById('root')).render(

    <App />
  
)

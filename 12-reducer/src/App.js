import {useEffect} from 'react';

import logo from './logo.svg';
import './App.css';
import MisJuegos from './componentes/MisJuegos';


function App() {
  useEffect(()=>{
    console.log("efecto");
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MisJuegos/>
      </header>
    </div>
  );
}

export default App;

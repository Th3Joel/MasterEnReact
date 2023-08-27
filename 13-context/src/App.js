import {useEffect, useState} from 'react';
import './App.css';
import { PruebaContext } from './contexto/PruebaContext';
import AppRouter from './routing/AppRouter';

function App() {

  const [usuario,setUsuario] = useState({});

    useEffect(()=>{
    //La primera vez que se carga el componente
    //Se obtienen los datos guardados en el local storage
    console.log("Efecto de una vez");
    //let usuario_local = JSON.parse(localStorage.getItem("usuario"));

    //setUsuario(usuario_local);
  },[]);

  //Cada vez que detecte un cambio en el use state del usuario
  /*se guarda en el local storage
  useEffect(()=>{
    console.log("Efecto de cambio de usuario");
    localStorage.setItem("usuario",JSON.stringify(usuario));
  },[usuario]);*/



  const curso ={
    id:1,
    titulo:"Master en React",
    contenido:"Muchas horas de contenido"
  }
  
  return (
    <div>

      {/*Le pasamos el valor que va hacer accedio desde cualquier componentes*/}
      <PruebaContext.Provider value={{
        usuario,
        setUsuario
      }}>
        <AppRouter />
      </PruebaContext.Provider>


    </div>
  );
}

export default App;

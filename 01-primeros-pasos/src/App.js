import logo from './logo.svg';
import './App.css';
import MiComponente from './MiComponente';
import { SegundoComponente } from './SegundoComponente';
import { TercerComponente } from './TercerComponente';
import { EventosComponente } from './EventosComponente';
function App() {
  const ficha_medica = {
    altura: "165cm",
    grupo:"H+",
    estado:"Bueno",
    alergias: "Ninguna"
  }
  //Para validar las propiedades
  const numero = 12345;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido a todos
        </p> 

        {/*Esto es mi primer componente*/}
        <div className='componentes'>

          <hr></hr>
          <EventosComponente/>
          <hr></hr>
          {/* Pasar datos al componente */}
          <TercerComponente 
            nombre="Joel"
            apellidos="Urbina"
            ficha={ficha_medica}
          />
        <hr/>
        <SegundoComponente/>
        
        <hr/>
        <MiComponente/>
        </div>
      </header>

    </div>
  );
}

export default App;

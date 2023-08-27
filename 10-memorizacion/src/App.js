import logo from './logo.svg';
import './App.css';
import { Gestion } from './component/Gestion';
import Tareas from './component/Tareas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/**Ejercicio con hool UseMemo */}

        {/*<Tareas/>*/}

        {/**Ejercicio con metodo memo para componentes */}
        <Gestion/>
      </header>
    </div>
  );
}

export default App;

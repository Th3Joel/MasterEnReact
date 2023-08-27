import logo from './logo.svg';
import './App.css';
import { MiPrimerEstado } from './componentes/MiPrimerEstado';
import { EjercicioComponente } from './componentes/EjercicioComponente';

function App() {
  const fecha = new Date();
  const yearActual = fecha.getFullYear();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>El estado en react - Hook useState</h3>

        <MiPrimerEstado/>
        <EjercicioComponente year={yearActual}/>
      </header>
    </div>
  );
}

export default App;

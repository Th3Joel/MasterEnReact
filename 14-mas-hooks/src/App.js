import logo from './logo.svg';
import './App.css';
import { MiComponente } from './component/MiComponente';
import { PruebasCustom } from './component/PruebasCustom';
import { MiFormulario } from './component/MiFormulario';
import { MiUsuario } from './component/MiUsuario';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MiUsuario/>
      </header>
    </div>
  );
}

export default App;

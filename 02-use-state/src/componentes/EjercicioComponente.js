import React,{useState} from 'react';
import PropTypes from 'prop-types';
export const EjercicioComponente = ({year}) => {

    const [yearNow,setYearNow] = useState(year);

    const siguiente = e =>{
        setYearNow(yearNow+1);
    }

    const anterior = e =>{
        let operacion = yearNow -1;
        setYearNow(operacion);
    }

      const cambiarYear = e =>{
            let dato = parseInt(e.target.value);
            if(Number.isInteger(dato)){
                setYearNow(dato);
            }else{
                setYearNow(year);
            }
            
        }
  return (
    <div>
        <h2>Ejercicio con eventos y useState</h2>
        <strong className='label label-green'>
            {yearNow}
        </strong>
        <p>
            <button onClick={siguiente}>Siguiente</button>
            &nbsp;
            <button onClick={anterior}>Anterior</button>
        </p>
        <p>
            Cambiar año:
            <input
            onChange={cambiarYear} 
            type="text"
            placeholder='Cambia el año'/>
        </p>
    </div>
  )
}


EjercicioComponente.propTypes = {
    year: PropTypes.number.isRequired
}
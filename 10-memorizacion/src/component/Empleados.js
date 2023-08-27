import React, { memo, useEffect, useState } from 'react'

const Empleados = ({pagina,mensaje}) => {


   

    const [empleados,setEmpleados] = useState([]);

    useEffect(()=>{
        conseguirEmpleados(pagina);
    },[pagina]);

    useEffect(()=>{
        console.log("Se renderizo Empleados");
        mensaje();
    },[empleados]);
    const conseguirEmpleados = async(p) => {
        const url = "https://reqres.in/api/users?page="+p;
        const peticion = await fetch(url);
        //const empledos = await peticion.json();
        //ó
        const {data:empleado} = await peticion.json();

        console.log(empleado);

        setEmpleados(empleado);

        console.log("Se ejecuto la peticion ajax");
    }
    
    
   
  return (
    <div>
        <ul className='empleados'>
            {
                empleados.length >= 1 && empleados.map(em => {
                    return (<li key={em.id}>
                        {em.first_name + " "+ em.last_name} 
                        </li>)
                })
            }
        </ul>
    </div>
  )
}
//La funcion memo para que no se
// renderize varias veces el componente
export default memo(Empleados)
 export const GuardarEnStorage = (clave, peli) =>{
    //Conseguir los elementos alamcenados en el local storage
      let elementos = JSON.parse(localStorage.getItem(clave));
      
    //comprobar si es un array
      if(Array.isArray(elementos)){
        //Añadir dentro del arrayy un elemetn nuevo
        elementos.push(peli);
      }else{
        //Crear un array con la nueva peli
        elementos = [peli];
      }

      console.log(elementos);
    //Guradar en el localstorage

    //Devolver objeto guardado

     //Guardar en el amacenamiento locaStorage
  localStorage.setItem(clave, JSON.stringify(elementos));

  return peli;
  }
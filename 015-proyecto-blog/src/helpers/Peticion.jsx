
export const Peticion = async(url,metodo,saveData="",archivo=false) =>{
   
   let cargando = true;
 
   //Variable de opcionnes para configurar e funcion
   // del metodo de http

        let opciones = {
            method:"GET"
        }

        if(metodo == "GET"  || metodo == "DELETE"){
            opciones = {
                method:metodo
            }
        }

        if (metodo == "POST" || metodo == "PUT") {
           
            if(archivo){
                opciones = {
                method:metodo,
                body:saveData
             }
            }else{
                opciones = {
                method:metodo,
                body:JSON.stringify(saveData),
                headers:{
                    "Content-Type":"application/json",
                }
             }
            }
            
        }

        // Se espera a que lleguen los datos
            const peticion = await fetch(url,opciones);
            //Asigno a datos para enviarlos a traves del metodo
                 const datos =  await peticion.json();
          
    
            cargando = false;

       
    

//Envio los datos
    return {
        datos,
        cargando
    }
}
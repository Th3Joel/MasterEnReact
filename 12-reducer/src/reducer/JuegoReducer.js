
export const JuegoReducer = (state = [], action) => {
  switch (action.type) {
    case "crear":
        return [...state,action.payload]
    case "borrar":
        //Eliminar juego y filtrando
        return state.filter(juego => juego.id !== action.payload);
    case "editar":
        let indice = state.findIndex(juego => juego.id == action.payload.id)
        console.log(indice);

        state[indice] = action.payload;

            //Devolber array nuevo
        return [...state];
     default:
        return state;
  }
}

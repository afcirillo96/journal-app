import { types } from '../types/types';

/*
    {
        el state estara vacio cuando NO este autenticado

        caso contrario:
        uid:  'gegegaegag86e4g68esgsgsga'
        name: 'Agustin'
    }
*/

export const authReducer = (state = {} ,action) => {
    switch (action.type) {//realizamos las acciones
        case types.login:   //importamos los types creados y usamos en este caso 'login'
            return {//nos tiene q devolver el uid y el nombre
                uid: action.payload.uid,
                name: action.payload.displayName
            }
    
        case types.logout:  //importamos los types creados y usamos en este caso 'logout'
            return { }//no recibe nada. vacio

        default://caso por defecto, siempre retornar el state
            return state;
    }
}
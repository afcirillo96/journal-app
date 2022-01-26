import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import thunk from 'redux-thunk';
import { notesReducer } from '../reducers/notesReducer';

//PEGAMOS ESTO PARA QUE FUNCIONE
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({//contenedor de todos los recucers. 
    auth: authReducer,             //Aqui añadimos una nueva funcionalidad si es necesario
    ui: uiReducer,
    notes: notesReducer,
})

export const store = createStore(
    reducers, composeEnhancers( applyMiddleware( thunk ) )
);//recibe un reducer, podria ser authReducer, pero solo recibe uno, solo uno.
                                           //Por ende creamos reducers
import React from 'react'
import { AppRouter } from './routers/AppRouter'
import { Provider } from 'react-redux';//Provider provee info a toda la aplicacion
import { store } from './store/store';

export const JournalApp = () => {
    return (
        <Provider store = {store}>
            <AppRouter />
        </Provider>
    )
}

import { firebaseApp, googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import { createUserWithEmailAndPassword, updateProfile,  getAuth, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'
import { noteLogout } from './notes';

//accion asincrona

//LOGIN FORMULARIO
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );//para bloquear el boton

        const auth = getAuth(firebaseApp);
        return signInWithEmailAndPassword(auth, email, password)//SI JODE SACAR RETURN
            .then(({user}) => {
                dispatch( finishLoading() );//para bloquear el boton
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch((error) => {
                dispatch( finishLoading() );//para bloquear el boton
                //Swal.fire('Error', error.message, 'error');
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    imageUrl: 'https://pbs.twimg.com/media/ChjfzJDWkAAdtFH.png',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                });
            });
    };
};

//REGISTER FORMULARIO
export const startRegisterWithEmailPasswordName =  (email, password, name) =>{
    return ( dispatch ) => {
        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword(auth,email,password )
            .then( async ({user}) => {
                await updateProfile(user,{displayName:name})
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch((error) => {
                //Swal.fire('Error', error.message, 'error');
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    imageUrl: 'https://pbs.twimg.com/media/ChjfzJDWkAAdtFH.png',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                });
            })
    }
}

//LOGIN GOOGLE
export const startGoogleLogin = () =>{
    return (dispatch) =>{//return porque es asicronico
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch( login(user.uid, user.displayName) )
            });
    }
}

//creamos la accion de LOGIN
export const login=(uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

//LOGOUT
export const startLogout = () => {
    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
})
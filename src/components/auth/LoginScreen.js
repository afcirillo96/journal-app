import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import Swal from 'sweetalert2';
import 'animate.css';

export const LoginScreen = () => {

    const [ formValues, handleInputChange ] = useForm({//importamos el useForm y desestructuramos lo que necesitemos usar
        email: 'eiden@gmail.com',
        password: '123456'
    });
    
    //extraemos/desestructuramos los formValues
    const { email, password} = formValues;//ahora los usamos donde los necesitemos
    const dispatch = useDispatch();//udeDispatch sirve para hacer dispatch de acciones
    const { msgError } = useSelector(state => state.ui);
    const { loading } = useSelector(state => state.ui);//para extraer el loading del ui

    //LOGIN DE GOOGLE
    const handleGoogleLogin = ()=> {
        dispatch( startGoogleLogin() );
    }

    //LOGIN del Formulario
    const handleLogin = (e) => {
        e.preventDefault();
        if ( isFormValid() ) {
            dispatch( startLoginEmailPassword(email, password) );
        }
    }

    //VALIDACION DEL FORMULARIO
    const isFormValid = () => {//validador del formulario

        if ( !validator.isEmail( email ) ){//validar email
            dispatch( setError('Email is not valid') )
            Swal.fire({
                title: 'Error!',
                text: 'Email is not valid!',
                imageUrl: 'https://pbs.twimg.com/media/ChjfzJDWkAAdtFH.png',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            });
            return false;

        } else if ( password.length <= 5 ){//validaro password
            dispatch( setError('Password should be at least 6 characters long') )
            Swal.fire({
                title: 'Error!',
                text: 'Password should be at least 6 characters long!',
                imageUrl: 'https://pbs.twimg.com/media/ChjfzJDWkAAdtFH.png',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            });
            return false;

        }
        dispatch( removeError() )
        return true;
    }

    return (
        <div>
            <h3 className="auth__title">Login</h3>

            <form 
                onSubmit= { handleLogin }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {/* msgError && ( <div className="auth__alert-error"> {msgError} </div> ) */}

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }

                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login With Social Networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with Google</b>
                    </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create New Account
                </Link>

            </form>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import Swal from 'sweetalert2';
import 'animate.css';

export const RegisterScreen = () => {

    const dispatch = useDispatch();//udeDispatch sirve para hacer dispatch de acciones

    const { msgError } = useSelector(state => state.ui);
    
    const [ formValues, handleInputChange ] = useForm({//importamos el useForm y desestructuramos lo que necesitemos usar
        name: 'agus',
        email: 'eiden@gmail.com',
        password: '123456',
        password2: '123456'
    });

    //extraemos/desestructuramos los formValues
    const { name, email, password, password2} = formValues;//ahora los usamos donde los necesitemos
    
    //SUBMIT del Formulario
    const handleRegister = (e) => {
        e.preventDefault();
        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email,password,name))
        }
    }

    const isFormValid = () => {//validador del formulario

        if ( name.trim().length === 0 ) {//si no hay nada 
            /*dispatch( setError('Name is required') )
            return false;*/
            dispatch( setError('Name is required') )
            Swal.fire({
                title: 'Error!',
                text: 'Name is required!',
                imageUrl: 'https://pbs.twimg.com/media/ChjfzJDWkAAdtFH.png',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            })
            return false;

        } else if ( !validator.isEmail( email ) ){//validar email
            dispatch( setError('Email is not valid') )
            Swal.fire({
                title: 'Error!',
                text: 'Email is not valid!',
                imageUrl: 'https://pbs.twimg.com/media/ChjfzJDWkAAdtFH.png',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            })
            return false;

        } else if ( password !== password2 || password.length <= 5 ){//validaro passwords
            dispatch( setError('Password should match each other and be at least 6 characters long') )
            Swal.fire({
                title: 'Error!',
                text: 'Password should match each other and be at least 6 characters long!',
                imageUrl: 'https://pbs.twimg.com/media/ChjfzJDWkAAdtFH.png',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            })
            return false;

        }
        dispatch( removeError() )
        return true;
    }

    return (
        <div>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {/* msgError && (<div className="auth__alert-error">{msgError}</div>) */}
                
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link "
                >
                    Already Registered?
                </Link>

            </form>
        </div>
    )
}

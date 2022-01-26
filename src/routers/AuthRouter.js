import React from 'react'
import { LoginScreen } from './../components/auth/LoginScreen';
import { RegisterScreen } from './../components/auth/RegisterScreen';
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";

export const AuthRouter = () => {
    return (
        <Router>
            <div className="auth__main background-auth">
                <div className="auth__box-container">
                    <Switch>
                        <Route 
                            exact
                            path="/auth/login"
                            component={ LoginScreen }
                        />
                        <Route 
                            exact
                            path="/auth/register"
                            component={ RegisterScreen }
                        />
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>

                <div className="version">Version 1.0</div>
                <div className="data">Journal-App. January 2022. Cirillo Agustin.</div>
                
            </div>
            
        </Router>
        
    )
}

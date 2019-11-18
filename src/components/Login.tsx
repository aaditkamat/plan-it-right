import React from 'react';
import LoginForm from './LoginForm';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import './Login.scss';

const Login: React.FC = () => {
    const responseFacebook = (userInfo: ReactFacebookLoginInfo) => {
        console.log(userInfo);
    }

    const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline ) => {
        console.log(response);  
    }

    return (
        <div className="container login-form">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <h1> Sign In With </h1>
                    <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook} />
                    <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'} />
                    <LoginForm />         
                </div>
            </div>
        </div>
    );
}

export default Login;
import React from 'react';
import './LoginForm.scss';

const LoginForm: React.FC = () => {
    return (
        <div>
            <form>
                <h2>Email: </h2>
                <input type="email" />
                <h2>Password: </h2>
                <input type="password" />
                <br /> <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default LoginForm;

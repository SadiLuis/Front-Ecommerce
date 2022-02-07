import React, {useState} from 'react';
import Swal from 'sweetalert2';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import {postLogin} from '../../actions/index';
import { Link } from 'react-router-dom';




const Login = () => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({ password:'', email:''});

    const [error, setError] = useState("");

    const appLogin = details => {
        console.log(details);
        // eslint-disable-next-line no-self-compare
        if ( postLogin.password === postLogin.password && postLogin.email === postLogin.email) {
            console.log("Login Successful");
            setUser({
                user: postLogin.user,
                password: postLogin.password,
                email: postLogin.email
            })

        } else {
            console.log("Login Failed");
            //setError("Login Failed");
            Swal.fire({
                icon: 'error',
                text: 'Login Failed please Login or Register',
            })
        }
    }

    const Logout = () => {
        setUser({
           
            password: '',
            email: ''
            });
    }

	return (
			<div >
				{(user.email != "") ? (
                    <div className="Welcome" >
                        <h2> Welcome, Admin <span>{postLogin.user}</span> </h2>
                    <button onClick={Logout} className="btn btn-secondary"  >Logout</button> 
                    <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>  
                    </div> 
                ): (
                    <LoginForm appLogin={appLogin} error={error} />
                )
                }	
				
			</div>

	)
}

export default Login;
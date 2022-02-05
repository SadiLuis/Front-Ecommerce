import React, {useState} from 'react';
import Swal from 'sweetalert2';
import LoginForm from './LoginForm';




const Login = () => {
    const userAdmin = {
        username: 'SadiLuis',
        password: 'admin123',
        email: 'admin@example.com'
    }

    const [user, setUser] = useState({username:'', password:'', email:''});

    const [error, setError] = useState("");

    const appLogin = details => {
        console.log(details);
        if (details.username === userAdmin.username && details.password === userAdmin.password && details.email === userAdmin.email) {
            console.log("Login Successful");
            setUser({
                username: details.username,
                password: details.password,
                email: details.email
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
            username: '',
            password: '',
            email: ''
            });
    }

	return (
			<div >
				{(user.email != "") ? (
                    <div className="Welcome" >
                        <h2> Welcome, <span>{user.username}</span> </h2>
                    <button onClick={Logout} >Logout</button>   
                    </div> 
                ): (
                    <LoginForm appLogin={appLogin} error={error} />
                )
                }	
				
			</div>

	)
}

export default Login;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import {postUser} from '../../actions/userActions'
import style from'./styleUser/CreateUser.module.css';
import Swal from 'sweetalert2';


function CreateUser(){
   
    const navigate = useNavigate();


    const [user, setUser] = useState({
        Username: '',
        Password: '',
        Email: '',
        Address: '',
    });

    const [errors, setErrors] = useState({});

    ///////////////////////Validations //////////////////
    const validate = function (user) {
        const errors = {};
        if (user.Username.trim() === '') {
            errors.Username = 'Username is required';
        }
        if (user.Password === '') {
            errors.Password = 'Password is required';
        }
        if (user.Email === '') {
            errors.Email = 'Email is required';
        }
        if (user.Address === '') {
            errors.Address = 'Address is required';
        }
        return errors;

    }

    ////////////HANDLE////////////////////////////////

    const handleInputChange = (e) => {  //modifico mi estado input agregando lo q me pasan por input del form
        e.preventDefault()
       setUser((user)=>{
           const newUser={
             ...user,
             [e.target.name]: e.target.value
           }
           const error = validate(newUser);
           setErrors(error);
           return newUser;
         })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(
            user.Username &&
            user.Password &&
            user.Email &&
            user.Address 
        ) {
            //postUser(user);
            Swal.fire({
                text: `You have created a new user ${user.Username} , redirecting to login`,
                icon: 'success',
                confirmButtonText: 'Ok'
                })
                
            setUser({
                Username: '',
                Password: '',
                Email: '',
                Address: '',
            });
            navigate('/login');
        } else {
            const error = validate(user);
            setErrors(error);
        }
    }



    return(
        <div className={style.bkg} >

            <h1  className={style.register} > REGISTER</h1>
            <div className={style.conteiner} >
                
            <div className={style.form}  >
                <form onSubmit={
                    (e) => 
                    handleSubmit (e)
                } >
                    <div className={style.section}  >
                    <h4> Username</h4>
                    <input 
                    type="text"
                    name="Username"
                    className={style.input}
                    onChange={(e) => handleInputChange(e)}
                    placeholder='Username ...'
                    value={user.Username}
                    autoComplete='off'
                    />
                     {
                        errors.Username &&
                        <p className={style.error}>{errors.Username}</p>
                     }   
                    </div>
                    <div className={style.section} >
                        
                    <h4> Password</h4>
                    <input
                    type="password"
                    name="Password"
                    className={style.input}
                    onChange={(e) => handleInputChange(e)}
                    placeholder='Password ...'
                    value={user.Password}
                    autoComplete='off'
                    />
                        {
                            errors.Password &&
                            <p className={style.error}>{errors.Password}</p>
                        }

                    </div>
                    
                    <div className={style.section} >
                    <h4> Email</h4>
                    <input
                    type="text"
                    name="Email"
                    onChange={(e) => handleInputChange(e)}
                    placeholder='Email ...'
                    value={user.Email}
                    className={style.input}
                    autoComplete='off'
                    />
                        {
                            errors.Email &&
                            <p className={style.error}>{errors.Email}</p>
                        }
                        
                    </div>

                    <div className={style.section} >
                            
                    <h4> Address</h4>
                    <input
                    type="text"
                    name="Address"
                    className={style.input}
                    onChange={(e) => handleInputChange(e)}
                    placeholder='Address ...'
                    value={user.Address}
                    autoComplete='off'
                    />
                        {
                            errors.Address &&   
                            <p className={style.error}>{errors.Address}</p>
                        }
                    
                    </div>

                    <button 
                    type="submit" 
                    className={style.btn}
                    disabled={ Object.keys(errors).length > 0 || user.Username.length === 0 || user.Password.length === 0 || user.Email.length === 0 || user.Address.length === 0}
                    >
                    
                        Create User
                    </button>


                </form>

            </div>
            </div>


        </div>    
    )

}

export default CreateUser;
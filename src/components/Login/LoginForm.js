import React, {useState} from 'react';
import  style from './Style/LoginAdm.module.css'
import img from './Style/img/notbook.jpg'
import { Link } from 'react-router-dom';
import postLogin from '../../actions/index';


function LoginForm({ appLogin , error }) {
    const [postLogin, setDetails] = useState({ password:'', email:''});

    const handleSubmit = e => {
        e.preventDefault();
        appLogin(postLogin);

    }


  return (

        <form onSubmit={handleSubmit} >

            <img src={img} alt="notbook" className={style.img} />

                <h2> LOGIN</h2>
            <div className={style.conteiner}>
                    {   
                        (error != "") ? 
                        (  <div className={style.error}> {error} </div> ) : ""

                    }


                <div className={style.username}>
                    <label className={style.label} >Username</label>
                    <input type="text" name="username" placeholder="Username" id="username" onChange={e => setDetails ({
                        ...postLogin, username: e.target.value
                    })} value={postLogin.name} />
                </div>  

                <div className={style.password}>
                    <label className={style.label} >Password</label>
                    <input type="password" name="password" placeholder="Password" id="password" onChange={e => setDetails ({
                        ...postLogin, password: e.target.value
                    })} value={postLogin.password}  />
                </div>      
                <div className={style.email}>
                    <label className={style.label} >Email</label>
                    <input type="email" name="email" placeholder="Email" id="email" onChange={e => setDetails ({
                        ...postLogin, email: e.target.value
                    })} value={postLogin.email} />
                </div> 
                <input type="submit" value="Login" className={style.btn}/>   
                <Link to="/register" className={style.btn}>Register</Link>
                
               

            </div>    

        </form>    
    );
}

export default LoginForm;

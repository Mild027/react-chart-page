import React, { useState } from 'react'
import axios from "axios";
import { Navigate } from 'react-router-dom';
const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [varify , SetVatify] = useState("");
    const {username, password} = user;
    const [redirect, setRedirect] = useState(false)
    const onChange = e => setUser({...user,[e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault();
        if(username === '' || password === ''){
            SetVatify('input username and password');
        }else{
            await axios.post('https://localhost:7059/api/Auth/login', {
                username,
                password
            })
            .then(function (response) {
                SetVatify('');
                localStorage.setItem('token', response.data);
            
                setRedirect(true);
            })
            .catch(function (error) {
                SetVatify('User not found');
            });
            
        } 
    }
    if(redirect){
        return <Navigate to="/" />
    }
    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" name="username" value={username} onChange={onChange} />
                </div> 
                <div className="form-group">
                    <label htmlFor="password">User Name</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                
                <input type="submit" value="login" className="btn btn-primary btn-block"/>       
            </form>
            <p>{varify}</p>
        </div>
    )
}

export default Login;

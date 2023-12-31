import React, { Fragment , useRef ,useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login , register } from '../actions/userAction';
import { useAlert } from "react-alert";
import Loader from './Loader';

import './login.css';
function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alertobj = useAlert();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
      );
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/dashboard");
        }
    } , [navigate,isAuthenticated])
    // useEffect(()=>{

    // }, [])
  const [loginUsername, setLUsername] = useState('');
  const [loginPassword, setLPassword] = useState('');
  const [name , setName] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  const [phoneNumber , setPhoneNumber] = useState('');
  const [registerUsername, setRUsername] = useState('');
  const [registerPassword, setRPassword] = useState('');
  const [activeState , setAS] = useState('');
  const [checkboxR , setRCheckState] = useState(true);
  const [remMe , setRemMe] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Username: ${loginUsername}, Password: ${loginPassword} , Rem Me ? : ${remMe}`);
    if(loginUsername == ''){
        alertobj.error("Enter E-mail !!");
        return;

    }
    if(loginPassword == ''){
        alertobj.error("Enter Password !!");
        return;

    }
    dispatch(login(loginUsername,loginPassword))
    navigate("/dashboard");
  };
  const handleRCheckbox = (e)=>{
    setRCheckState(! e.target.checked);
  }
  const handleRemMe = (e)=>{
    setRemMe(e.target.checked);
    if(e.target.checked){
        alertobj.info(":) Will Remember You ♥");
    }else{
        alertobj.info("Alright , NVM :(");
    }
  }
  const handleRegister = (e) => {
    e.preventDefault();
    if(name == ''){
        alertobj.error("Enter Name !!");
        return;
    }
    if(registerUsername == ''){
        alertobj.error("Enter E-mail !!");
        return;

    }
    if(registerPassword == ''){
        alertobj.error("Enter Password !!");
        return;

    }
    if(confirmPassword == ''){
        alertobj.error("Enter Confirm Password !!");
        return;

    }
    if(confirmPassword == registerPassword){
        console.log(`Name : ${name}, Username: ${registerUsername}, Password: ${registerPassword} , PhoneNumber : ${phoneNumber}`);

    }else{
        setRPassword("");
        setConfirmPassword("");
        alertobj.error("Passwords Doesn't Match")
        console.log("Passwords dont match");
    }
    // Add your login logic here
  };
  const markActive = (e) =>{
    e.preventDefault();
    setAS('active');
  };
  const markInActive = (e) =>{
    e.preventDefault();
    setAS('');
  };
return (
    <Fragment>
        {loading? <Loader/> : 
    <div className='mainLoginPage'>

    <div className={"logincontainer" + ' ' + activeState}>
        <div className="forms">
            <div className="form login">
                <span className="title">Login</span>

                <form action="#">
                    <div className="input-field">
                        <input type="text" value={loginUsername} placeholder="Enter your email" onChange={(e) => {setLUsername(e.target.value)}} required />
                        <i className="uil uil-envelope icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="password" value={loginPassword} className="password" placeholder="Enter your password" onChange={(e) => {setLPassword(e.target.value)}} required />
                        <i className="uil uil-lock icon"></i>
                        <i className="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div className="checkbox-text">
                        <div className="checkbox-content">
                            <input type="checkbox" checked={remMe} onChange={handleRemMe}id="logCheck" />
                            <label for="logCheck"   className="text">Remember me</label>
                        </div>
                        
                        <a className="text">Forgot password?</a>
                    </div>

                    <div className="input-field button">
                        <input type="button" onClick={handleLogin} value="Login" />
                    </div>
                </form>

                <div className="login-signup">
                    <span className="text">Not a member?
                        <a className="text signup-link" onClick={markActive}>Signup Now</a>
                    </span>
                </div>
            </div>

            <div className="form signup">
                <span className="title">Registration</span>

                <form action="#">
                    <div className="input-field">
                        <input type="text" value={name} placeholder="Enter your name" onChange={(e) => {setName(e.target.value)}} required />
                        <i className="uil uil-user"></i>
                    </div>
                    <div className="input-field">
                        <input type="text" value={registerUsername} placeholder="Enter your email" onChange={(e) => {setRUsername(e.target.value)}} required /> 
                        <i className="uil uil-envelope icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="password" value={registerPassword} className="password" placeholder="Create a password" onChange={(e) => {setRPassword(e.target.value)}} required />
                        <i className="uil uil-lock icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="password" value={confirmPassword} className="password" placeholder="Confirm a password" onChange={(e) => {setConfirmPassword(e.target.value)}} required />
                        <i className="uil uil-lock icon"></i>
                        <i className="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div className="checkbox-text">
                        <div className="checkbox-content">
                            <input type="checkbox" checked = {!checkboxR} id="termCon" onChange={handleRCheckbox}/>
                            <label for="termCon" className="text">I accepted all terms and conditions</label>
                        </div>
                    </div>

                    <div className="input-field button">
                        <input type="submit" onClick={handleRegister} value="Signup" disabled={checkboxR}/>
                    </div>
                </form>

                <div className="login-signup">
                    <span className="text">Already a member?
                        <a  className="text login-link" onClick={markInActive}>Login Now</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>}
    </Fragment>
    )
}

export default LoginPage;
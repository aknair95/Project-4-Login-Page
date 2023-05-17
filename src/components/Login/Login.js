import React, { useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../storeContext/authContext';
import Input from '../UI/input';



const emailReducer=(state,action) =>{
  if(action.type==="userInput"){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type==="inputBlur"){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value:"", isValid:false};  
}

const passwordReducer=(state,action) =>{
  if(action.type==="userInput"){
    return {value: action.val, isValid: action.val.trim().length>6}
  }
  if(action.type==="inputBlur"){
    return {value: state.value, isValid: state.value.trim().length>6};
  }
  return {value:"", isValid:false};  
}



const Login = () => {

  const [emailState,dispatchEmail]= useReducer(emailReducer,{value:"",isValid:false});  //using reducer to manage two email states.
  const [passwordState,dispatchPassword]= useReducer(passwordReducer,{value:"",isValid:false});   //using reducer to manage two password states.
  const ctx=useContext(AuthContext);     //using useContext react hook for consuming/accessing context value.

  const emailInputRef=useRef();          //using useRef for email & password inputs.
  const paswordInputRef=useRef();

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const {isValid: emailIsValid}= emailState;
  const {isValid: passwordIsValid}= passwordState;

  const emailChangeHandler = (event) => {
    dispatchEmail({type:"userInput", val: event.target.value});

    setFormIsValid(
     event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"userInput", val: event.target.value})

    setFormIsValid(
      event.target.value.trim().length>6 && emailState.isValid 
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"inputBlur"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"inputBlur"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
    {ctx.onLogin(emailState.value, passwordState.value);}
    else if(!emailIsValid){
      emailInputRef.current.activate();
    }
    else{
      paswordInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        ref={emailInputRef}
        id="email" 
        type="email" 
        label="E-Mail" 
        isValid={emailIsValid} 
        value={emailState.value} 
        onChange={emailChangeHandler} 
        onBlur={validateEmailHandler}/>
        <Input 
        ref={paswordInputRef}
        id="password" 
        type="password" 
        label="Password" 
        isValid={passwordIsValid} 
        value={passwordState.value} 
        onChange={passwordChangeHandler} 
        onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} /**disabled={!formIsValid}*/>     
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

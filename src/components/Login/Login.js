import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action) =>{
  if(action.type==="userInput"){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type==="inputBlur"){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value:"",isValid:false};  
}

const passwordReducer=(state,action) =>{
  if(action.type==="userInput"){
    return {value: action.val, isValid: action.val.trim().length>6}
  }
  if(action.type==="inputBlur"){
    return {value: state.value, isValid: state.value.trim().length>6};
  }
  return {value:"",isValid:false};  
}

const Login = (props) => {
  const [emailState,dispatchEmail]= useReducer(emailReducer,{value:"",isValid:false});  //using reducer to manage two email states.
  const [passwordState,dispatchPassword]= useReducer(passwordReducer,{value:"",isValid:false});   //using reducer to manage two password states.

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:"userInput", val: event.target.value})

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
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

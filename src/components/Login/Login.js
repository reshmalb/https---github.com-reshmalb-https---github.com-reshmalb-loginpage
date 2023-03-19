import React, { useState ,useEffect,useReducer} from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';

import Input from '../Input/Input'
const emailReducer=(state,action)=>{
      if(action.type==='USER_INPUT'){
        return {value:action.val, isValid:action.val.includes('@')}

      }
      if(action.type==='INPUT_BLUR'){
        return {value:state.value, isValid:state.value.includes('@')}
        
      }  
  //default or initial value
  return {value:'',isValid:false}

}

const passwordReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.val,isValid:action.val.trim().length>6}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length>6}
  }

  //default
  return{value:'',isValid:null}

}

const Login = (props) => {
 // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [collegeIsValid, setCollegeIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  
  //useReducer for email
  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:null})
//useReducer for password
const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})
const [formIsValid, setFormIsValid] = useState(false);

  //useEffect

  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState

  useEffect(()=>{
    console.log("Check validity");
    const identifier=setTimeout(()=>{
      setFormIsValid(emailIsValid&&passwordIsValid)
         
    },500)
    return(()=>{
      console.log("clean up");
      clearTimeout(identifier);
    })
  },[emailIsValid,passwordIsValid])
  

//handlers
  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    //useReducer
    dispatchEmail({type:'USER_INPUT',val:event.target.value})
    setFormIsValid(
    emailState.isValid&& passwordState.isValid 
      // event.target.value.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>1

    );
  };
  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
     passwordState.isValid && emailState.isValid
      // event.target.value.trim().length > 6 && enteredEmail.includes('@') && enteredCollege.trim().length>1

    );
  };
  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'});
  };
  // const collegeChangeHandler = (event) => {
  //   setEnteredCollege(event.target.value);

  //   setFormIsValid(
  //     event.target.value.trim().length>1 && event.target.value.trim().length > 6 && enteredEmail.includes('@')
  //   );
  // };


  // const validateCollegeHandler = () => {
  //   setCollegeIsValid(enteredCollege.trim().length>1);
  // };
  

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
    // props.onLogin(enteredEmail, enteredPassword,enteredCollege);

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
           label="E-mail"
           id="email"
           type="email"
           valid={emailIsValid}  
           value={emailState.value} 
           onChange={emailChangeHandler}
           onBlur={validateEmailHandler}>
        </Input>
        <Input
            label="Password"
            id="password"
            type="password"
            valid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}

            >
            
        </Input>
      

        {/* <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >

        <label htmlFor="college" >College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
         </div> */}


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

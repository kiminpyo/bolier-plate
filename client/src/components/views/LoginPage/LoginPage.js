import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import {useNavigate} from 'react-router-dom';
import auth from '../../../hoc/auth'

function LoginPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password,setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.target.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // 안해주면 페이지가 리프레쉬된다.

    console.log('Email', Email)
    console.log('Password',Password)

    //state 에 갔다.
    let body ={
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess){
        navigate('/')
      }
      else {
        alert('error')}
    })

    

    
  }

  return (
    <div  style={{display: 'flex', justifyContent: 'center', alignItems:'center'
    ,width: '100%', height: '100vh'}}>
      <form style={{display:'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" valu={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default auth(LoginPage, false)
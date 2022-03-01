import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { registerUser } from '../../../_actions/user_action';
import {useNavigate} from 'react-router-dom';
import auth from '../../../hoc/auth'

function Register() {


  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [Name, setName]= useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value)
  }
  const onNameHandler = (event) =>{
    setName(event.target.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.target.value)
  }

  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.target.value)
  }


  const onSubmitHandler = (event) => {
    event.preventDefault();
    // 안해주면 페이지가 리프레쉬된다.

    console.log('Email', Email)
    console.log('Password',Password)

      if(Password !== ConfirmPassword){
        return alert("비밀번호가 일치하지 않습니다.")
      }
    //state 에 갔다.
    let body ={
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
        alert('축하합니다')
        navigate('/login')
      }
    })

    

    
  }
  return (
    <div  style={{display: 'flex', justifyContent: 'center', alignItems:'center'
    ,width: '100%', height: '100vh'}}>
      <form style={{display:'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        
        <label>Confirm Password</label>
        <input type="password" valu={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  )
}

export default auth(Register, false)
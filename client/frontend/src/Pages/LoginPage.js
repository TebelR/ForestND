import React from 'react'
import '../Styles/LoginPage.css'
import { Link } from 'react-router-dom'
function LoginPage() {
  return (
    <div className='LoginBody'>
     <div className='Login'>
    <div className='loginTitle'>
      <h1>Tac Tree</h1>
    </div>

<div className='loginForm'>
  <form>
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <Link to="/Home"><button type="submit">Login</button></Link>
  </form>
</div> 
<div className='forgotPassword'>
  <Link to="/Home">Forgot Password?</Link>
</div>
     </div>
    </div>
  )
}

export default LoginPage
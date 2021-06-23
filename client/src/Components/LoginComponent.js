import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginComponent(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('') ;
  const {serverError}=props

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    const credentials = { username, password };
    const emailcheck=username.includes("@")
    let valid = true;
    if(username === '' || password === '' || password.length < 6)
        valid = false;
    
    if(valid)
    {
      props.login(credentials);
    }
    if(password.length<=5) setErrorMessage('The length of password should be higher than 5 characters')
    
    if(!emailcheck)  {
      setErrorMessage('Username should be an email address')
    }

   // else setErrorMessage('Entered credentials are not true')


};


return (
  <>
  <div className="loginContainer">
  <div className="loginForm" >
  <Form variant="dark"  >
    <Form.Group controlId='username'>
        <Form.Label className="formtxt">Email address</Form.Label>
        <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} size="lg" />
    </Form.Group>
    <Form.Group controlId='password'>
        <Form.Label className="formtxt">Password</Form.Label>
        <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} size="lg" />
    </Form.Group>
    {errorMessage ?  <Alert variant='danger'>{errorMessage}</Alert> : ''}
    { serverError ?  <Alert variant='danger'>{serverError}</Alert> : ''}
    <Button size="lg" onClick={handleSubmit}>Login</Button>
  </Form>
  </div>
  </div>
  </>
  )
}

export default LoginComponent;

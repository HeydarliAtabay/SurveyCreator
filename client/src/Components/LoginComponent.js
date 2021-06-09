import { Form, Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginComponent(props) {
 
  return (
    <>
    <div className="loginContainer">
    <div className="loginForm" >
    <Form variant="dark"  >
      <Form.Group controlId='username'>
          <Form.Label className="formtxt">Email address</Form.Label>
          <Form.Control type='email'  size="lg" />
      </Form.Group>
      <Form.Group controlId='password'>
          <Form.Label className="formtxt">Password</Form.Label>
          <Form.Control type='password'  size="lg" />
      </Form.Group>
      <Button size="lg" >Login</Button>
    </Form>
    </div>
    </div>
    </>
    )
}

export default  LoginComponent;
import { Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function UserDetails(props) {
  return (
      <div className='userdet'>
      <Col>
        <h5 >{props.greetings} </h5>
      </Col>
      </div>
  );
}

export default UserDetails;
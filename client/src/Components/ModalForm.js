import {React,useState} from 'react'

import {Form, Modal,Button} from 'react-bootstrap';

function ModalForm(props){
   
    const {survey,onClose,onSave}=props

    const [tittle, setTittle] = useState(survey ? survey.tittle : '');

const handleSubmit = (event) => {
    // stop event default and propagation
    event.preventDefault();
    event.stopPropagation(); 

      const newSurvey = Object.assign({}, survey, { tittle, published:0} );

      onSave(newSurvey);
    
  }
    return(
        <div className="cont">
            <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                 <Modal.Title>Add Survey</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
            <Form.Group controlId="form-description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" placeholder="Enter the Title of the survey" value={tittle}
            onChange={(ev) => setTittle(ev.target.value)} required autoFocus />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add a Survey</Button>
        </Modal.Footer>
            
            </Form>
            </Modal>
        </div>
    )
}

export default ModalForm
import React from 'react'

import {Form, Modal,Button} from 'react-bootstrap';

function ModalForm(props){
const {onClose}=props
    return(
        <div className="cont">
            <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                 <Modal.Title>Add Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="form-description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" placeholder="Enter the Title of the survey" required autoFocus />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add a Survey</Button>
        </Modal.Footer>
            </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalForm
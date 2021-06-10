import {React,useState} from 'react'

import {Form, Modal,Button, Row,Col} from 'react-bootstrap';

function ModalFormQuestion(props){
   
    const {question,onClose,onSave}=props

    const [type, setType] = useState(true);
    const [text, setText]=useState(question ? question.description : '')
    const [number, setNumber]=useState(question? question.num : 1)
    const [answer1, setAnswer1]=useState( '')
    const [answer2, setAnswer2]=useState('')
    const [answer3, setAnswer3]=useState('')
    const [answer4, setAnswer4]=useState('')
    const [answer5, setAnswer5]=useState('')
    const [answer6, setAnswer6]=useState('')
    const [answer7, setAnswer7]=useState('')
    const [answer8, setAnswer8]=useState('')
    const [answer9, setAnswer9]=useState('')
    const [answer10, setAnswer10]=useState('')

const handleSubmit = (event) => {
    // stop event default and propagation
    event.preventDefault();
    event.stopPropagation(); 

      const newQuestion = Object.assign({}, question, { description: text, num:0} );

      onSave(newQuestion);
    
  }
    return(
        <div className="cont">
            <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                 <Modal.Title>Add question</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
            <Form.Group controlId="form-description">
            <Form.Label>Text of the question</Form.Label>
            <Form.Control type="text" name="description" placeholder="Enter the question" value={text}
            onChange={(ev) => setText(ev.target.value)} required autoFocus />
            <Form.Control.Feedback type="invalid">
              Please provide a text
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="form-type">
            <Form.Label>Select the type of question</Form.Label>
            <Form.Check custom type="checkbox" label="Open Question" name="open" checked={type}  onChange={(ev) => setType(ev.target.checked)} />
            <Form.Check custom type="checkbox" label="Closed Question" name="close" checked={!type}  onChange={(ev) => setType(ev.target.checked)} />
            </Form.Group>
            { type===false &&
            <Form.Group>
                <Form.Label>Enter the number of answers</Form.Label>
                <Form.Control as="select" value={number} onChange={(ev)=> {
                    setNumber(parseInt(ev.target.value))
                    console.log(number)
                    }}>
                    {
                         [...Array(10),].map((q, index) => {
                            return(<option>{index+1}</option>)})
                    } 
                </Form.Control>
                
            </Form.Group>
            }
            { number && !type &&
                <Form.Group>
                    <Form.Label> Write each answer</Form.Label>
                    {
                       [...Array(number),].map((q, index) => {
                        return(
                            <>
                            <Row>
                            <Col sm={1}> <h6>{index+1}</h6></Col>
                             <Col sm={11}> <Form.Control type="text"  ></Form.Control></Col>
                            </Row>
                            </>
                        )}) 
                    }
                </Form.Group>
                

            }
           
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add a question</Button>
        </Modal.Footer>
            
            </Form>
            </Modal>
        </div>
    )
}

export default ModalFormQuestion
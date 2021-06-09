import React from 'react'
import {ListGroup,Button,Form,Row,Col} from 'react-bootstrap'


function QuestionItem(props){
    const {question} = props

    return(
        <>
        <div className="questionCards">   
     <h4>{question.description}</h4>

     { question.answ1!=='' && question.answ2!=='' && question.answ3!=='' && question.answ4!=='' &&
        <>
        <Form.Check type="checkbox" label={question.answ1}></Form.Check>
        <Form.Check type="checkbox" label={question.answ2}></Form.Check>
        <Form.Check type="checkbox" label={question.answ3}></Form.Check>
        <Form.Check type="checkbox" label={question.answ4}></Form.Check>
       </>   
     }
       { question.answ1!=='' && question.answ2!=='' && question.answ3!=='' && question.answ4==='' &&
        <>
        <Form.Check type="checkbox" label={question.answ1}></Form.Check>
        <Form.Check type="checkbox" label={question.answ2}></Form.Check>
        <Form.Check type="checkbox" label={question.answ3}></Form.Check>
       </>   
     }
     { question.answ1!=='' && question.answ2!=='' && question.answ3==='' && question.answ4==='' &&
        <>
        <Form.Check type="checkbox" label={question.answ1}></Form.Check>
        <Form.Check type="checkbox" label={question.answ2}></Form.Check>
       </>   
     }
     { question.answ1==='' && question.answ2==='' && question.answ3==='' && question.answ4==='' &&
        <>
        <Form.Control size="lg" type="text" placeholder="Write your answer here" />
       </>   
     }
            {/* <Button variant="primary">Go somewhere</Button>   */}
        </div>
        </>
    )
}

function QuestionList(props){
    const {questions} =props
    return(<>
        
        <div className="cont">
        <h3>Please, Write your name and start answering questions for the survey</h3>
        <Row>
        <Col sm={4}><h3>Your name:</h3></Col>
        <Col sm={8}><Form.Control size="lg" type="text" placeholder="Write your name" /></Col>
        </Row>
            <ListGroup as="ul" variant="flush">
            {
                questions.map(q=>{
                    return(
                        <ListGroup.Item as ="li" key={q.id} >
                            <QuestionItem question={q}/>
                            </ListGroup.Item>                    )
                })
            }
            </ListGroup>

       <Button size="lg" variant="primary">Submit the answers</Button>
        
        </div>
        
    </>)
}

export default QuestionList
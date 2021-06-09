import React from 'react'
import {ListGroup,Card,Button,Form} from 'react-bootstrap'


function QuestionItem(props){
    const {question} = props

    return(
        <>
        <div className="survCards">
        <Card> 
            <Card.Header>{question.id}</Card.Header>
            <Card.Body>
            <Card.Text>
     {question.description}
    </Card.Text>
           <Form.Check type="checkbox" label={question.answ1}></Form.Check>
           <Form.Check type="checkbox" label={question.answ2}></Form.Check>
           <Form.Check type="checkbox" label={question.answ3}></Form.Check>
           <Form.Check type="checkbox" label={question.answ4}></Form.Check>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
</Card>  
        </div>
        </>
    )
}

function QuestionList(props){
    const {questions} =props
    return(
        <>
        <div className="cont">
        <h3>Please, Answer the question</h3>
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
       
        
        </div>
      </>  
    )
}

export default QuestionList
import React from 'react'
import {ListGroup,Button,Form,Row,Col} from 'react-bootstrap'


function QuestionItem(props){
    const {question} = props

       
  

    return(
        <>
        <div className="questionCards">   
        <h1>{question.num}</h1>
        {/* {mandatory ? <h1>This is mandatory</h1>: <h1>this is optional</h1>} */}
        <h4>{question.description}</h4>
        <h6>min:{question.min} max:{question.max}</h6>
   {question.num!==0 &&
    
       [...Array(question.num),].map((q, index) => {
           let string=`answ${index+1}`
         
           return(
            <>
                <Form.Check id={index + 1} key={index} type="checkbox" label={question[string]}></Form.Check>
           </>
           )} 
        )
    }
     {question.num===0 &&
             <Form.Control size="lg" type="text" placeholder="Write your answer here" />  
 }
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
                    <>
                    <ListGroup.Item as ="li" key={questions.order} >
                    <QuestionItem question={q} />
                    </ListGroup.Item>  
                                   
                    </>
                    )
                })
            }
            </ListGroup>

       <Button size="lg" variant="primary">Submit the answers</Button>
        
        </div>
        
    </>)
}

export default QuestionList
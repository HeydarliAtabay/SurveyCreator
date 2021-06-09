import React from 'react'
import {ListGroup,Button,Form} from 'react-bootstrap'


function QuestionItem(props){
    const {question} = props

    return(
        <>
        <div className="questionCards">   
     <h5>{question.description}</h5>

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
     
            {/* {question.answ1==='' && question.answ2==='' && question.answ3===''   ?
                <>
                 <Form.Control size="lg" type="text" placeholder="Write your answer here" />
 
 </> 
            :
            <>
            <Form.Check type="checkbox" label={question.answ1}></Form.Check>
            <Form.Check type="checkbox" label={question.answ2}></Form.Check>
            <Form.Check type="checkbox" label={question.answ3}></Form.Check>
            <Form.Check type="checkbox" label={question.answ4}></Form.Check>
           </> 
            }
            {!question.answ1==='' && !question.answ2==='' && question.answ3===''   ?
                <>
                    <Form.Check type="checkbox" label={question.answ1}></Form.Check>
                    <Form.Check type="checkbox" label={question.answ2}></Form.Check>
 </> 
            :
            <>
            <Form.Check type="checkbox" label={question.answ1}></Form.Check>
            <Form.Check type="checkbox" label={question.answ2}></Form.Check>
            <Form.Check type="checkbox" label={question.answ3}></Form.Check>
            <Form.Check type="checkbox" label={question.answ4}></Form.Check>
           </> 
            } */}
          
            <Button variant="primary">Go somewhere</Button>
        
        </div>
        </>
    )
}

function QuestionList(props){
    const {questions} =props
    return(
        <>
        <div className="cont">
        <h3>Please, Answer questions for finishing the survey</h3>
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
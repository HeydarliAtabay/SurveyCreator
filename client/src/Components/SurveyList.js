import {React} from 'react'
import {ListGroup,Card,Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

function SurveyItem(props){
    const {survey, onDelete, onSelect, index, onAnswer} = props
    
    return(
        <>
        <div className="survCards">
        <Card bg="dark" text="light" id={index+1}> 
            <Card.Header>Survey</Card.Header>
            <Card.Body>
            <Card.Title>{survey.title}</Card.Title>
            <Link
            onClick={(event) => onSelect(survey.id)}
          className="btn btn-primary"
          to={{
            pathname: "/questions",
          }}
        >
          Start the Survey
        </Link>
       { survey.numRespond!==0 &&
        <Link
            onClick={(event) => onAnswer(survey.id, 5)}
          className="btn btn-success"
          to={{
            pathname: "/answers",
          }}
        >
          Check answers
        </Link>
       } 
            {survey.published===0 && <Button variant="warning" onClick={(event) =>  window.location.href='/questions'}>Modify the Survey</Button>}
            <Button variant="danger" onClick={onDelete}>Delete the Survey</Button>
            
            <h5>number of responders for this survey is : {survey.numRespond}</h5>
        </Card.Body>
</Card>  
        </div>
        </>
    )
}

function SurveyList(props){
    const {surveys, onDelete, onSelect, onAnswer} =props
    return(
        <>
        {/* <div className="addbtn"><Button variant="success" size="lg">Add a Survey</Button></div> */}
        <div className="cont">
        <h3>Please, Select the survey</h3>
            <ListGroup as="ul" variant="flush" key={surveys.id}>
            {
                surveys.map((s,index)=>{
                    return(
                        <ListGroup.Item as ="li" key={index} >
                            <SurveyItem  survey={s}    onDelete={() => onDelete(s)} onSelect={()=>onSelect(s.id)} index={index} onAnswer={()=>onAnswer(s.id,5)}/>
                            </ListGroup.Item>                    )
                })
            }
            </ListGroup>
       
        
        </div>
      </>  
    )
}

export default SurveyList
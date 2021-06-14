import {React, useState} from 'react'
import {ListGroup,Card,Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

function SurveyItem(props){
    const {survey,numberOfResponders, onDelete, onSelect} = props
    return(
        <>
        <div className="survCards">
        <Card bg="dark" text="light"> 
            <Card.Header>Survey</Card.Header>
            <Card.Body>
            <Card.Title>{survey.title}</Card.Title>
            
            <Button variant="primary" onClick={(event) => { 
                console.log(survey.id)
                window.location.href='/questions'
                 onSelect(survey.id);
                
            }

            } >Start the Survey </Button>
            <Link
            onClick={(event) => onSelect(survey.id)}
          className="btn btn-primary"
          to={{
            pathname: "/questions"
          }}
        >
          Register
        </Link>
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
    const {surveys, numberOfResponders, onDelete, onSelect} =props
    return(
        <>
        {/* <div className="addbtn"><Button variant="success" size="lg">Add a Survey</Button></div> */}
        <div className="cont">
        <h3>Please, Select the survey</h3>
            <ListGroup as="ul" variant="flush">
            {
                surveys.map(s=>{
                    return(
                        <ListGroup.Item as ="li" key={s.id} >
                            <SurveyItem survey={s}  numberOfResponders={numberOfResponders}  onDelete={() => onDelete(s)} onSelect={()=>onSelect(s.id)}/>
                            </ListGroup.Item>                    )
                })
            }
            </ListGroup>
       
        
        </div>
      </>  
    )
}

export default SurveyList
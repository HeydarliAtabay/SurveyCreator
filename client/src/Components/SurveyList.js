import React from 'react'
import {ListGroup,Card,Button} from 'react-bootstrap'


function SurveyItem(props){
    const {survey} = props

    return(
        <>
        <div className="survCards">
        <Card bg="dark" text="light"> 
            <Card.Header>Survey</Card.Header>
            <Card.Body>
            <Card.Title>{survey.tittle}</Card.Title>
            
            <Button variant="primary" >Go somewhere</Button>
        </Card.Body>
</Card>  
        </div>
        </>
    )
}

function SurveyList(props){
    const {surveys} =props
    return(
        <>
        <div className="cont">
        <h3>Please, Select the survey</h3>
            <ListGroup as="ul" variant="flush">
            {
                surveys.map(s=>{
                    return(
                        <ListGroup.Item as ="li" key={s.id} >
                            <SurveyItem survey={s}/>
                            </ListGroup.Item>                    )
                })
            }
            </ListGroup>
       
        
        </div>
      </>  
    )
}

export default SurveyList
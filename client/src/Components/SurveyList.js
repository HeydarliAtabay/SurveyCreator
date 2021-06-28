import {React} from 'react'
import {ListGroup,Card,Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";

function SurveyItem(props){
  const history=useHistory()
    const {survey, onDelete, onSelect, index, onAnswer, submission, logged} = props
    let submissionids=[]
    for(let i=0;i<submission.length;i++){
      if(submission[i].survey_id===survey.id) {
        submissionids.push(submission[i].id) 
      }
    }
    const publishedStyle = {color: "#ADFE00" }
  const notPublishedStyle={color:"red"}
    
    return(
        <>
        <div className="survCards">
        <Card bg="dark" text="light" id={index+1}> 
            <Card.Header>Survey</Card.Header>
           
            <Card.Body>
            <Card.Title>{survey.title}</Card.Title>
            
           {(logged  && survey.published===0) &&
           <Button
           onClick={(event) => {
            onSelect(survey.id)
            history.push("/questions")
           }}
           className="btn btn-primary"
          >
            Modify the survey
          </Button>
           }
              
          
          {!logged  &&
          <Button
          onClick={(event) => {
           onSelect(survey.id)
           history.push("/questions" )
          }}
          className="btn btn-primary"
         >
           Start the survey
         </Button>

          }
           
                    
            
       { (survey.numRespond!==0 && logged) &&

       <Button
       onClick={(event) => {
        onAnswer(survey.id, submissionids[0])
        history.push('/answers')
       }}
          className="btn btn-success"
       >
         Check Responses
       </Button>
       } 
           
            {logged && <Button variant="danger" onClick={onDelete}>Delete the Survey</Button> }
            
         {logged &&  <h5>number of responders for this survey is : {survey.numRespond}</h5> }  
         {(logged && survey.published===1) &&  <h6 style={publishedStyle}>Published</h6> }  
         {(logged && survey.published===0) &&  <h6 style={notPublishedStyle}>Not published</h6> } 
        </Card.Body>
</Card>  
        </div>
        </>
    )
}

function SurveyList(props){
    const {surveys, onDelete, onSelect, onAnswer, submission, logged, loading} =props
    return(
        <>
        {/* <div className="addbtn"><Button variant="success" size="lg">Add a Survey</Button></div> */}
        <div className="cont">
       {logged ?  <h3>Please, Select the survey for modifying or checking the responses</h3>: <h3> Please, select survey for responding</h3> }
       {loading ? <h3> Please wait, data is loading</h3>:
       <>
         <ListGroup as="ul" variant="flush" key={surveys.id}>
         {
             surveys.map((s,index)=>{
                 return(
                     <ListGroup.Item as ="li" key={index} >
                         <SurveyItem  logged ={logged} survey={s} submission={submission}   onDelete={() => onDelete(s)} onSelect={()=>onSelect(s.id)} index={index} onAnswer={onAnswer}/>
                         </ListGroup.Item>                    )
             })
         }
         </ListGroup>
         </>
        }

           
       
        
        </div>
      </>  
    )
}

export default SurveyList
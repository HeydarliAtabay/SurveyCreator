import { React, useState} from "react";
import { ListGroup, Button, Form, Row, Col, Container} from "react-bootstrap";
import {
  BookmarkStar,
  Check2All,
  ArrowLeftSquare,
  ArrowRightSquare,
} from "react-bootstrap-icons";


function QuestionItem(props) {
  const { question, index } = props;
  const [checked, setChecked]=useState([false,false,false,false,false,false,false,false,false,false])
  let min=question.min
  let max=question.max
  let count=0
  const handleChecked = (number) => {
    // if the task has an id it is an update

    for (let i=0;i<checked.length;i++){
      if(checked[i]===true) count++
    }
    console.log(count)
  }

  return (
    <>
        
    <Container fluid>
      <div className="questionCards">
        {(index+1)!==0 && <h6>{index+1}.</h6>}
        {question.min === 1 && (
          
          <>
            <div className="mandatory">
              <BookmarkStar size={36} />
            </div>
          </>
        )}
        {question.max === 2 && (
          <>
            <div className="multiple">
              <Check2All size={36} />
            </div>
          </>
        )}
        {/* {mandatory ? <h1>This is mandatory</h1>: <h1>this is optional</h1>} */}
        <h4>{question.question}</h4>
        <Row>
          <Col sm={10}>
            <Row><h6>min:{min}</h6><h6>max:{max}</h6></Row>
            {question.num !== 0 && (
              <Form.Group>
                {[...Array(question.num)].map((q, index1) => {
                  // let string = `answ${index + 1}`;
                  let string = [
                    "one",
                    "two",
                    "three",
                    "four",
                    "five",
                    "six",
                    "seven",
                    "eight",
                    "nine",
                    "ten",
                  ];

                  return (
                    <>
                    {(question.max===1 && question.min===1) ? 
                    <Form.Check className="questionText"
                    id={index1}
                    name="radio"
                    key={`question-${index} check-${index1}`}
                    type="radio"
                    size="lg"
                    label ={question[string[index1]]}
                  ></Form.Check>
                :  
                   <Form.Check className="questionText"
                   id={index1}
                   
                   key={index1}
                   type="checkbox"
                  size="lg"
                  label ={question[string[index1]]}
                  checked={checked[index1]}
                  onChange={(ev) => {
                  handleChecked()
                  }}
              ></Form.Check>
                } 
                    
                     
                      {/* {  this part will be added after authentication part
                        <Form.Check
                        disabled
                          id={index + 1}
                          key={index}
                          type="checkbox"
                          label={question[string[index]]}
                        ></Form.Check>
                      } */}
                    </>
                  );
                })}
              </Form.Group>
            )}
            
            {question.num === 0 && (
              <>
                <Form.Control
                  key={index}
                  size="lg"
                  type="text"
                  placeholder="Write your answer here"
                  maxLength={200}
                  as="textarea"
                  rows={3}
                />
                {question.min === 1 && (
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please provide your answer
                  </Form.Control.Feedback>
                )}
              </>
            )}
          </Col>
          
        </Row>
        
      </div>
      </Container>
    </>
  );
}



function AnswerList(props) {
  let number=0
  const { questions, onDelete, onUp, onDown,responder} = props;



  let last=questions.length
  let surveyId=0
  last!==0?surveyId=questions[0].survey_id: surveyId=0
  return (
    <>
     <div className="navigationRow">
         <Form.Group>
       <Row >
       <Button variant="link" className="shadow-none1">
              <ArrowLeftSquare size={32} />
            </Button>
            <h3>Answers of {responder}</h3>
            <Button variant="link" className="shadow-none1">
              <ArrowRightSquare size={32} />
            </Button>   
           </Row> 
           <Form.Text className="text-muted"> For navigating between answers, press arrows</Form.Text>
                
           </Form.Group>
    </div> 
      <div className="cont">
          
      
        <Form >
        <Form.Group>
        <ListGroup as="ul" variant="flush" key={questions.id}>
          {questions.map((q,index) => {
            number++
            return (
              <>
              
                <ListGroup.Item as="li" key={index}>
                  <QuestionItem
                   
                    question={q}
                    onDelete={() => onDelete(q)}
                    onUp={() => onUp(q)}
                    onDown={() => onDown(q)}
                    index={index}
                    last={last}
                  />
                </ListGroup.Item>
              </>
            );
          })}
        </ListGroup>
        </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default AnswerList;

import { React, useState} from "react";
import { ListGroup, Button, Form, Row, Col, Container} from "react-bootstrap";
import {
  ArrowLeftSquare,
  ArrowRightSquare,
} from "react-bootstrap-icons";


function QuestionItem(props) {
  const { answer, question, index } = props;
  let selectedAnswers=[] // empty array for adding selected answers
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
  let count=0
  // checking which answer has value of true, and adding them to the defined array
  for(let i=0;i< string.length-1;i++){
    if(answer[string[i]]===1){
      count++
      selectedAnswers.push(string[i]) 
    }
  }
  const number=count
  return (
    <>
        
    <Container fluid>
      <div className="questionCards">
        {(index+1)!==0 && <h4>{index+1}. {question.question}</h4>}
        <Row>
          <Col sm={10}>
            {answer.answer !== "" && (
              <Form.Group>
                {[...Array(number)].map((q, index1) => {
                  return (
                    <>
                 {question.questiontype===1 &&
                  <Form.Check className="questionText"
                  id={index1}
                  disabled
                  key={'Option: '+index1}
                  checked={true}
                  type="checkbox"
                 size="lg"
                 label={question[selectedAnswers[index1]]}
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
            {(question.num === 0 && question.questiontype===0)&& (
              <>
                <Form.Control
                disabled
                  key={'Answer'+index}
                  size="lg"
                  type="text"
                  maxLength={200}
                  placeholder="User doesn't responded to this question"
                  as="textarea"
                  value={answer.answer? answer.answer: ''}
                  rows={1}
                />
                {/* <h4>{answer.answer}</h4> */}
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
  const { questions, answers, onRight, onLeft, submissions, loading} = props;
  const [subindex, setSubIndex]=useState(submissions?submissions[0].id:1)
  let last=answers.length
 let lastId=submissions[submissions.length-1].id  // last id of selected submissions, for avoiding navigation to undefined value
 // Increasing the id of selected submission by one
  const handleRight =()=>{
    let a=subindex 
    if(a<lastId){ 
      a++
      setSubIndex(a)
    }
    
  }
// Decreasing the id of selected submission by one
  const handleLeft =()=>{
    let b=subindex
      b--
      setSubIndex(b)
  }
  let questionids=[] //empty array for storing ids of answered questions
  let questionss=[] // empty array for storing answered questions 
  for (let i=0;i<answers.length;i++){
    questionids.push(answers[i].question_id) // adding ids of answered questions to an array
  }
  for (let i=0;i<questionids.length;i++){
    for(let j=0;j<questions.length;j++){
      if(questionids[i]===questions[j].id)  questionss.push(questions[j]) // adding answered questions to the array
    } 
  }
  return (
    <>
     <div className="navigationRow">
         <Form.Group>
       <Row >
         <Col sm={2}>
         {(submissions[subindex-1].id !==submissions[0].id)?  //if submission ID is not equal to the last id button is active, otherwise disabled
         <Button variant="link" className="shadow-none1"
         onClick={()=>{
          onLeft(submissions[subindex-2].id)
          handleLeft()
        }
        }
         >
         <ArrowLeftSquare size={32}/>
       </Button>
       :
       <Button disabled variant="link" className="shadow-none1" >
         <ArrowLeftSquare size={32}/>
       </Button>
        }
        </Col> 
        <Col sm={8}><h3>Answers of {submissions[subindex-1].responder}</h3></Col>
         <Col sm={2}>
           {(submissions[subindex-1].id !==submissions[submissions.length-1].id)? //if submission ID is not equal to the first id button is active, otherwise disabled
            <Button variant="link" className="shadow-none1"
            onClick={()=>{
              onRight(submissions[subindex].id)
              handleRight()
            }}
            > <ArrowRightSquare size={32}  />
            </Button>
:
              <Button disabled variant="link" className="shadow-none1">
              <ArrowRightSquare size={32} 
            />
          </Button>
}   </Col>
           </Row> 
           <Form.Text className="text-muted"> For navigating between answers, press arrows</Form.Text>  
           </Form.Group>
    </div> 
      <div className="cont1">
        <Form >
        {loading ?<h3>Please wait for answers to be loaded</h3> :
        <Form.Group>
        <ListGroup as="ul" variant="flush" key={'List of questions:'+ answers.id}>

          {answers.map((q,index) => {
            return (
              <>
                <ListGroup.Item as="li" key={'Question:'+ index}>
                  <QuestionItem
                    question={questionss[index]}
                    answer={q}
                    index={index}
                    last={last}
                  />
                </ListGroup.Item>
              </>
            );
          })}
        </ListGroup>
        </Form.Group>
}
        </Form>
      </div>
    </>
  );
}

export default AnswerList;

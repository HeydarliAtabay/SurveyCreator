import { React, useState} from "react";
import { ListGroup, Button, Form, Row, Col, Container} from "react-bootstrap";
import {
  ArrowLeftSquare,
  ArrowRightSquare,
} from "react-bootstrap-icons";


function QuestionItem(props) {
  const { answer, question, index, selectedAnswers } = props;
  // let min=question.min
  // let max=question.max
 
  
  return (
    <>
        
    <Container fluid>
      <div className="questionCards">
        {(index+1)!==0 && <h6>{index+1}.</h6>}
        <h4>{question.question}</h4>
        <Row>
          <Col sm={10}>
            {answer.answer !== "" && (
              <Form.Group>
                {[...Array(selectedAnswers.length)].map((q, index1) => {
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
                 {question.questiontype===1 &&
                  <Form.Check className="questionText"
                  id={index1}
                  disabled
                  key={index1}
                  checked={true}
                  type="checkbox"
                 size="lg"
                // label ={question[string[index1]]}
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
                  key={index}
                  size="lg"
                  type="text"
                  placeholder="Write your answer here"
                  maxLength={200}
                  as="textarea"
                  defaultValue={answer.answer}
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
  const { questions, answers, onRight, onLeft, submissions} = props;
  const [subindex, setSubIndex]=useState(submissions?submissions[0].id:1)

  let selectedAnswers=[]
  let question=[]
  let last=answers.length
 


 let lastId=submissions[submissions.length-1].id
 let firstId=submissions[0].id
 console.log("First id", firstId)
  // function handleRight(index){
  //   let a =index-1
  //   if(a < parseInt(lastId)){
  //     a++
  //     setSubIndex(submissions[a].id)
  //    //console.log(submissions[a].id)
  //   } 
    
  // }

  const handleRight =()=>{
    let a=subindex
    if(a<lastId){
      a++
      setSubIndex(a)
      console.log(a)
    }
    
  }

  const handleLeft =()=>{
    let b=subindex
    
      b--
      setSubIndex(b)
      console.log(b)
    
    
  }
  let number=0
  return (
    <>
     <div className="navigationRow">
         <Form.Group>
       <Row >
         {(submissions[subindex-1].id !==submissions[0].id)? 
         <Button variant="link" className="shadow-none1" >
         <ArrowLeftSquare size={32}
         onClick={()=>{
           onLeft(submissions[subindex-2].id)
           handleLeft()
         }
         }
         />
         

       </Button>
       :
       <Button disabled variant="link" className="shadow-none1" >
         <ArrowLeftSquare size={32}
         
         />
         

       </Button>
        }
       
            <h3>Answers of {submissions[subindex-1].responder}</h3>
           
           {(submissions[subindex-1].id !==submissions[submissions.length-1].id)? 
            <Button variant="link" className="shadow-none1">
              
                <ArrowRightSquare size={32} 
              onClick={()=>{
                onRight(submissions[subindex].id)
                handleRight()
              }
              }
              />
      
            </Button>
:
              <Button disabled variant="link" className="shadow-none1">
              <ArrowRightSquare size={32} 
            />
    
          </Button>
}   
           </Row> 
           <Form.Text className="text-muted"> For navigating between answers, press arrows</Form.Text>
                
           </Form.Group>
    </div> 
      <div className="cont1">
          
      
        <Form >
        <Form.Group>
        <ListGroup as="ul" variant="flush" key={answers.id}>

          {answers.map((q,index) => {
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
            number++
            for(let i=0;i<questions.length;i++){
              if(answers[index].question_id===questions[i].id)question=questions[i]
            }
            for(let i=0;i<9;i++){
              if(answers[index][string[i]]===1) selectedAnswers.push(string[i])
            }
            
           
            return (
              <>
              
                <ListGroup.Item as="li" key={index}>
                  <QuestionItem
                    selectedAnswers={selectedAnswers}
                    question={question}
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
        </Form>
      </div>
    </>
  );
}

export default AnswerList;

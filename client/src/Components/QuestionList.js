import { React,} from "react";
import { ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import {
  BookmarkStar,
  Check2All,
  Trash,
  ArrowUpSquare,
  ArrowDownSquare,
} from "react-bootstrap-icons";



function QuestionItem(props) {
  const { question, onDelete, onUp, onDown, index,last } = props;
  
  return (
    <>
    
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
            {question.num !== 0 && (
              <Form.Group>
                {[...Array(question.num)].map((q, index) => {
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
                      <Form.Check className="questionText"
                        id={index + 1}
                        key={index}
                        type="checkbox"
                        size="lg"
                        label ={question[string[index]]}
                      ></Form.Check>
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
          <Col>
            <QuestionRowControl
            index={index}
              onDelete={onDelete}
              onUp={onUp}
              onDown={onDown}
              last={last}
            />
          </Col>
        </Row>
        
      </div>
    </>
  );
}

function QuestionRowControl(props) {
  const { onDelete, onUp, onDown, index, last } = props;
  return (
    <>
      <div className="flex-fill m-auto">
        <Row>
          <Col>
            <Button variant="link" className="shadow-none" onClick={onDelete}>
              <Trash size={24} />
            </Button>
          </Col>
          <Col>
           {index !==0 && <Button variant="link" className="shadow-none" onClick={onUp}>
              <ArrowUpSquare size={32} />
            </Button> } 
            {index ===0 && <Button  disabled variant="link" className="shadow-none" onClick={onUp}>
              <ArrowUpSquare size={32} />
            </Button> } 
          {(index+1)!==last &&<Button variant="link" className="shadow-none" onClick={onDown}>
              <ArrowDownSquare size={32} />
            </Button>  }
            {(index+1)===last &&<Button  disabled variant="link" className="shadow-none" onClick={onDown}>
              <ArrowDownSquare size={32} />
            </Button>  }
          </Col>
        </Row>
      </div>
    </>
  );
}

function QuestionList(props) {
  
  let number=0
  const { questions, onDelete, onUp, onDown, onPublish} = props;
  let last=questions.length
  let surveyId=0
  last!==0?surveyId=questions[0].survey_id: surveyId=0
  console.log(surveyId)
  return (
    <>
      <div className="cont">
        <h3>
          Please, Write your name and start answering questions for the survey
        </h3>
        <Row>
          <Col sm={4}>
            <h3>Your name:</h3>
          </Col>
          <Col sm={8}>
            <Form.Control size="lg" type="text" placeholder="Write your name" />
          </Col>
        </Row>
        <ListGroup as="ul" variant="flush">
          {questions.map((q,index) => {
            number++
            return (
              <>
              
                <ListGroup.Item as="li" key={questions.id}>
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
{number===0? <h4>Number of questions is {number}. You should have at least one question for publishing the survey</h4>
: <h6>The number of questions is {number}. It is enough for publishing. Good Luck</h6>
}
     
        <Button size="lg" variant="primary">
          Submit the answers
        </Button>
        { number!==0 &&
          <Button size="lg" variant="success" onClick={()=>onPublish(surveyId)}>
          Publish the survey
          </Button>
        }
        
      </div>
    </>
  );
}

export default QuestionList;

import { React, useState} from "react";
import { ListGroup, Button, Form, Row, Col, Container} from "react-bootstrap";
import {
  BookmarkStar,
  Check2All,
  Trash,
  ArrowUpSquare,
  ArrowDownSquare,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";


function QuestionItem(props) {
  const { question, onDelete, onUp, onDown, index,last } = props;
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
      </Container>
    </>
  );
}

function QuestionRowControl(props) {
  const { onDelete, onUp, onDown, index, last } = props;
  
  return (
    <>
    <Container fluid>
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
      </Container>
    </>
  );
}

function QuestionList(props) {
  let number=0
  const { questions, onDelete, onUp, onDown, onPublish} = props;
  const [name, setName]=useState('')

  const [validated, setValidated] = useState(false);


  const handleSubmit = (event) => {
    // stop event default and propagation
    event.preventDefault();
    event.stopPropagation(); 

    const form = event.currentTarget; 

    // check if form is valid using HTML constraints
    if (!form.checkValidity()) { 
      setValidated(true); // enables bootstrap validation error report
    }
      // we must re-compose the task object from its separated fields
      // deadline propery must be created from the form date and time fields
      // id must be created if already present (edit) not if the task is new
     
    else  console.log("Everything is fine")
  }

  let last=questions.length
  let surveyId=0
  last!==0?surveyId=questions[0].survey_id: surveyId=0
  return (
    <>
      <div className="cont">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3>
          Please, Write your name and start answering questions for the survey
        </h3>
        <Form.Group controlId="validationUsername">
        <Row>
          <Col sm={4}>
            <h3>Your name:</h3>
          </Col>
          <Col sm={8}>
            <Form.Control hasValidation size="lg" type="text" placeholder="Write your name"   value={name}
                onChange={(ev) => setName(ev.target.value)}
                required/>
                <Form.Text className="text-muted"> You don't have to write your exact name, any username is accepted</Form.Text>
                 
          </Col>
          
        </Row>
        </Form.Group>
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
{number===0? <h4>Number of questions is {number}. You should have at least one question for publishing the survey</h4>
: <h6>The number of questions is {number}. It is enough for publishing. Good Luck</h6>
}
     
       {number!==0 &&
       <Button  variant="success" type="submit">
       Submit the answers
     </Button>
       } 
        { number!==0 &&
          <Link
          variant="primary"
          onClick={() => onPublish(surveyId)}
        className="btn btn-primary"
        to={{
          pathname: "/surveys"

        }}
      >
        Publish the survey
      </Link>
          // <Button size="lg" variant="success" onClick={()=>onPublish(surveyId)}>
          // Publish the survey
          // </Button>
        }
        </Form>
      </div>
    </>
  );
}

export default QuestionList;

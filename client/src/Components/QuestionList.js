import { React } from "react";
import { ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import { BookmarkStar, Check2All, Trash, ArrowUpSquare, ArrowDownSquare} from "react-bootstrap-icons";

function QuestionItem(props) {
  const { question, onDelete, onUp, onDown } = props;

  return (
    <>
      <div className="questionCards">
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
        <h1>{question.num}</h1>
        {/* {mandatory ? <h1>This is mandatory</h1>: <h1>this is optional</h1>} */}
        <h4>{question.description}</h4>
        <Row>
          <Col sm={10}>
            {question.num !== 0 && (
              <Form.Group>
                {[...Array(question.num)].map((q, index) => {
                  let string = `answ${index + 1}`;

                  return (
                    <>
                      <Form.Check
                        id={index + 1}
                        key={index}
                        type="checkbox"
                        label={question[string]}
                      ></Form.Check>
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
            <QuestionRowControl onDelete={onDelete} onUp={onUp} onDown={onDown} />
          </Col>
        </Row>
      </div>
    </>
  );
}

function QuestionRowControl(props) {
  const { onDelete, onUp, onDown } = props;
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
        <Button variant="link" className="shadow-none" onClick={onUp}>
          <ArrowUpSquare size={32} />
        </Button>
        <Button variant="link" className="shadow-none" onClick={onDown}>
          <ArrowDownSquare size={32} />
        </Button>
        </Col> 
       
        </Row>
      </div>
    </>
  );
}

function QuestionList(props) {
  const { questions, onDelete, onUp, onDown } = props;
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
          {questions.map((q) => {
            return (
              <>
                <ListGroup.Item as="li" key={questions.id}>
                  <QuestionItem question={q} onDelete={() => onDelete(q)} onUp={() => onUp(q)} onDown={() => onDown(q)}  />
                </ListGroup.Item>
              </>
            );
          })}
        </ListGroup>

        <Button size="lg" variant="primary">
          Submit the answers
        </Button>
      </div>
    </>
  );
}

export default QuestionList;

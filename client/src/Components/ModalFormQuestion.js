import { React, useState } from "react";

import { Form, Modal, Button, Row, Col } from "react-bootstrap";

function ModalFormQuestion(props) {
  const { question, onClose, onSave } = props;

  const [type, setType] = useState(true);
  const [text, setText] = useState(question ? question.description : "");
  const [number, setNumber] = useState(question ? question.num : 2);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [answer5, setAnswer5] = useState("");
  const [answer6, setAnswer6] = useState("");
  const [answer7, setAnswer7] = useState("");
  const [answer8, setAnswer8] = useState("");
  const [answer9, setAnswer9] = useState("");
  const [answer10, setAnswer10] = useState("");
  const [optional, setOptional] = useState(true);
  const [single, setSingle] = useState(true);

  const handleSubmit = (event) => {
    // stop event default and propagation
    event.preventDefault();
    event.stopPropagation();
    const emptyString=""
    if (type === true) {
      const newQuestion = Object.assign({}, question, {
        question: text,
        questiontype: 0,
        num: 0,
        one: emptyString,
        two: emptyString,
        three:emptyString,
        four: emptyString,
        five: emptyString,
        six: emptyString,
        seven: emptyString,
        eight: emptyString,
        nine: emptyString,
        ten: emptyString, 
        min: optional,
        max: 1,
      });
      onSave(newQuestion);
    } else {
      const newQuestion = Object.assign({}, question, {
        question: text,
        questiontype: 1,
        one: answer1,
        two: answer2,
        three: answer3,
        four: answer4,
        five: answer5,
        six: answer6,
        seven: answer7,
        eight: answer8,
        nine: answer9,
        ten: answer10,
        min: optional ? 0 : 1,
        max: single ? 1 : 2,
        num: number,
      });
      onSave(newQuestion);
    }
  };
  return (
    <div className="cont">
      <Modal show onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add question</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="form-description">
              <Form.Label>Text of the question</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter the question"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                required
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Please provide a text
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="form-type">
              <Form.Label>Select the type of question</Form.Label>
              <Form.Check
                custom
                type="checkbox"
                label="Open Question"
                name="open"
                checked={type}
                onChange={(ev) => setType(ev.target.checked)}
              />
              <Form.Check
                custom
                type="checkbox"
                label="Closed Question"
                name="close"
                checked={!type}
                onChange={(ev) => setType(ev.target.checked)}
              />
            </Form.Group>
            {type === false && (
              <Form.Group>
                <Form.Label>Enter the number of answers</Form.Label>
                <Form.Control
                  as="select"
                  value={number}
                  onChange={(ev) => {
                    setNumber(parseInt(ev.target.value));
                    console.log(number);
                  }}
                >
                  {[...Array(9)].map((q, index) => {
                    return <option>{index + 2}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            )}
            {number && !type && (
              <Form.Group>
                <Form.Label> Write each answer</Form.Label>
                {[...Array(number)].map((q, index) => {
                  let states = [
                    answer1,
                    answer2,
                    answer3,
                    answer4,
                    answer5,
                    answer6,
                    answer7,
                    answer8,
                    answer9,
                    answer10,
                  ];
                  let setters = [
                    setAnswer1,
                    setAnswer2,
                    setAnswer3,
                    setAnswer4,
                    setAnswer5,
                    setAnswer6,
                    setAnswer7,
                    setAnswer8,
                    setAnswer9,
                    setAnswer10,
                  ];
                  return (
                    <>
                      <Row>
                        <Col sm={1}>
                          {" "}
                          <h6>{index + 1}</h6>
                        </Col>
                        <Col sm={11}>
                          {" "}
                          <Form.Control
                            type="text"
                            name="answer"
                            placeholder="Enter the text of possible answer"
                            value={states[index]}
                            onChange={(ev) => setters[index](ev.target.value)}
                            required
                            autoFocus
                          />
                        </Col>
                      </Row>
                    </>
                  );
                })}
              </Form.Group>
            )}
            
              <>
                <Form.Group controlId="form-optional">
                  <Form.Label>
                    Define the specifications of the question
                  </Form.Label>

                  <Col>
                    <Form.Check
                      custom
                      type="checkbox"
                      label="Optional"
                      name="opt"
                      checked={optional}
                      onChange={(ev) => setOptional(ev.target.checked)}
                    />
                    <Form.Check
                      custom
                      type="checkbox"
                      label="Mandatory"
                      name="mand"
                      checked={!optional}
                      onChange={(ev) => setOptional(ev.target.checked)}
                    />
                  </Col>
                </Form.Group>
                </>
               
                {number && !type &&(
                <>
                <Form.Group controlId="form-single">
                  <Col>
                    <Form.Check
                      custom
                      type="checkbox"
                      label="Single-Choice"
                      name="sin"
                      checked={single}
                      onChange={(ev) => setSingle(ev.target.checked)}
                    />
                    <Form.Check
                      custom
                      type="checkbox"
                      label="Multiple-Choice"
                      name="mult"
                      checked={!single}
                      onChange={(ev) => setSingle(ev.target.checked)}
                    />
                  </Col>
                </Form.Group>
                
              </>
                )} 
  </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add a question
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalFormQuestion;

import { React, useState, useEffect} from "react";
import { ListGroup, Button, Form, Row, Col, Container} from "react-bootstrap";
import {
  BookmarkStar,
  Trash,
  ArrowUpSquare,
  ArrowDownSquare,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import API from '../API'

let abc=[] // array for storing question ids, which then will be used for submitting the answers

function QuestionItem(props) {
  const { question, onDelete, onUp, onDown, index,last, setAnswers, survey, submission, numberOfQuestions, logged, newCheck, setNewCheck, openCheck} = props;
  const [answered, setAnswered]=useState([false,false,false,false,false,false,false,false,false,false])
  const [openQAnswer, setOpenQAnswer]=useState('')
  const [message, setMessage]=useState({
    text: '',
    type: 'yes',
  })
  const [count, setCount] = useState(0)
  const [errArr, setErrArr]=useState(false)
  const [addEmpty, setAddEmpty]=useState(false)
  const [saveOpen, setSaveOpen]=useState(false)
  let newSubId=(submission[submission.length-1].id)+1 // new id of the new submission
 
  console.log('open check is '+ openCheck)


  useEffect(() => {
    if(openCheck){
     setSaveOpen(true)
     const newAnswer=Object.assign({},  { answer: openQAnswer  })
    API.updateOpenAnswers(newAnswer, question.id ,newSubId)
    .then(()=>{
    }).catch(err=>(err))
     console.log("save open state was changed")
      }
    
    }, [openCheck])
  // styles for different message types
  const okayStyle = {color: "green" }
  const noStyle={color:"red"}
  const id=index

  function changeErrorCheck (value){
    // if(value===true){
    //   let items=[...newCheck]
    //   console.log('items are '+ items)
    //   let item = items[id]
    //   console.log('item: '+ item)
    //   items[id]=true
    //   setError(true)
    //   setNewCheck(items)
    //   setMessage({text:`You can submit minimum ${question.min} and maximum ${question.max} answers`, type:'no'})  
    // }
    // else{
    //   let items=[...newCheck]
    //   console.log('items are '+ items)
    //   let item = items[id]
    //   console.log('item: '+ item)
    //   items[id]=false
    //   setError(false)
    //   setNewCheck(items)
    //   setMessage({text:'All specifications are done', type:'okay'})
    // }
    
   }


  let num=count // counter for counting the number of selected answers
  // function for adding empty answers, which will be updated after
  async function addEmptyAnswers(question1){

    if(!addEmpty){
      try{
        await API.deleteAnswer(question.id, newSubId).then((err)=>{}) // deleting previously added empty answer to this question if it i not submitted
        API.addEmptyAnswers(question1,newSubId,survey).then((err)=>{setAddEmpty(true)})
          if(abc.length<=numberOfQuestions){
          abc.push(question1.id)
          setAnswers(abc) // sending to the questionList item, the ids of added empty questions
      } 
      }
      catch {

      }
     
 }
}

// function for updating the results of closed questions
 function updateClosedAnswers(answer, questionId){
   API.updateClosedAnswers(answer, questionId ,newSubId)
  .then(()=>{
  }).catch(err=>(err))
}


let control=count // defining control integer for adding empty answer for opened questions only once, otherwise if typing very fast it adds some useless lines 

function onChangeOpenAnswer(ev){
control++
setCount(control)
if(count===1){
  addEmptyAnswers(question) // calling function for adding empty answer for open question
 
} 
setOpenQAnswer(ev.target.value)  // changing state of open answer, to the value of the form input control
changeErrorCheck(false)
}

// function for adding the result of open answer to the DB
function onChangeSaveOpen(ev, questionId){
  if(ev.target.checked){
    setSaveOpen(true)
    const newAnswer=Object.assign({},  { answer: openQAnswer  })
    API.updateOpenAnswers(newAnswer, questionId ,newSubId)
    .then(()=>{
    }).catch(err=>(err))
  }
  else {
    setSaveOpen(false)
  }
}


let checkedAnswers=answered
let finalanswers=[0,0,0,0,0,0,0,0,0,0]



// function for adding answers and specifications of closed questions
async function onChangeAnswer (ev,question,index) {
  
  await addEmptyAnswers(question) // adding empty answer only once
  setErrArr(true)
  if(ev.target.checked)  {
    num++ // increasing number of selected answers after checking the answer
    setCount(num) 
   
    if(num>=question.min && num<=question.max){
      changeErrorCheck(false)
    checkedAnswers[index]=true
    setAnswered(checkedAnswers)
    for(let i=0;i<10;i++){
      if(checkedAnswers[i]===false) finalanswers[i]=0
      else finalanswers[i]=1
    }
    const newAnswer=Object.assign({},  { one:finalanswers[0], two: finalanswers[1], three: finalanswers[2], four: finalanswers[3], five: finalanswers[4],six: finalanswers[5],seven: finalanswers[6],eight: finalanswers[7],nine: finalanswers[8],ten: finalanswers[9]})
    await updateClosedAnswers(newAnswer, question.id)

    }
    if (num<question.min || num>question.max) {
      changeErrorCheck(true)
       
      checkedAnswers[index]=true
    setAnswered(checkedAnswers)
    for(let i=0;i<10;i++){
      if(checkedAnswers[i]===false) finalanswers[i]=0
      else finalanswers[i]=1
    }
    const newAnswer=Object.assign({},  { one:finalanswers[0], two: finalanswers[1], three: finalanswers[2], four: finalanswers[3], five: finalanswers[4],six: finalanswers[5],seven: finalanswers[6],eight: finalanswers[7],nine: finalanswers[8],ten: finalanswers[9]})
    await updateClosedAnswers(newAnswer, question.id)
    }

  }
 
  else if(ev.target.checked===false) {
   if(num!==0){
    num-- // decreasing number of selected answers after checking the answer
    setCount(num)
   }
    if(num<=question.min || num>=question.max){
     changeErrorCheck(true)
      checkedAnswers[index]='false'
     setAnswered(checkedAnswers)
      for(let i=0;i<10;i++){
       if(checkedAnswers[i]===false) finalanswers[i]=0
       else finalanswers[i]=1
    }
    const newAnswer=Object.assign({},  { one:finalanswers[0], two: finalanswers[1], three: finalanswers[2], four: finalanswers[3], five: finalanswers[4],six: finalanswers[5],seven: finalanswers[6],eight: finalanswers[7],nine: finalanswers[8],ten: finalanswers[9]})
    await updateClosedAnswers(newAnswer, question.id)
    }
    if(num>=question.min && num<=question.max) {
      changeErrorCheck(false)
     checkedAnswers[index]=false
     setAnswered(checkedAnswers)
      for(let i=0;i<10;i++){
       if(checkedAnswers[i]===false) finalanswers[i]=0
       else finalanswers[i]=1
    }
    const newAnswer=Object.assign({},  { one:finalanswers[0], two: finalanswers[1], three: finalanswers[2], four: finalanswers[3], five: finalanswers[4],six: finalanswers[5],seven: finalanswers[6],eight: finalanswers[7],nine: finalanswers[8],ten: finalanswers[9]})
    await updateClosedAnswers(newAnswer, question.id)
  }
   
  }
}
  
        
  let min=question.min
  let max=question.max
  return (
    <>
    <Container fluid>
      <div className="questionCards">
        {(index+1)!==0 && <h4>{index+1}. {question.question}</h4>}
        {question.min === 1 && (  
          <>
            <div className="mandatory">
              <BookmarkStar size={36} />
            </div>
          </>
        )}
       
        {/* {mandatory ? <h1>This is mandatory</h1>: <h1>this is optional</h1>} */}
      
        <Row>
          <Col sm={10}>
            
            {question.num !== 0 && (
              <Form.Group key={index}>
                {[...Array(question.num)].map((q, index1) => {
                  
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
                 id={index1}
                 
                 key={index1}
                 type="checkbox"
                size="lg"
                // onChange={(ev) => setAnswered(ev.target.checked)}
                label ={question[string[index1]]}
                defaultChecked={answered[index1]}
                onChange={(ev)=>{ onChangeAnswer(ev,question,index1)}}
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
            
            {(question.num === 0 && question.min===1)&& (
              <>
                <Form.Control
                  key={index}
                  size="lg"
                  required
                  type="text"
                  placeholder="Write your answer here"
                  maxLength={200}
                  as="textarea"
                  rows={3}
                  value={openQAnswer}
                  onChange={(ev)=>{ onChangeOpenAnswer(ev,question.id)
                  
                  }}
                  
                />
                <Form.Control.Feedback type="invalid">
                    {" "}
                    Please provide your answer
                  </Form.Control.Feedback>
               
               <Form.Check className="questionText"
                  
                   type="checkbox"
                  size="lg"
                  // onChange={(ev) => setAnswered(ev.target.checked)}
                  label ="Save answer"
                  checked={saveOpen}
                  onChange={(ev)=>{onChangeSaveOpen(ev,question.id)}}
              ></Form.Check>
              </>
            )}
             {(question.num === 0 && question.min===0)&& (
              <>
                <Form.Control
                  key={index}
                  size="lg"
                  type="text"
                  placeholder="Write your answer here"
                  maxLength={200}
                  as="textarea"
                  rows={3}
                  value={openQAnswer}
                  onChange={(ev)=>{ onChangeOpenAnswer(ev,question.id)
                  
                  }}
                />
               
               <Form.Check className="questionText"
                  
                   type="checkbox"
                  size="lg"
                  // onChange={(ev) => setAnswered(ev.target.checked)}
                  label ="Save answer"
                  checked={saveOpen}
                  onChange={(ev)=>{onChangeSaveOpen(ev,question.id)}}
              ></Form.Check>
              </>
            )}
          </Col>
         
         {logged && 
         <Col>
         <QuestionRowControl
         index={index}
           onDelete={onDelete}
           onUp={onUp}
           onDown={onDown}
           last={last}
         />
       </Col>
         } 
        </Row>
        {question.num!==0 &&
        <>
        <div className="specificationsTxt">   
        <Row><label>Minimum: {min} &nbsp; &nbsp; </label> <label>Maximum: {max}</label></Row>
       {message.type==="okay" && <Row><span style={okayStyle}>{message.text}</span></Row>} 
       {message.type!=="okay" && <Row><span style={noStyle}>{message.text}</span></Row>} 
        </div>
        </>
        }
        
      </div>
      </Container>
    </>
  );
}

function QuestionRowControl(props) {
  const { onDelete, onUp, onDown, index, last } = props;
  
  return (
    <>
    <Container >
      <div className="flex-fill m-auto">
        <Row>
          <Col>
          <div className="deletecont">
        <Col>
            <Button variant="link" className="shadow-none" onClick={onDelete}>
              <Trash size={24} color="red" />
            </Button>
          </Col> 
        </div>
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
  let errorArray=[]
  const history=useHistory()
  const { questions, onDelete, onUp, onDown, onPublish, survey, submission, loading, logged} = props;
  const [name, setName]=useState('')
  const [answers, setAnswers]=useState([])
  const [newCheck, setNewcheck]=useState([false,false,true,false,true,false,false])
  const [openCheck, setOpenCheck]=useState(false)
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage]= useState({
    text: '',
    type: 'okay'
  })
  const okayStyle = {color: "green" }
  const noStyle={color:"red"}

  console.log('new check: ' + newCheck)
  let newSubId=(submission[submission.length-1].id)+1
  function newSubmission(){
    if(name && survey){
      API.addNewSubmission(name, survey).then((err)=>{})
      API.increaseNumRespond(survey).then((err)=>{})
      for(let i=0;i<answers.length;i++){
      API.updateStatusAnswer(answers[i],newSubId)
      }
    }
  }

  const handleSubmit = (event) => {
    // stop event default and propagation
    event.preventDefault();
    event.stopPropagation(); 
    setOpenCheck(true)
    let valid=true
    const form = event.currentTarget; 
    for(let i=0;i<newCheck.length;i++){
      if(newCheck[i]===true) valid=false
    }
    console.log("is form valid: " + valid)
    // check if form is valid using HTML constraints
    if (!form.checkValidity() ) { 
        setValidated(true); // enables bootstrap validation error report
        setErrorMessage({text:`You can not submit your responses, please check the specifications `, type:'no'})  
    }
    else {
      if(valid===true){
        setErrorMessage({text:`Your answer is submitted `, type:'okay'}) 
        console.log("Everything is fine")
      }
      
     // newSubmission()
     // history.push('/surveys')
    //  errorArray.length=0

    }

    if(valid===false){ // enables bootstrap validation error report
      setErrorMessage({text:`You can not submit your responses, please check the specifications `, type:'no'})  
    }
 

  }
  // **************************bidene burdan errorArrayi setstate kimi newChecke atsam duzeler*****************************
  //********************************************************************************************************************** */
  // let num=questions.length
  // for(let i=0;i<num;i++) errorArray.push(0)
  // console.log(errorArray)
  // for(let i=0;i<errorArray.length;i++){
  //   if(questions[i].min!==0 && questions[i].questiontype===1)errorArray[i]=true
  //   else errorArray[i]=false
  // }
  // console.log(errorArray)  


  let last=questions.length
  let surveyId=0
  last!==0?surveyId=questions[0].survey_id: surveyId=0
  return (
    <>
    
      <div className="cont">

         <Form noValidate validated={validated} onSubmit={handleSubmit}>  
       {!logged &&
       <>
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
       </>
       }
       
        <Form.Group>
          {loading ?<h3>Please wait for your questions loading</h3> :
          <>
 <ListGroup as="ul" variant="flush" key={questions.id}>
          {questions.map((q,index) => {
            number++
              
            return (
              <>
              
                <ListGroup.Item as="li" key={index}>
                  <QuestionItem
                    survey={survey}
                    submission={submission}
                    question={q}
                    onDelete={() => onDelete(q)}
                    onUp={() => onUp(q)}
                    onDown={() => onDown(q)}
                    index={index}
                    last={last}
                    setAnswers={setAnswers}
                    numberOfQuestions={questions.length}
                    logged={logged}
                    newCheck={newCheck}
                    setNewCheck={setNewcheck}
                    openCheck={openCheck}
                  />
                </ListGroup.Item>
              </>
            );
          })}
        </ListGroup>
          </>
          }
       
        </Form.Group>
{(number===0 && logged) && <h4>Number of questions is {number}. You should have at least one question for publishing the survey</h4>}
 {(number!==0 && logged) && <h6>The number of questions is {number}. It is enough for publishing. Good Luck</h6> }
       {errorMessage.type==="okay" && <Row><span style={okayStyle}>{errorMessage.text}</span></Row>} 
       {errorMessage.type!=="okay" && <Row><span style={noStyle}>{errorMessage.text}</span></Row>} 
       {number!==0 &&
       <Button  variant="success" type="submit">
       Submit the answers
     </Button>
       } 
        { (number!==0 && logged) &&
        <Button
        variant="primary"
           onClick={() => {
            onPublish(surveyId)
            history.push("/surveys")
           } }
         className="btn btn-primary"
        >
          Publish this survey
        </Button>
        }
        
        </Form>
      </div>
    </>
  );
}

export default QuestionList;

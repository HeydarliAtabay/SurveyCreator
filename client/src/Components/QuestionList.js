import { React, useState, useEffect,useRef} from "react";
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
  const { question, onDelete, onUp, onDown, index,last, setAnswers, survey, newSubId, numberOfQuestions, logged, newCheck, setNewCheck, openCheck} = props;
  const [answered, setAnswered]=useState([false,false,false,false,false,false,false,false,false,false]) // state for checked checkboxes
  const [openQAnswer, setOpenQAnswer]=useState('') // state for open answers
  const [message, setMessage]=useState({
    text: '',
    type: 'yes',
  }) // state for error messages
  const [count, setCount] = useState(0)
  const [addEmpty, setAddEmpty]=useState(false) // state for checking if for that question, empty question was alreadya added or not
  const [saveOpen, setSaveOpen]=useState(false) // state for saving open answers
  //let newSubId=(submission[submission.length-1].id)+1 // new id of the new submission
 
  // use effect for submitting the open answers
  useEffect(() => {
    if(openCheck){
     setSaveOpen(true)
     const newAnswer=Object.assign({},  { answer: openQAnswer  })
    API.updateOpenAnswers(newAnswer, question.id ,newSubId)
    .then(()=>{
    }).catch(err=>(err))
      }
    
    }, [openCheck])

  // styles for different message types
  const okayStyle = {color: "green" }
  const noStyle={color:"red"}
  const id=index

  // function for changing error values in a error array state of question list
  function changeErrorCheck (value){
    if(value===true){ // if sent value has error
      let items=[...newCheck]
      console.log('items are '+ items)
      let item = items[id]
      console.log('item: '+ item)
      items[id]=true
      setNewCheck(items)
      setMessage({text:`You can submit minimum ${question.min} and maximum ${question.max} answers`, type:'no'})  
    }
    else{ // else if sent value doesn't has error
      let items=[...newCheck]
      console.log('items are '+ items)
      let item = items[id]
      console.log('item: '+ item)
      items[id]=false
      setNewCheck(items)
      setMessage({text:'All specifications are done', type:'okay'})
    }
    
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
setSaveOpen(false)
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
  
  const history=useHistory()
  const { questions, onDelete, onUp, onDown, onPublish, survey,  submission, loading, logged} = props;
  const [name, setName]=useState('') // state for responder's name
  const [answers, setAnswers]=useState([])  // state for ids of given answers
  const [newCheck, setNewcheck]=useState([]) // state for question errors
  const [openCheck, setOpenCheck]=useState(false) // state for changing open question state from question item function
  const [validated, setValidated] = useState(false); // state for bootstrap validations
  const [errorMessage, setErrorMessage]= useState({
    text: '',
    type: 'okay'
  }) // state for error messages, which will be shown while checking the specifications
  const countRef = useRef(0); // useRefference for limiting the number of re-rendering 
  // styles for different message types
  const okayStyle = {color: "green" }
  const noStyle={color:"red"}

  let errorArray=[]
  
  // useEffect for creating an array which stores the values of errors
  useEffect(() => {
    countRef.current++
    const makeArrayOfErrors= async()=>{
     if(countRef.current<10){ // maximum number of re renders is 10
      try{
        let num=0
        for(let i=0;i<questions.length;i++){
          if(questions[i].survey_id===survey) num++
        }
        if(errorArray.length<num){
          for(let i=0;i<num;i++){
           if(questions[i].survey_id===survey && questions[i].min===1 && questions[i].questiontype===1) errorArray.push(true)
           else errorArray.push(false)
          }
      }
    }
    catch(err) {}
    setNewcheck(errorArray) // change state of error array to the modified array
        }
     }
        makeArrayOfErrors() // calling asynchronous function for creating an array of errors
    },)
let newSubId=null
 if(submission){
  newSubId=(submission[submission.length-1].id)+1
  }
  else history.push("/")
  // getting id of the new submission

  // function for adding new submissions
  function newSubmission(){
    if(name && survey){
      API.addNewSubmission(name, survey).then((err)=>{}) // calling api for adding a new submission with a written name
      API.increaseNumRespond(survey).then((err)=>{}) // calling api for increasing the number of responders in a survey table
      for(let i=0;i<answers.length;i++){
      API.updateStatusAnswer(answers[i],newSubId) // changing the status of given responses to 1, for making them visible to the admins
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation(); 
    
    let valid=true
    const form = event.currentTarget; 
    //checking if there any error during the checking of specifications
    for(let i=0;i<newCheck.length;i++){
      if(newCheck[i]===true) valid=false
    }
    // check if form is valid using HTML constraints
    if (!form.checkValidity() ) { 
        setValidated(true); // enables bootstrap validation error report
        setErrorMessage({text:`You can not submit your responses, please check the specifications `, type:'no'})  
    }
    else {
      if(valid===true){
        setOpenCheck(true)
        // change the state of open answer to true
        setErrorMessage({text:`Your answer is submitted, now You will be redirected to the main page `, type:'okay'}) 
        try{
         
          
          setTimeout(()=>{
            newSubmission()  // calling a function of adding new submission
            setTimeout(()=>history.push('/surveys'),1500)  // waiting 1 second for redirecting user to the main page
            window.location.reload();
          },1500)
        }
        catch{

        }
      
       // errorArray.length=0
      }
    }

    // if there any error, dont give the user to submit answers
    if(valid===false){ 
      setErrorMessage({text:`You can not submit your responses, please check the specifications `, type:'no'})  
    }
   

  }

  let last=questions.length
  let surveyId=0
  last!==0?surveyId=questions[0].survey_id: surveyId=0
  return (
    <>
    
      <div className="cont">

         <Form noValidate validated={validated} onSubmit={handleSubmit}>  
       {!logged && // if user is logged in it couldn't see that part
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
                    newSubId={newSubId}
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
       {errorMessage.type==="okay" && <Row><h3 style={okayStyle}>{errorMessage.text}</h3></Row>} 
       {errorMessage.type!=="okay" && <Row><h3 style={noStyle}>{errorMessage.text}</h3></Row>} 
       {(number!==0 && !logged)&&
       <Button  variant="success" type="submit" size="lg">
       Submit the answers
     </Button>
       } 
        { (number!==0 && logged) &&
        <Button
        size="lg"
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

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {React, useState, useEffect} from 'react'
import{Button,Container} from 'react-bootstrap'
import Header from './Components/Header'
import SurveyList from './Components/SurveyList'
import QuestionList from './Components/QuestionList'
import ModalFormTitle from './Components/ModalFormTitle'
import ModalFormQuestion from './Components/ModalFormQuestion'
import LoginComponet from './Components/LoginComponent'
import API from './API'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

//import ModalForm from './Components/ModalForm'

function App(props) {
  const [surveyList, setSurveyList]=useState([])
  const [questionList, setQuestionList]=useState([])
  const [loading, setLoading]=useState(true)//this for checking the loading at mount
  const [dirty, setDirty] =useState(true)
  const [dirtyQuestions, setDirtyQuestions] =useState(true)
  const [surveyId, setSurveyId]=useState()

  const MODAL = { CLOSED: -2, ADD: -1 };
  const [selectedTask, setSelectedTask] = useState(MODAL.CLOSED);

  const handleClose = () => {
    setSelectedTask(MODAL.CLOSED);
  }

  // for getting all tasks
  useEffect(() => {
    if(dirty){
      API.loadAllSurveys().then(newTask=>{
        setSurveyList(newTask)
        setLoading(false)
        setDirty(false)
       })



      }
    }, [dirty])
    
  // function handleSelection() {
  //     API.getSurveys()
  //       .then((tasks) => setSurveyList(tasks))
  //       .catch(err => (err) );
  // }

  useEffect(() => {
      API.getQuestions(surveyId).then(newQuestion=>{
        setQuestionList(newQuestion)
        setLoading(false)
        setDirtyQuestions(false)
       })

   }, [dirtyQuestions, surveyId])

  function addSurvey (survey)  {
    // const id = Math.max(...surveyList.map( s => s.id )) + 1;
    // setSurveyList((oldSurveys) => [...oldSurveys, { ...survey, id: id }] );
    API.addSurvey(survey).then((err)=>{setDirty(true)})
  }

  function publishSurvey (id){
    API.publishSurvey(id).then((err)=>{setDirty(true)})
  }

  function addQuestion (question)  {
    
    let orders=[...questionList.filter(q => q.survey_id===surveyId)].map(q =>  q.order)
    let id = Math.max.apply(null,orders)+1 ;
    if(!id)id=1
   // setQuestionList((oldQuestions) => [...oldQuestions, { ...question, id: id }] );
   API.addQuestion(question,id, surveyId).then((err)=>{setDirtyQuestions(true)})
  }


  
  
 async function handleselect (id)
  {

    setSurveyId(id)
    try {
      const questions = await API.getQuestions(id);
      setQuestionList(questions);
      setDirtyQuestions(false)
    } catch(err) {
      console.log(err);
    }
  }

  function deleteQuestion (question) {
    setQuestionList((oldQuestions) => oldQuestions.filter( q => q.id !== question.id ));
    API.deleteQuestion(question)
    .then(() => {
      setDirtyQuestions(true);
    }).catch(err => (err) );
  }

  function deleteSurvey (survey) {
    setSurveyList((oldSurveys) => oldSurveys.filter( s => s.id !== survey.id ));
    API.deleteSurvey(survey)
    .then(() => {
      setDirty(true);
    }).catch(err => (err) );

  }


  function orderUpQuestion (question) {
    let orders=[...questionList.filter(q => q.survey_id===surveyId)].map(q =>  q.order) // getting array of order numbers
    let questionIds=[...questionList.filter(q => q.survey_id===surveyId)].map(q =>  q.id) // getting array of question ids
    let selectedorder=question.order  // order number of selected question
    let index=0
    for (let i = 0; i < orders.length; i++) {
      if(orders[i]===selectedorder) index=i    // get the index on array where the order num is equal to the order num of selected question
    }
    let b=orders[index-1];orders[index-1]=orders[index];orders[index]=b // changing the place of question with the previous one
    let neworder= orders[index] ; let neworder2= orders[index-1]
    const id1=questionIds[index];const id2= questionIds[index-1]
    API.updateOrderQuestion(neworder,id1).then((err)=>{setDirtyQuestions(false)})
    API.updateOrderQuestion(neworder2,id2).then((err)=>{setDirtyQuestions(true)})
  }

  function orderDownQuestion (question) {
    let orders=[...questionList.filter(q => q.survey_id===surveyId)].map(q =>  q.order) // getting array of order numbers
    let questionIds=[...questionList.filter(q => q.survey_id===surveyId)].map(q =>  q.id) // getting array of question ids
    let selectedorder=question.order  // order number of selected question
    let index=0
    for (let i = 0; i < orders.length; i++) {
      if(orders[i]===selectedorder) index=i    // get the index on array where the order num is equal to the order num of selected question
    }
    let b=orders[index+1];orders[index+1]=orders[index];orders[index]=b // changing the place of question with the following one
    let neworder= orders[index] ; let neworder2= orders[index+1]
    const id1=questionIds[index] ; const id2= questionIds[index+1]
    API.updateOrderQuestion(neworder,id1).then((err)=>{setDirtyQuestions(false)})
    API.updateOrderQuestion(neworder2,id2).then((err)=>{setDirtyQuestions(true)})
  }


  const handleSaveSurvey = (survey) => {
    // if the task has an id it is an update
    addSurvey(survey);
    setSelectedTask(MODAL.CLOSED); 
  }

  const handleSaveQuestions = (question) => {
    // if the task has an id it is an update
    addQuestion(question);
    setSelectedTask(MODAL.CLOSED); 
  }

  return (
    <Router>
      <Container fluid > 
      <Header/>
      <Switch>
      <Route path="/surveys"> 
      <div className="addbtn"><Button variant="success" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Add a Survey</Button></div>
      {(selectedTask !== MODAL.CLOSED) && <ModalFormTitle onSave={handleSaveSurvey} onClose={handleClose}></ModalFormTitle>}
      <SurveyList surveys={surveyList}  onDelete={deleteSurvey} onSelect={handleselect} />
      
      </Route>
       <Route path="/questions"> 
      <div className="addbtn"><Button variant="success" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Add a Question</Button></div>
      {(selectedTask !== MODAL.CLOSED) && <ModalFormQuestion onSave={handleSaveQuestions} onClose={handleClose}></ModalFormQuestion>}
      <QuestionList questions={questionList} onDelete={deleteQuestion} onUp={orderUpQuestion} onDown={orderDownQuestion} onPublish={publishSurvey} />
      </Route> 
     
      <Route path="/login"> 
      <LoginComponet/>
      </Route>
     <Redirect to="/surveys"/>
      </Switch>
    </Container>
    </Router>
  );
}

export default App;

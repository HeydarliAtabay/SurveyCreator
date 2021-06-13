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

function App() {
  const [surveyList, setSurveyList]=useState([])
  const [numberResponders, setNumberOfResponders]=useState(0)
  const [questionList, setQuestionList]=useState([])
  const [loading, setLoading]=useState(true)//this for checking the loading at mount
  const [dirty, setDirty] =useState(true)

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
    if(dirty){
      API.loadAllQuestions().then(newQuestion=>{
        setQuestionList(newQuestion)
        setLoading(false)
        setDirty(false)
       })


      }
    }, [dirty])

  function addSurvey (survey)  {
    // const id = Math.max(...surveyList.map( s => s.id )) + 1;
    // setSurveyList((oldSurveys) => [...oldSurveys, { ...survey, id: id }] );
    API.addSurvey(survey).then((err)=>{setDirty(true)})
  }

  function addQuestion (question)  {
    const id = Math.max(...questionList.map( q => q.id )) + 1;
    setQuestionList((oldQuestions) => [...oldQuestions, { ...question, id: id }] );
  }

  function deleteQuestion (question) {
    setQuestionList((oldQuestions) => oldQuestions.filter( q => q.id !== question.id ));
  }

  function deleteSurvey (survey) {
    setSurveyList((oldSurveys) => oldSurveys.filter( s => s.id !== survey.id ));
    API.deleteSurvey(survey)
    .then(() => {
      setDirty(true);
    }).catch(err => (err) );

  }

  function orderUpQuestion (question) {
    const id = Math.min(...questionList.map( q => q.id ))-1 ;
    setQuestionList((oldQuestions) => oldQuestions.filter( q => q.id !== question.id ));
    setQuestionList((oldQuestions) => [...oldQuestions, { ...question, id: id-1 }] );
  }

  function orderDownQuestion (question) {
    const id = (questionList.map( q => q.id ));
    console.log(id)
    //setQuestionList((oldQuestions) => oldQuestions.filter( q => q.id === question.id ));
    // setQuestionList((oldQuestions) => [...oldQuestions, { ...question, id: id+1 }] );
    
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
      <SurveyList surveys={surveyList} numberOfResponders={numberResponders} onDelete={deleteSurvey} />
      
      </Route>
      <Route path="/questions"> 
      <div className="addbtn"><Button variant="success" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Add a Question</Button></div>
      {(selectedTask !== MODAL.CLOSED) && <ModalFormQuestion onSave={handleSaveQuestions} onClose={handleClose}></ModalFormQuestion>}
      <QuestionList questions={questionList} onDelete={deleteQuestion} onUp={orderUpQuestion} onDown={orderDownQuestion} />
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

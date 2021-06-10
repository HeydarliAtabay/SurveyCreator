import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {React, useState} from 'react'
import{Button,Container} from 'react-bootstrap'
import Header from './Components/Header'
import SurveyList from './Components/SurveyList'
import QuestionList from './Components/QuestionList'
import ModalFormTitle from './Components/ModalFormTitle'
import ModalFormQuestion from './Components/ModalFormQuestion'
import LoginComponet from './Components/LoginComponent'
import SURVEYS from './surveys'
import QUESTIONS from './questions'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

//import ModalForm from './Components/ModalForm'

function App() {
  const [surveyList, setSurveyList]=useState(SURVEYS)
  const [questionList, setQuestionList]=useState(QUESTIONS)

  const MODAL = { CLOSED: -2, ADD: -1 };
  const [selectedTask, setSelectedTask] = useState(MODAL.CLOSED);

  const handleClose = () => {
    setSelectedTask(MODAL.CLOSED);
  }

  function addSurvey (survey)  {
    const id = Math.max(...surveyList.map( s => s.id )) + 1;
    setSurveyList((oldSurveys) => [...oldSurveys, { ...survey, id: id }] );
  }

  function addQuestion (question)  {
    const id = Math.max(...questionList.map( q => q.id )) + 1;
    setQuestionList((oldQuestions) => [...oldQuestions, { ...question, id: id }] );
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
      <SurveyList surveys={surveyList} />
      
      </Route>
      <Route path="/questions"> 
      <div className="addbtn"><Button variant="success" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Add a Question</Button></div>
      {(selectedTask !== MODAL.CLOSED) && <ModalFormQuestion onSave={handleSaveQuestions} onClose={handleClose}></ModalFormQuestion>}
      <QuestionList questions={questionList}/>
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

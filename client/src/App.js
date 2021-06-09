import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {React, useState} from 'react'
import{Button,Container} from 'react-bootstrap'
import Header from './Components/Header'
import SurveyList from './Components/SurveyList'
import QuestionList from './Components/QuestionList'
import ModalForm from './Components/ModalForm'
import CreateSurvey from './Components/CreateSurvey'
import LoginComponet from './Components/LoginComponent'
import SURVEYS from './surveys'
import QUESTIONS from './questions'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

//import ModalForm from './Components/ModalForm'

function App() {
  const [surveyList, setSurveyList]=useState(SURVEYS)
  const [questionList]=useState(QUESTIONS)

  const MODAL = { CLOSED: -2, ADD: -1 };
  const [selectedTask, setSelectedTask] = useState(MODAL.CLOSED);

  const handleClose = () => {
    setSelectedTask(MODAL.CLOSED);
  }

  function addSurvey (survey)  {
    const id = Math.max(...surveyList.map( s => s.id )) + 1;
    setSurveyList((oldSurveys) => [...oldSurveys, { ...survey, id: id }] );
  }

  const handleSave = (survey) => {
    // if the task has an id it is an update
    addSurvey(survey);
    setSelectedTask(MODAL.CLOSED); 
  }

  return (
    <Router>
      <Container fluid > 
      <Header/>
      <Switch>
      <Route path="/surveys"> 
      <div className="addbtn"><Button variant="success" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Add a Survey</Button></div>
      {(selectedTask !== MODAL.CLOSED) && <ModalForm onSave={handleSave} onClose={handleClose}></ModalForm>}
      <SurveyList surveys={surveyList} />
      
      </Route>
      <Route path="/questions"> 
      <QuestionList questions={questionList}/>
      </Route>
      <Route path="/createSurvey"> 
      <CreateSurvey/>
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

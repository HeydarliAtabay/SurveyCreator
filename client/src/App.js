import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import Header from './Components/Header'
import SurveyList from './Components/SurveyList'
import QuestionList from './Components/QuestionList'
import SURVEYS from './surveys'
import QUESTIONS from './questions'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

//import ModalForm from './Components/ModalForm'

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Switch>
      <Route path="/surveys"> 
      <SurveyList surveys={SURVEYS}/>
      </Route>
      <Route path="/questions"> 
      <QuestionList questions={QUESTIONS}/>
      </Route>
     <Redirect to="/surveys"/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;

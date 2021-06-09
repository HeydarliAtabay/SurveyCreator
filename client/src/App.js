import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import Header from './Components/Header'
import SurveyList from './Components/SurveyList'
//import ModalForm from './Components/ModalForm'

function App() {
  return (
    <div className="App">
      <Header/>
      <SurveyList/>
    </div>
  );
}

export default App;

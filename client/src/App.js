import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {React, useState, useEffect} from 'react'
import{Button,Container, Row} from 'react-bootstrap'
import Header from './Components/Header'
import SurveyList from './Components/SurveyList'
import QuestionList from './Components/QuestionList'
import ModalFormTitle from './Components/ModalFormTitle'
import ModalFormQuestion from './Components/ModalFormQuestion'
import AnswerList from './Components/AnswerList'
import LoginComponent from './Components/LoginComponent'
import AdminDetails from './Components/AdminDetails'
import API from './API'

import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

//import ModalForm from './Components/ModalForm'

function App(props) {
  
  const [surveyList, setSurveyList]=useState([])
  const [questionList, setQuestionList]=useState([])
  const [answerList, setAnswerList]=useState([])
  const [submissionList, setSubmissionList]=useState([])
  const [loading, setLoading]=useState(true)//this for checking the loading at mount
  const [dirty, setDirty] =useState(true)
  const [dirtyQuestions, setDirtyQuestions] =useState(true)
  const [dirtyAnswers, setDirtyAnswers] =useState(true)
  const [surveyId, setSurveyId]=useState()
  const [submission, setSubmission]=useState()
  const [allSub, setAllSub]=useState()
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [message, setMessage] = useState('');
  const [userId, setUserId]=useState(2)

 
 

  const MODAL = { CLOSED: -2, ADD: -1 };
  const [selectedTask, setSelectedTask] = useState(MODAL.CLOSED);

  const handleClose = () => {
    setSelectedTask(MODAL.CLOSED);
  }



  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        await API.getUserInfo();
        setLoggedIn(true);
      } catch(err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);


  // for getting all surveys
  useEffect(() => {
    if(dirty && !loggedIn){
      API.loadAllSurveys().then(newTask=>{
        setSurveyList(newTask)
        setLoading(false)
        setDirty(false)
       })
      }
      if(loggedIn){
        API.getSurveysOfUser(userId).then(newTask=>{
          setSurveyList(newTask)
          setLoading(false)
          setDirty(false)
         })
        }
    }, [userId,loggedIn,dirty])


  useEffect(() => {
      API.getQuestions(surveyId).then(newQuestion=>{
        setQuestionList(newQuestion)
        setLoading(false)
        setDirtyQuestions(false)
       })
       API.getSubmissionsOfSurvey().then(allSubmissions=>{
        setAllSub(allSubmissions)
      }) 

   }, [dirtyQuestions,surveyId])


   useEffect(() => {
    API.getAnswers(surveyId,submission).then(newQuestion=>{
      setAnswerList(newQuestion)
      setLoading(false)
      setDirtyAnswers(false)
     })

 }, [dirtyAnswers, surveyId, submission])

 useEffect(()=>{
  getSubmissions(surveyId)
 },[surveyId])

  function addSurvey (survey)  {
    API.addSurvey(survey).then((err)=>{setDirty(true)})
  }

  function publishSurvey (id){
    API.publishSurvey(id).then((err)=>{setDirty(true)})
  }

  function addQuestion (question)  {
    let orders=[...questionList.filter(q => q.survey_id===surveyId)].map(q =>  q.order)
    let id = Math.max.apply(null,orders)+1 ;
    if(!isFinite(id)) id=1
   // setQuestionList((oldQuestions) => [...oldQuestions, { ...question, id: id }] );
   API.addQuestion(question,id, surveyId).then((err)=>{setDirtyQuestions(true)})
  }
 
 const handleselect = (id) =>
  {
    setSurveyId(id)
    // try {
      
    //   const questions = await API.getQuestions(id);
    //   setQuestionList(questions);
    //   setDirtyQuestions(false)
    // } catch(err) {
    //   console.log(err);
    // }
  }

  

  async function getAnswers(surveyId,submissionId){
    
    setSubmission(submissionId)
    setSurveyId(surveyId)
    
    try {
      const answers = await API.getAnswers(surveyId,submissionId);
      setAnswerList(answers);
      setDirtyAnswers(false)
    } catch(err) {
      console.log(err);
    }
  }
  

  async function getSubmissions(surveyId){
    try {
      const submissions = await API.getSubmissionsOfSurvey(surveyId);
      setSubmissionList(submissions);
      setDirtyAnswers(false)
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
    addSurvey(survey);
    setSelectedTask(MODAL.CLOSED); 
  }

  const handleSaveQuestions = (question) => {
    addQuestion(question);
    setSelectedTask(MODAL.CLOSED); 
  }

  const handleRight=(submissionId)=>{
    setSubmission(submissionId)
  }

  const handleLeft=(submissionId)=>{
    setSubmission(submissionId)
  }

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUserId(user)
      setMessage({msg: `Welcome, ${user}!`, type: 'success'});
    } catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setSurveyList([])
    setQuestionList([])
    setSubmissionList([])
    setAnswerList([])
    setMessage('')
  }
  
  return (
    <Router>
      {loggedIn? <Header logout={doLogOut} link={"/"} info={"Log out "} />: <Header logout={doLogOut} link="/login"info={"Log in "} />}
      {(loggedIn && message) &&<AdminDetails greetings={message.msg}/>}
      <Container fluid > 
      <Switch>
      <Route path="/surveys"> 
      <div className="addbtn">{loggedIn && <Button variant="success" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Add a Survey</Button>}</div>
      {(selectedTask !== MODAL.CLOSED) && <ModalFormTitle onSave={handleSaveSurvey} onClose={handleClose}></ModalFormTitle>}
      <SurveyList loading={loading} logged ={loggedIn} surveys={surveyList}  onDelete={deleteSurvey} onSelect={handleselect} onAnswer={getAnswers} submission={submissionList} />
      
      </Route>
       {/* <Route path="/questions">  */}
       <Route path={["/questions/:id"]}>
      <div className="addbtn">{loggedIn && <Button variant="success" size="lg"  onClick={() => setSelectedTask(MODAL.ADD)}>Add a Question</Button> }</div>
      {(selectedTask !== MODAL.CLOSED) && <ModalFormQuestion onSave={handleSaveQuestions} onClose={handleClose}></ModalFormQuestion>}
      <QuestionList loading ={loading} logged={loggedIn} questions={questionList} onDelete={deleteQuestion} onUp={orderUpQuestion} onDown={orderDownQuestion} onPublish={publishSurvey} survey={surveyId} submission={allSub} />
      </Route> 

       <Route path="/answers"> 
      <AnswerList submissions={submissionList} questions={questionList} answers={answerList} onPublish={publishSurvey} survey={surveyId} responder={"Atabay"} onRight={handleRight} onLeft={handleLeft} loading={loading}/>
      </Route> 
      <Route path="/login">
          <Row className="vh-100 below-nav">
          {loggedIn ? <Redirect to="/surveys" /> : <LoginComponent login={doLogIn} serverError={message.msg}/>}
          </Row>
        </Route>
      {/* <Route path="/login" render={() => 
          <>{loggedIn ? <Redirect to="/surveys" /> : <LoginComponent login={doLogIn} serverError={message.msg}/>}</>
        }/> */}
     <Redirect to="/surveys"/>
      </Switch>
    </Container>
    </Router>
  );
}

export default App;

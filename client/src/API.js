import Question from './models/question'
import Answer from './models/answer'
import Submission from './models/submission'

const url='http://localhost:3000'


// APIs for surveys
async function  loadAllSurveys(){
 const response= await fetch(url+'/api/surveys')
 const surveys= await response.json()
 return surveys


 //Error handling is missing
}

function deleteSurvey(survey) {
    // call: DELETE /api/exams/:coursecode
    return new Promise((resolve, reject) => {
      fetch(url + '/api/surveys/delete/' + survey.id, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  
function addSurvey(survey) {
    return new Promise((resolve, reject) => {
      fetch(url + '/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
        body : JSON.stringify({title: survey.title, numRespond: 0, published: 0, user: 1})
        }).then((response) => {
          if (response.ok) {
            resolve(null);
          } else {
            // analyze the cause of error
            response.json()
              .then((message) => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  function publishSurvey(id) {
    // call: PUT /api/exams/:coursecode
    return new Promise((resolve, reject) => {
      fetch(url + '/api/surveys/update/published/' +id, {
        method: 'PUT',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((obj) => { reject(obj); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  function increaseNumRespond(surveyId){
    return new Promise((resolve, reject) => {
      fetch(url + '/api/surveys/update/' + surveyId , {
        method: 'PUT',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((obj) => { reject(obj); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }


// APIs for questions

async function  loadAllQuestions(){
    const response= await fetch(url+'/api/questions')
    const questions= await response.json()
    console.log(questions)
    return questions
} 

async function getQuestions(id) {
  let url1 = "/api/questions";
  if(id){
      const queryParams = "/survey/" + id;
      url1 += queryParams;
  }
  const response = await fetch(url + url1);
  const tasksJson = await response.json();
  if(response.ok){
      //return tasksJson.map((t) => Task.from(t));
      return tasksJson.map((q) => new Question(q.id,q.question,q.questiontype,q.num,q.min,q.max,q.one,q.two,q.three,q.four,q.five,q.six,q.seven,q.eight,q.nine,q.ten,q.order,q.survey_id));
  } else {
      let err = {status: response.status, errObj:tasksJson};
      throw err;  // An object with the error coming from the server
  }
}

// api for adding the questions 
function addQuestion(question,orderId, surveyId) {
    return new Promise((resolve, reject) => {
      fetch(url + '/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
        body : JSON.stringify({question: question.question, questiontype: question.questiontype, num: question.num, min: question.min, max: question.max,
        one: question.one, two: question.two, three: question.three, four: question.four, five: question.five, six: question.six, seven: question.seven,
        eight: question.eight, nine: question.nine, ten: question.ten, order: orderId, survey_id:surveyId

        })
        }).then((response) => {
          if (response.ok) {
            resolve(null);
          } else {
            // analyze the cause of error
            response.json()
              .then((message) => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }


  function updateOrderQuestion(order,id) {
    // call: PUT /api/exams/:coursecode
    return new Promise((resolve, reject) => {
      fetch(url + '/api/questions/update/order/down/' + order + '/' +id, {
        method: 'PUT',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((obj) => { reject(obj); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  // api/questions/delete
   
  function deleteQuestion(question) {
    // call: DELETE /api/exams/:coursecode
    return new Promise((resolve, reject) => {
      fetch(url + '/api/questions/delete/' + question.id, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }



  // for answers

  async function getAnswers(surveyId, submissionId) {
    let url1 = "/api/answers";
    if(surveyId){
        const queryParams = "/survey/" +surveyId +"/"+submissionId;
        url1 += queryParams;
    }
    const response = await fetch(url + url1);
    const tasksJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return tasksJson.map((q) => new Answer(q.id,q.submission_id, q.survey_id, q.question_id,q.questiontype,q.answer, q.num,q.min,q.max,q.one,q.two,q.three,q.four,q.five,q.six,q.seven,q.eight,q.nine,q.ten));
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
  }

  function addEmptyAnswers(question,submissionId, surveyId) {
    return new Promise((resolve, reject) => {
      fetch(url + '/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
        body : JSON.stringify({ submission_id:submissionId, survey_id:surveyId, question_id:question.id, questiontype: question.questiontype, answer: '', one:0, two:0, three:0, four:0, five:0, six:0, seven:0, eight:0, nine:0, ten:0})
        }).then((response) => {
          if (response.ok) {
            resolve(null);
          } else {
            // analyze the cause of error
            response.json()
              .then((message) => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  function updateClosedAnswers(answer, questionid, submissionid){
    return new Promise((resolve, reject) => {
      fetch(url + '/api/answers/update/' + questionid +'/' + submissionid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
      },
        body : JSON.stringify({one:answer.one , two:answer.two, three:answer.three, four:answer.four, five:answer.five, six:answer.six, seven:answer.seven, eight:answer.eight, nine:answer.nine, ten:answer.ten})
   
      }).then((response) => {
        console.log(answer.four)
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((obj) => { reject(obj); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }
  
  function updateOpenAnswers(answer, questionid, submissionid){
    return new Promise((resolve, reject) => {
      fetch(url + '/api/answers/updateopen/' + questionid +'/' + submissionid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
      },
        body : JSON.stringify({answer: answer.answer})
   
      }).then((response) => {
        console.log(answer.four)
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((obj) => { reject(obj); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

  // for submissions 
  async function getSubmissionsOfSurvey(surveyId) {
    let url1 = "/api/submissions";
    if(surveyId){
        const queryParams = "/survey/" +surveyId 
        url1 += queryParams;
    }
    const response = await fetch(url + url1);
    const tasksJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return tasksJson.map((s) => new Submission(s.id,s.responder, s.survey_id));
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
  }

  function addNewSubmission(responder,surveyId) {
    return new Promise((resolve, reject) => {
      fetch(url + '/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
        body : JSON.stringify({ responder:responder, survey_id:surveyId 
        })
        }).then((response) => {
          if (response.ok) {
            resolve(null);
          } else {
            // analyze the cause of error
            response.json()
              .then((message) => { reject(message); }) // error message in the response body
              .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
          }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }


    //Error handling is missing
const API={loadAllSurveys, deleteSurvey, addSurvey, publishSurvey,increaseNumRespond, addQuestion, loadAllQuestions, deleteQuestion, getQuestions, updateOrderQuestion, getAnswers, addEmptyAnswers, updateClosedAnswers, updateOpenAnswers, getSubmissionsOfSurvey, addNewSubmission}
export default API
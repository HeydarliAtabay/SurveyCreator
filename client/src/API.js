import Question from './models/question'
import Answer from './models/answer'

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
        return tasksJson.map((q) => new Answer(q.id,q.submission_id, q.survey_id, q.question_id, q.question,q.questiontype,q.answer, q.num,q.min,q.max,q.one,q.two,q.three,q.four,q.five,q.six,q.seven,q.eight,q.nine,q.ten));
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
  }

    //Error handling is missing
const API={loadAllSurveys, deleteSurvey, addSurvey, publishSurvey, addQuestion, loadAllQuestions, deleteQuestion, getQuestions, updateOrderQuestion, getAnswers}
export default API
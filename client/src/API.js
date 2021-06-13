const url='http://localhost:3000'


// APIs for surveys
async function  loadAllSurveys(){
 const response= await fetch(url+'/api/surveys')
 const surveys= await response.json()
 console.log(surveys)
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




// APIs for questions

async function  loadAllQuestions(){
    const response= await fetch(url+'/api/questions')
    const questions= await response.json()
    console.log(questions)
    return questions
} 
    
// api for adding the questions 
function addQuestion(question) {
    return new Promise((resolve, reject) => {
      fetch(url + '/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
        body : JSON.stringify({question: question.question, questiontype: question.questiontype, num: question.num, min: question.min, max: question.max,
        one: question.one, two: question.two, three: question.three, four: question.four, five: question.five, six: question.six, seven: question.seven,
        eight: question.eight, nine: question.nine, ten: question.ten, order: 3, survey_id:1

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

    //Error handling is missing
const API={loadAllSurveys, deleteSurvey, addSurvey, addQuestion, loadAllQuestions, deleteQuestion}
export default API
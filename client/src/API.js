const url='http://localhost:3000'


// API for loading all tasks
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

const API={loadAllSurveys, deleteSurvey}
export default API
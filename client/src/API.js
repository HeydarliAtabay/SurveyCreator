const url='http://localhost:3000'


// API for loading all tasks
async function  loadAllSurveys(){
 const response= await fetch(url+'/api/surveys')
 const surveys= await response.json()
 console.log(surveys)
 return surveys


 //Error handling is missing
}
const API={loadAllSurveys}
export default API
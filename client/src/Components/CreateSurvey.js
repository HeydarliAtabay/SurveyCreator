import {React} from 'react'

function CreateSurvey(props){
const{surveyTitle}=props
    return(<>
        <div className="cont">
        <h3>Please add questions to your "{surveyTitle}"survey</h3>
        
        </div>
        
   </> 
   )
}
export default CreateSurvey
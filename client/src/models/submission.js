class Submission{    

    constructor(id, responder, survey_id) {
        if(id){
            this.id = id;
        }
        this.responder=responder; 
        this.survey_id=survey_id  
    }

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Question} the newly created Task object
     */
    static from(json) {
        const s =  Object.assign(new Submission(), json);
    
        return s;
    }

}

export default Submission;
class Answer{    

    constructor(id, submission_id, survey_id, question_id, questiontype, answer, num, min, max, one, two,three,four,five,six,seven,eight,nine,ten) {
        if(id){
            this.id = id;
        }

        this.submission_id=submission_id; 
        this.survey_id=survey_id  
        this.question_id = question_id;
        this.questiontype = questiontype;
        if(answer) this.answer=answer
        this.num=num;
        this.min=min;
        this.max=max;
        if(one) this.one=one
        if(two) this.two=two
        if(three) this.three=three
        if(four) this.four=four
        if(five) this.five=five
        if(six) this.six=six
        if(seven) this.seven=seven
        if(eight) this.eight=eight
        if(nine) this.nine=nine
        if(ten) this.ten=ten
    }

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Question} the newly created Task object
     */
    static from(json) {
        const a =  Object.assign(new Answer(), json);
    
        return a;
    }

}

export default Answer;
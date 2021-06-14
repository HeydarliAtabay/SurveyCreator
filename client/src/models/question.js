class Question{    

    constructor(id, question, questiontype, num, min, max, one, two,three,four,five,six,seven,eight,nine,ten, order, survey_id) {
        if(id){
            this.id = id;
        }
            
        this.question = question;
        this.questiontype = questiontype;
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
        this.order=order
        this.survey_id=survey_id
    }

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Question} the newly created Task object
     */
    static from(json) {
        const q =  Object.assign(new Question(), json);
    
        return q;
    }

}

export default Question;
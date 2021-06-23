class Survey{    

    constructor(id, title, numRespond, published, user) {
        if(id){
            this.id = id;
        }
        this.title=title; 
        this.numRespond=numRespond
        this.published=published
        this.user=user  
    }

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Question} the newly created Task object
     */
    static from(json) {
        const s =  Object.assign(new Survey(), json);
    
        return s;
    }

}

export default Survey;
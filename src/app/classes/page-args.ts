export class PageArgs {
    private args;

    constructor() {
    }

    push(args){
        this.args = args;
    }

    get(key){
        if(key in this.args){
            return this.args[key];
        } else{
            return null;
        }
    }
}

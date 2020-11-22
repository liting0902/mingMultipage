class Person{
    constructor(){
        this.name="John"
    }
    showname=() => {
        this.name = "Bob"
        console.log(this.name);
    }    
}

class Student extends Person{
    showname=() => {
        this.name = "Allen"
        console.log(this.name);
    }
}



let a = new Person();
a.showname()
a= new Student();
a.showname()
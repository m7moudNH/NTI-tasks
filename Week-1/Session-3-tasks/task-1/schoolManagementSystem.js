class Person {
    name;
    #email;
    #ID;
    constructor(name, email, ID) {
        this.name = name;
        this.email = email;
        this.ID = ID;
    }
    set email(email) { this.#email = email }
    set ID(ID) { this.#ID = ID; }
    get email() { return this.#email; }
    get ID() { return this.#ID; }
    behavior() { }
}

class Principal extends Person {
    schoolMembers =[];
    constructor(name, email, ID) {
        super(name, email, ID);
    }
    addMember(Persons) {
        Persons.forEach(element => {
            this.schoolMembers.push(element)
        });
    }

    listAllMembers(){
        return this.schoolMembers;
    }
    behavior() {
        console.log("can add , remove users , list all members");
    }
}

class Teacher extends Person {
    subject;
    studentsGrade = [];

    constructor(name, email, ID, subject) {
        super(name, email, ID,);
        this.subject = subject;
    }

    gradeStudent(student, grade) {
        this.studentsGrade.push({name : student.name , grade : grade });
    }

    listGradedStudents() {
        console.log(this.studentsGrade);
    }

    behavior() {
        console.log("grade students and list all students with their grades");
    }
}

class Student extends Person {
    enrolledSubjects = [];
    constructor(name, email, ID) {
        super(name, email, ID);
    }
    enrollSubject(subjectName) {
        this.enrolledSubjects.push(subjectName);
    }
    listAll() {
        console.log(`${this.name} is enrolled in ${this.enrolledSubjects}`);
    }
    behavior() {
        console.log("can enroll in a subject");
        
    }
}


let prinipal = new Principal("adel" , "efskdf@gmail.com" , 1);
let teacher = new Teacher("ahmed" , "dsfsdf@gmail.com" , 2 , "Math");
let student = new Student("tamer" , "sdlfksdklf@gmail.com" , 33);

prinipal.addMember([teacher , student]);

teacher.gradeStudent(student , 100);

student.enrollSubject("MATH");

prinipal.listAllMembers().forEach(element => {
    element.behavior();
    console.log("\n");
    
});
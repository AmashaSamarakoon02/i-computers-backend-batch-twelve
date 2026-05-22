import Student from "../models/student.js";

export function getAllStudents(req, res){
    Student.find().then((students) => {
        console.log(students);
        res.json(students);
       })
}

export function createStudent(req, res){
    if (isAdmin(req)){
       //Student
    const student = new Student(req.body)
    student.save().then(() => {
        res.json({message: "Student saved successfully"});
    })

    }else{
        res.status(403).json({message: "You need to login as admin to create"})
    }
  
}
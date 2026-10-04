const express = require('express');
const router = express.Router();
const {students, getNextId} = require('../data/studentsData.js');

const validateStudent = (body) => {
    const {name, age, course} = body || {};
    if (typeof name !== 'string' || name.trim() === '') {
        return {
            success: false, message: 'Name is required and must be a non-empty string.'};
    }
    if(!Number.isInteger(age) || age <= 0) {
        return { 
            success: false, message: 'Age is required and must be a positive integer.'};
        }
    if (typeof course !== 'string' || course.trim() === '') {
        return {
            success: false, message: 'Course is required and must be a non-empty string.'};
    }
    return { success: true };
}

router.param("id", (req,res,next,id)=>{
    const numId = Number(id);
    if(!Number.isInteger(numId) || numId <= 0){
        return res.status(400).json({error: "id must be a positive integer"});
    }
    req.studentId= numId;
    next();
});

// routes
// get
router.get("/", (req, res)=> {
    res.status(200).json(students);
});

// get one student
router.get("/:id", (req, res)=>{
    const student = students.find((s)=>s.id === req.studentId);
    if(!student){
        return res.status(404).json({error: "Student not found"});
    }
    res.status(200).json(student);
});

// post create
router.post("/", (req,res)=>{
    const error = validateStudent(req.body);
    if(error) return res.status(400).json(error);

    const {name, age, course}= req.body;
    const newStudent = {id: getNextId(), name: name.trim(), age, course:course.trim()};
    students.push(newStudent);
    res.status(201).json(newStudent);
})

// put - update
router.put("/:id", (req,res)=>{
    const student = students.find((s)=>s.id===req.studentId);
    if(!student) return res.status(404).json({error: "Student not found"});

    const error = validateStudent(req.body);
    if (error) return res.status(400).json(error);

    const {name, age, course} = req.body;
    student.name = name.trim();
    student.age = age;
    student.course = course.trim();
    res.status(200).json(student);
});

// delete 
router.delete("/:id", (req, res)=>{
    const idx = students.findIndex((s)=> s.id===req.studentId);
    if (idx===-1) return res.status(404).json({error: "Student not found"});

    const [removed] = students.splice(idx, 1);
    res.status(200).json({message: "Student deleted successfully", student: removed});
});

module.exports = router;

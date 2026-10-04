// plain js array
const students = [
    {id: 1, name: "Aryan Solanki", age:19, course: "BTech AI/M"},
    {id: 2, name: "Radhika Apte", age: 20, course: "BTech DS"},
    {id: 3, name: "Varun Dhawan", age:19, course: "BTech CSE"},
    {id: 4, name: "Jesus Christ", age:23, course: "MTech AI/ML"},
]

let nextId = 5;
const getNextId = () => nextId++;

// export instead of reassign coz reassigning would break reference to the arr
module.exports = { students, getNextId };
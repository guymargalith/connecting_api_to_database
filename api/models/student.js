const db = require ('../dbConfig')

class Student {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.age = data.age
        this.subject = data.subject
        this.learningDiff = data.learningDiff
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const studentsData = await db.query(`SELECT * FROM students;`)
                const students = studentsData.rows.map(d => new Student(d))
                resolve(students);
            } catch (err) {
                reject("Error retrieving students")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let studentData = await db.query(`SELECT * FROM students WHERE id = $1;`, [ id ]);
                let student = new Student(studentData.rows[0]);
                resolve (student);
            } catch (err) {
                reject('Student not found');
            }
        });
    }

    static findByName (name) {
        return new Promise (async (resolve, reject) => {
            try {
                let studentsData = await db.query(`SELECT * FROM students WHERE name ~* $1;`, [ name ]);
                const students = studentsData.rows.map(d => new Student(d))
                resolve (students);
            } catch (err) {
                reject('Error retrieving student with this name');
            }
        });
    }

    static create(name, age, subject, learningDiff){
        return new Promise (async (resolve, reject) => {
            try {
                let studentData = await db.query(`INSERT INTO students (name, age, subject, learningDiff) VALUES ($1, $2, $3, $4) RETURNING *;`, [ name, age, subject, learningDiff ]);
                let newStudent = new Student(studentData.rows[0]);
                resolve (newStudent);
            } catch (err) {
                reject('Error creating student');
            }
        });
    }

    update() {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedStudentData = await db.query(`UPDATE students SET age = age + 1 WHERE id = $1 RETURNING *;`, [ this.id ]);
                let updatedStudent = new Student(updatedStudentData.rows[0]);
                resolve (updatedStudent);
            } catch (err) {
                reject('Error updating student');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.query(`DELETE FROM students WHERE id = $1;`, [ this.id ]);
                resolve('Student was deleted')
            } catch (err) {
                reject('Student could not be deleted')
            }
        })
    }

}

module.exports = Student;
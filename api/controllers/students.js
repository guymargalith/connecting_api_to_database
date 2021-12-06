const express = require('express');
const router = express.Router();

const Student = require('../models/student')

// dogs index route
router.get('/', async (req, res) => {
    try {
        const students = await Student.all
        res.json({students})
    } catch(err) {
        res.status(500).json({err})
    }
})

// dogs show route
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(parseInt(req.params.id))
        res.json(student)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create dog route
router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body.name, req.body.age, req.body.subject, req.body.learningDiff)
        res.json(student)
    } catch(err) {
        res.status(404).json({err})
    }
})

// dogs update route
router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findById(parseInt(req.params.id))
        const updatedStudent = await student.update(req.body.name, req.body.age)
        res.json({student: updatedStudent})
    } catch(err) {
        res.status(500).json({err})
    }
})

// delete dog route
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findById(parseInt(req.params.id))
        await student.destroy()
        res.status(204).json('Student deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})


module.exports = router;
// express router
const express = require('express')
const router = express.Router()

// task model
const Task = require('./taskSchema')

// GET all tasks
router.get('/tasks', async (req, res) => {
    try {

        // query through database and retrieve all task objects
        const tasks =  await Task.find()

        res.json(tasks)
    }  catch (error) {
        console.error(error)
        res.status(500).json({  message: 'Internal Server Error' })
    }
})

// POST a task
router.post('/tasks', async (req, res) => {
    const { task } = req.body

    try {
        const createTask = await Task.create({ task })

        res.status(200).json(createTask)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// PATCH a task
router.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params
    const updatedData = req.body

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { ...updatedData })

        res.status(200).json(updatedTask)
        if (!updatedTask) {
            return res.status(404).json({ message: 'No task found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// DELETE a task
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deletedTask = await Task.findByIdAndDelete(id)

        if (!deletedTask) {
            return res.status(404).json({ message: 'No task found' })
        }
        
        res.json(deletedTask)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// export the routes
module.exports = router
// express router
const express = require('express')
const router = express.Router()

// bithday model
const Birthday = require('./birthdaySchema')

// GET all bithdays
router.get('/birthdays', async (req, res) => {
    try {

        // query through database and retrieve all birthday objects
        const birthdays =  await Birthday.find()

        res.json(birthdays)
    }  catch (error) {
        console.error(error)
        res.status(500).json({  message: 'Internal Server Error' })
    }
})

// POST a collection
router.post('/birthdays', async (req, res) => {
    const { name, birthday } = req.body

    try {
        const createBirthday = await Birthday.create({ name, birthday })

        res.status(200).json(createBirthday)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// PATCH a birthday
router.patch('/birthdays/:id', async (req, res) => {
    const { id } = req.params
    const updatedData = req.body

    try {
        const updatedBirthday = await Birthday.findByIdAndUpdate(id, { ...updatedData })

        res.status(200).json(updatedBirthday)
        if (!updatedBirthday) {
            return res.status(404).json({ message: 'No birthday found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// DELETE a birthday
router.delete('/birthdays/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deletedBirthday = await Birthday.findByIdAndDelete(id)

        if (!deletedBirthday) {
            return res.status(404).json({ message: 'No birthday found' })
        }
        
        res.json(deletedBirthday)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// export the routes
module.exports = router
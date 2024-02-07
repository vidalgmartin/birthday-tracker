import { useState, useEffect } from 'react'
import UncompletedTasks from './UncompletedTasks'
import CompletedTasks from './CompletedTasks'
import TaskForm from './TaskForm'

export default function Task() {
    const [uncompletedTasks, setUncompletedTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    const fetchTasks = async () => {
        const uncompletedResponse = await fetch('/api/uncompletedTasks')
        const completedResponse = await fetch('/api/completedTasks')

        if (!uncompletedResponse.ok || !completedResponse.ok) {
            console.error('Failed to fetch tasks')

            return
        } else {
            const uncompletedData = await uncompletedResponse.json()
            const completedData = await completedResponse.json()

            setUncompletedTasks(uncompletedData)
            setCompletedTasks(completedData)
        }
    }

    // the useEffect hooks ensures that the fetch function is called after the intial render and only once
    useEffect(() => {
        fetchTasks()
    }, [])

    const updateUncompletedTasks = async (newTasks) => {
        setUncompletedTasks(newTasks)

        await fetchTasks()
    }

    const updateCompletedTasks = async (newTasks) => {
        setCompletedTasks(newTasks)

        await fetchTasks()
    }

    return (
        <>
            <div className="task-components">

                <div>
                    <TaskForm updateTasks={updateUncompletedTasks} />
                </div>

                <div>
                    <UncompletedTasks tasks={uncompletedTasks} updateTasks={updateUncompletedTasks} />
                    <CompletedTasks tasks={completedTasks} updateTasks={updateCompletedTasks} />
                </div>
                
            </div>
        </>
    )
}
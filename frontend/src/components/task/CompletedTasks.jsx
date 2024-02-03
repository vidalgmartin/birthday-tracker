import { useState, useEffect } from 'react'

export default function CompletedTasks() {
    const [ completedTasks, setCompletedTasks ] = useState([])

    useEffect(() => {
        const fetchCompletedTasks = async () => {
            const response = await fetch('/api/completedTasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok) {
                console.error('Failed to completed fetch tasks')

                return
            }
            else {
                const data =  await response.json()
                setCompletedTasks(data)
            }
        }
        
        fetchCompletedTasks()
    }, [])

    const handleDelete = async (taskId)  => {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        // update state after removing completed task
        setCompletedTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    }

    const handleCheckbox = async (taskId) => {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: false
            })
        })

        if(!response.ok) {
            console.error('Failed to update task')

            return
        }
        else {
            setCompletedTasks((prevTask) => prevTask.filter((task) => task._id !== taskId))
        }
    }

    return (
        <>
            <h3>Completed Tasks</h3>
            {completedTasks && completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                    <div className="completed-task-container" key={task._id}>
                        <label>
                            <input type="checkbox" onClick={() => handleCheckbox(task._id)} checked readOnly />
                            {task.task}
                        </label>

                        <button className="task-delete" onClick={() => handleDelete(task._id)}>
                            Delete
                        </button>
                    </div>
                ))
                ) : (
                    <p>No tasks completed</p>
            )}
        </>
    )
}
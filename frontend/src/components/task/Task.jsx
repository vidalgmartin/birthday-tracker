import { useEffect, useState } from 'react'

export default function Task() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok) {
                console.error('Failed to fetch tasks')

                return
            }
            else {
                const data =  await response.json()
                setTasks(data)
            }
        }

        fetchTasks()
    }, [])

    const handleDelete = async (taskId)  => {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        // update state after removing task
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    }

    const handleCheckbox = async (taskId) => {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: true
            })
        })

        if(!response.ok) {
            console.error('Failed to update task')
            
            return
        }
        else {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
        }
    }
    
    return (
        <>
            <h3>Tasks</h3>
            {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <div className="task-container" key={task._id}>
                        <label>
                            <input type="checkbox" onClick={() => handleCheckbox(task._id)} checked={false} readOnly />
                            {task.task}
                        </label>

                        <button className="task-delete" onClick={() => handleDelete(task._id)}>
                            Delete
                        </button>
                    </div>
                ))
                ) : (
                    <p>No new tasks</p>
            )}
        </>
    )
}
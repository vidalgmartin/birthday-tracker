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

    const handleDelete =  async (taskId)  => {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
    }
    
    return (
        <>
            {tasks && tasks.length > 0 ? (
                (tasks && tasks.map((task) => (
                    <div className="task-item" key={task._id}>
                        <div className="task-name">
                            <p>{task.task}</p>
                        </div>
                        <button className="task-delete" onClick={() => handleDelete(task._id)}>
                            Delete
                        </button>
                    </div>
                )))
                ) :  (
                    <p>Add a task!</p>
            )}
        </>
    )
}
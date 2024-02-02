import { useEffect, useState } from 'react'

export default function Task() {
    const [tasks, setTasks] = useState([])
    const [ checkbox, setCheckbox ] = useState(false)

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

    const handleCheckbox = async (taskId) => {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkmark: true
            })
        })

        if(response.ok) {
            const json = await response.json()
            console.log(json.checkmark)
        }
    }
    
    return (
        <>
            {tasks && tasks.length > 0 ? (
                (tasks && tasks.map((task) => (
                    <div className="task-container" key={task._id}>
                        <label>
                            <input type="checkbox" onClick={() => handleCheckbox(task._id)}/>
                            {task.task}
                        </label>

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
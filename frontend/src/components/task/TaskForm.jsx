import { useState } from 'react'

export default function TaskForm({ updateTasks }) {
    const [ task, setTask ] = useState('')
    const [ error, setError ] = useState(null)
    
    const handleSubmit = async (e) =>  {
        e.preventDefault()

        if(!task) {
            setError('Please fill in the blanks')
            return
        }

        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })

        if(!response.ok) {
            console.error('Failed to submit task')
            return
        }
        else {
            // extract and parse the json data for a cleaner response
            const json = await response.json()

            setTask('')
            setError(null)

            updateTasks(() => {})
            console.log('Submitted successfully:', json);
        }
    }

    return (
        <div className="task-form-container">
            <form onSubmit={handleSubmit}>
                <input
                    className="task-input"
                    placeholder=" Something Todo..."
                    type="text"
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                />
                <button>Add task</button>
                {error && <div className="error">{error}</div>}
            </form>

        </div>
    )
}
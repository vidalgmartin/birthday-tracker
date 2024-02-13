import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { backendUrl } from '../../backendUrl'

export default function CompletedTasks({ tasks, updateTasks }) {

    const handleCheckbox = async (taskId) => {
        const response = await fetch(`${backendUrl}/api/tasks/${taskId}`, {
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
            updateTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
        }
    }

    const handleDelete = async (taskId)  => {
        await fetch(`${backendUrl}/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        // update state after removing completed task
        updateTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    }

    return (
        <>
            {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <div className="completed-task-container" key={task._id}>
                        <input type="checkbox" onClick={() => handleCheckbox(task._id)} checked readOnly />

                        <p>{task.task}</p>
                        <FontAwesomeIcon className="task-delete" onClick={() => handleDelete(task._id)} icon={faCircleMinus} />
                    </div>
                ))
                ) : (
                    <p className="no-tasks">No tasks completed</p>
            )}
        </>
    )
}
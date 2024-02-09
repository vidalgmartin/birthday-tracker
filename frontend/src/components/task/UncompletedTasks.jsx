import {  useState } from 'react'

export default function UncompletedTasks({ tasks, updateTasks}) {
    const [editTaskId, setEditTaskId] = useState(null)
    const [editTaskText, setEditTaskText] = useState('')
    

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
            updateTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
        }
    }

    const handleDelete = async (taskId)  => {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        // update state after removing task
        updateTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    }

    // sets the state of the task id and task text of the current task being edited
    const handleEdit = (taskId, taskText) => {
        setEditTaskId(taskId)
        setEditTaskText(taskText)
    }
    
    // updates the task with its edited version and updates the parent 'tasks' state
    const handleSave = async () => {
        //  if editTaskText is empty or contains spaces, newlines, etc. return
        if (!editTaskText.trim()) {

            return
        }
        
        const response = await fetch(`/api/tasks/${editTaskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task: editTaskText,
          }),
        })
    
        if (!response.ok) {
          console.error('Failed to update task')

          return
        } 
        else {
            // if the task matches the editTaskId, update the parent task state with the update task, otherwise return the unedited task
            updateTasks((prevTasks) => prevTasks.map((task) => {
                if (task._id === editTaskId) {

                return { ...task, task: editTaskText }
                }

                return task
            })
        )
        // reset states
        setEditTaskId(null)
        setEditTaskText('')
        }
    }
    
    return (
        <>
            {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <div className="uncompleted-task-container" key={task._id}>
                        {editTaskId === task._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTaskText}
                                    onChange={(e) => setEditTaskText(e.target.value)}
                                />

                                <button onClick={handleSave}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <input type="checkbox" onClick={() => handleCheckbox(task._id)} checked={false} readOnly />

                                <p>{task.task}</p>

                                <button className="task-edit" onClick={() => handleEdit(task._id, task.task)}>
                                    Edit
                                </button>

                                <button className="task-delete" onClick={() => handleDelete(task._id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p>No new tasks</p>
            )}
        </>
    )
}
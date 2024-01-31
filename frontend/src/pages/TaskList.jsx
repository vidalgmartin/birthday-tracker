import Task from '../components/Task'
import TaskForm from '../components/TaskForm'

export default function TaskList() {
    
    return (
        <div className="task-page-container">
            <TaskForm />
            <div className="task-elements">
                <Task />
            </div>
        </div>
    )
}
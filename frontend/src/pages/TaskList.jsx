import Task from '../components/Task'
import TaskForm from '../components/TaskForm'

export default function TaskList() {
    
    return (
        <div className="task-page">
            <TaskForm />
            <div className="task-page-list">
                <Task />
            </div>
        </div>
    )
}
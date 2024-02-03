import Task from '../components/task/Task'
import TaskForm from '../components/task/TaskForm'
import CompletedTasks from '../components/task/CompletedTasks'

export default function TaskList() {
    
    return (
        <div className="task-page">
            <TaskForm />
            <div className="task-page-list">
                <Task />
                <CompletedTasks />
            </div>
        </div>
    )
}
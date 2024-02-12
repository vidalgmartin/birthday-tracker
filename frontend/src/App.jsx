// pages
import TaskList from './pages/TaskList'

// components
import Navbar from './components/Navbar'

// main app
export default function App() {

  return (
    <>
      <Navbar />
      <div className="pages">
        <TaskList />
      </div>
    </>
  )
}
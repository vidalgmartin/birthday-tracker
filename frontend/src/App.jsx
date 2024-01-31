// react router to create multiple pages
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import TaskList from './pages/TaskList'

// components
import Navbar from './components/Navbar'

// main app
export default function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/tasks"
              element={<TaskList />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}
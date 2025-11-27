import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TasksProvider } from './context/TasksContext';
import Home from './components/Home'
import EditTask from './components/EditTask'
import AddTask from './components/AddTask'
import Header from './components/Header';
import './App.css'

function App() {
  return (
    <>
      <TasksProvider>
        <div className="min-h-screen bg-gray-100">
          <BrowserRouter>
            <Header />
            <main className="container mx-auto p-4">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddTask />} />
                <Route path='/edit/:id' element={<EditTask />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </TasksProvider>
    </>
  )
}

export default App

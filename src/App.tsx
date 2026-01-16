import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import Dashboard from "./pages/Dashboard"
import Createblog from "./pages/Createblog"
import Updateblog from "./pages/Updateblog"
import Viewblog from "./pages/Viewblog"

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/create" element={<Createblog />} />
         <Route path="/edit/:id" element={<Updateblog />} />
         <Route path="/blog/:id" element={<Viewblog />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App

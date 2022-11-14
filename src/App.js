import "./style/app.css"
import { Dashboard } from "./pages/Dashboard";
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Login } from "./components/auth/Login";
import { ProtectedRoute } from "./components/protectedRote/ProtectedRoute";
import { Register } from "./components/auth/Registro";


function App() {


  return(
    <div>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
    </div>
  )
}
export default App;

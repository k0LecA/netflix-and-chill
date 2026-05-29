import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/views/Home'
import { AuthProvider } from '@/hooks/useAuth'
import SignIn from '@/views/Login'
import SignUp from '@/views/SignUp'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
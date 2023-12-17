import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/auth";
import { Task } from "./pages/Task";
import { TaskForm } from "./pages/TaskForm";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Task />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/task/:id" element={<TaskForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />


        {}
        <Route path="/owner/dashboard" element={<h1>Owner Dashboard</h1>} />
        <Route path="/student/dashboard" element={<h1>Student Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

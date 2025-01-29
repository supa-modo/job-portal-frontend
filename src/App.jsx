import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

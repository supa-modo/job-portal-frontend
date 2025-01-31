import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EmployeesPage from "./pages/EmployeesPage";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

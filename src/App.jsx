import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EmployeesPage from "./pages/EmployeesPage";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import JobListings from "./pages/JobListings";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="joblistings" element={<JobListings />} />
        </Routes>
      </MainLayout>
      <Routes>
        <Route path="/" element={<JobListings />} />
      </Routes>
    </Router>
  );
}

export default App;

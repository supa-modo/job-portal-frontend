import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EmployeesPage from "./pages/EmployeesPage";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import JobListings from "./pages/JobListings";
import AuthPage from "./pages/AuthPage";
import JobApplicationPage from "./pages/JobApplicationPage";
import Candidates from "./pages/Candidates";
import Calendar from "./components/JobDetails Tabs/CalendarEventModal";

function App() {
  return (
    <Router>
      {/* <MainLayout>
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/joblistings" element={<JobListings />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/calendar" element={<Calendar />} />

          //TODO: To reorganize layout and remove later
          <Route path="/login" element={<AuthPage />} />
          <Route path="/apply" element={<JobApplicationPage />} />
        </Routes>
      </MainLayout> */}
      <Routes>
        <Route path="/" element={<JobListings />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/apply" element={<JobApplicationPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ResumeUpload from "./pages/ResumeUpload";
import JobListings from "./pages/JobListings";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<ResumeUpload />} />
          <Route path="/jobs" element={<JobListings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

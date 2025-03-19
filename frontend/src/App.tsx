import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupReport from "@/components/reports/GroupReport";
import VenueReport from "@/components/reports/VenueReport";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/reports/groups" element={<GroupReport />} />
        <Route path="/reports/venues" element={<VenueReport />} />
      </Routes>
    </Router>
  );
};

export default App;

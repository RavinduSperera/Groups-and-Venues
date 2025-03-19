import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupReport from "@/components/reports/GroupReport";
import VenueReport from "@/components/reports/VenueReport";
import GroupManagement from "@/pages/GroupManagement";
import VenueManagement from "@/pages/VenueManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/reports/groups" element={<GroupReport />} />
        <Route path="/reports/venues" element={<VenueReport />} />
        <Route path="/pages/groups" element={<GroupManagement/>}/>
        <Route path="/pages/venues" element={<VenueManagement/>}/>
      </Routes>
    </Router>
  );
};

export default App;

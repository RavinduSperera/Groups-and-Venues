import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import GroupManagement from "./components/groupManagement";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: 240, padding: 20 }}>
          <Routes>
            <Route path="/groups" element={<GroupManagement />} />
            {/* Add other pages here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

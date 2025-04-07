import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Landing page
import LandingPage from "./landingpage"

// Vendor pages
import VendorLogin from "./Vendor/vendorLogin"
import VendorSignup from "./Vendor/vendorSignup"

// Farmer pages
import FarmerLogin from "./Farmer/farmerLogin"
import FarmerSignup from "./Farmer/farmerSignup"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Vendor Routes */}
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/signup" element={<VendorSignup />} />

        {/* Farmer Routes */}
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/signup" element={<FarmerSignup />} />
      </Routes>
    </Router>
  )
}

export default App;

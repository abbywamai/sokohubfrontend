import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Landing page
import LandingPage from "./landingpage.tsx"

// Vendor pages
import VendorLogin from "./Vendor/vendorLogin.tsx"
import VendorSignup from "./Vendor/vendorSignup.tsx"

// Farmer pages
import FarmerLogin from "./Farmer/farmerLogin.tsx"
import FarmerSignup from "./Farmer/farmerSignup.tsx"

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

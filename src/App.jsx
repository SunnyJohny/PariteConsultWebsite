import React from "react";
import "./App.css";
import AboutUs from "./components/About";

import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import SearchBar from "./components/SearchBar";

import equipmentData from "./data/equipmentData"; // Import the equipment data
import Equipment from "./components/EquipmentDisplay";
import WhatsAppIcon from "./components/watsappComponent";

function App() {
  return (
    <>
      {/* Search Bar */}
      <SearchBar products={equipmentData} />

      {/* Main Content */}
      <div className=" mt-[80px]"> 
        <Navbar />
        <Hero />
        <Equipment />

        <AboutUs />
      
        <Contact />
        <WhatsAppIcon />

        <Footer />

      </div>
    </>
  );
}

export default App;

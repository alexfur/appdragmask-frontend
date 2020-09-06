import React from "react";
import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./pages/home";

function App() {
  return (
    <div className="Site" style={{ marginLeft: "20%", marginRight: "20%" }}>
      <nav>
        <Navbar />
      </nav>
      <main className="Site-content">
        <Home />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

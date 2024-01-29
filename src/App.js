import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Voitures from "./components/Voitures";
import Footer from "./components/Footer";
import Messages from "./components/Messages";

const App = () => {
  const [chosenCars, setChosenCars] = useState([]);

  const handleChoose = (car) => {
    setChosenCars((prevChosenCars) => [...prevChosenCars, car]);
  };

  const cars = [
    { id: 1, name: "Voiture 1", model: "Modèle A", image: "cars1.jpg" },
    { id: 2, name: "Voiture 2", model: "Modèle B", image: "cars2.jpeg" },
    { id: 3, name: "Voiture 3", model: "Modèle C", image: "cars3.jpg" },
    { id: 4, name: "Voiture 4", model: "Modèle A", image: "cars1.jpg" },
    { id: 5, name: "Voiture 5", model: "Modèle B", image: "cars2.jpeg" },
    { id: 6, name: "Voiture 6", model: "Modèle C", image: "cars3.jpg" },
    { id: 7, name: "Voiture 7", model: "Modèle A", image: "cars1.jpg" },
    { id: 8, name: "Voiture 8", model: "Modèle B", image: "cars2.jpeg" },
  ];

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home onChoose={handleChoose} cars={cars} />}
          />
          <Route
            path="/voiture/:id"
            element={<Voitures cars={cars} onChoose={handleChoose} />}
          />
          <Route
            path="/messages"
            element={<Messages/>}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

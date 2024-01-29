import React from "react";
import { useParams } from "react-router-dom";
import "./Voitures.css";

const Voitures = ({ cars, onChoose }) => {
  const { id } = useParams();
  const car = cars.find((annonce) => annonce.idAnnonce === parseInt(id, 10));

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="voiture-details">
      <h2>{car.name}</h2>
      <img src={`/images/${car.image}`} alt={car.name} className="image" />
      <p>{car.model}</p>
      {/* Display other car details as needed */}
      <button onClick={() => onChoose(car)}>Choisir</button>
    </div>
  );
};

export default Voitures;

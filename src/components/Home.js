import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import axios from "axios";

// Configuration de la bibliothèque FontAwesome
config.autoAddCss = false; // Désactiver l'ajout automatique des styles

// Ajout des icônes à la bibliothèque
library.add(faAngleLeft, faAngleRight);


const Home = () => {
  const carsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);


  const [annonces,setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingInsert, setLoadingInsert] = useState(true);
  const [errorInsert, setErrorInsert] = useState(null);
  
  const fetchData = async() => {
    try {
      const annonceResponse = await axios.get(
        "https://annoncevoiture-production.up.railway.app/annonce/annonce"
      );
      setAnnonces(annonceResponse.data);
      
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleAdd = (id) => {
    try {
      setLoadingInsert(true);
      axios.post('http://annoncevoiture-production.up.railway.app/annonce-login/annoncefav', { idAnnonce : id });
      setLoadingInsert(false);
    } catch (errorInsert) {
      setErrorInsert(errorInsert);
      setLoadingInsert(false);
    }
};  


  const totalPages = Math.ceil(annonces.length / carsPerPage);

  // Calculer l'index de début et de fin des voitures à afficher sur la page actuelle
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;

  // Filtrer les voitures à afficher sur la page actuelle
  const displayedCars = annonces.slice(startIndex, endIndex);

  // Fonction pour passer à la page suivante
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Fonction pour passer à la page précédente
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="spinner"></div>
  if (error) return <div>Error: {error.message}</div>
  if (errorInsert) return <div>Error: {errorInsert.message}</div>


  return (
    <div className="container">
      <h1 className="heading">Bienvenue sur notre service de location de voiture</h1>
      <p className="paragraph">
        Découvrez notre large sélection de voitures et trouvez celle qui
        correspond à vos besoins.
      </p>

      <h2 className="subHeading">Voitures Disponibles</h2>
      <div className="list-container">
        <div className="pagination-arrows avant-container">
          <button onClick={prevPage} disabled={currentPage === 1}>
            previous
          </button>
        </div>
        <ul className="list">
          {displayedCars.map((annonce) => (
            <li key={annonce.idAnnonce} className="listItem">              
                <img src={`/images`}  className="image" />
              <div>

                <p>Proprietaire : {annonce.user.nomUtilisateur} <button>Contacter</button></p>
                <p>Marque : {annonce.voiture.marque.nomMarque}</p>
                <p>Categorie :{annonce.voiture.categorie.nomCategorie}</p>
                <p>Prix : {annonce.voiture.prix}</p>
                <p>Kilometrage : {annonce.voiture.kilometrage}</p>
                <p>Moteur : {annonce.voiture.moteur.nomMoteur}</p>
                <p>Date : {annonce.dateAnnonce}</p>
                <p><button onClick={() => handleAdd(annonce.idAnnonce)}>Ajouter en tant que Favorie</button></p>
              </div>
              </li>
          ))}
        </ul>
      <div className="pagination-arrows apres-container">
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          after
        </button>
      </div>
      </div>
    </div>
  );
};

export default Home;

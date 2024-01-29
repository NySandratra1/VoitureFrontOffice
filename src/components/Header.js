import React, { useState } from "react";
import axios from "axios";
import "./Header.css";

const Header = ({ history, handleSubmit }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://annoncevoiture-production.up.railway.app/annonce/signin', {
        mail: email,
        motDePasse: password
      });
      
      console.log('Login successful:', response.data);
      // Store the token in localStorage
      localStorage.setItem('accessToken', response.data.token);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={`/images/logo.jpeg`} alt="logo.jpeg" className="image" />
      </div>
      <div id="tete">
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/">Accueil</a>
            </li>
            <li className="nav-item">
              <a href="/messages">Messages</a>
            </li>
          </ul>
        </nav>

        <div className="search-bar">
          <input type="text" placeholder="Rechercher une voiture" />
          <button onClick={handleSubmit}><span className="search-icon">&#128269;</span></button>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Connexion
        </button>

        {showLogin && <div className="blur-overlay" onClick={closeLogin} />}

        {showLogin && (
          <div className="login-modal">
            <span className="close-button" onClick={closeLogin}>
              &times;
            </span>

            <h2>Connexion</h2>
            <form onSubmit={handleLoginFormSubmit}>
              <p>
                <label htmlFor="email">Adresse e-mail:</label>
                <input 
                  type="text" 
                  id="email" 
                  name="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </p>
              <p>
                <label htmlFor="password">Mot de passe:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </p>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit">Se connecter</button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

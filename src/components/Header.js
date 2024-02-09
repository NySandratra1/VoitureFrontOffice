import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

const Header = ({ history, handleSubmit }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          "https://annoncevoiture-production.up.railway.app/annonce-login/utilisateur",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      }
    } catch (error) {
      // Handle error, e.g., redirect to login page
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://annoncevoiture-production.up.railway.app/annonce/signin",
        {
          mail: email,
          motDePasse: password,
        }
      );

      console.log("Login successful:", response.data);
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      window.location.reload();
      closeLogin();

      // Fetch user data after successful login
      fetchUserData();
    } catch (error) {
      setError(error);
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
            <li className="nav-item">
              <a href="/favorie">Favorie</a>
            </li>
          </ul>
        </nav>

        <div className="search-bar">
          <input type="text" placeholder="Rechercher une voiture" />
          <button onClick={handleSubmit}><span className="search-icon">&#128269;</span></button>
        </div>

        {user && (<p>{user.nomUtilisateur}</p>)}

        <button className="login-button" onClick={handleLogin}>
          Connexion
        </button>

        {user && (<button className="login-button" onClick={handleLogout}>
          Logout
        </button>)}

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
                  value="Kawaiisandy2@gmail.com" 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </p>
              <p>
                <label htmlFor="password">Mot de passe:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value="1234" 
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

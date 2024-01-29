import React, { useState } from "react";
import "./Messages.css";

const Messages = () => {
  const initialMessages = {
    "User 1": [
      { id: 1, text: "Salut User 1!", sender: "user" },
      { id: 2, text: "Bonjour!", sender: "user1" },
    ],
    "User 2": [
      { id: 1, text: "Salut User 2!", sender: "user" },
      { id: 2, text: "Bonjour!", sender: "user2" },
    ],
  };

  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("User 1"); // Utilisateur par défaut
  const [userMessages, setUserMessages] = useState(initialMessages);

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      const newMessage = {
        id: userMessages[selectedUser].length + 1,
        text: currentMessage,
        sender: "user",
      };
  
      setUserMessages((prevMessages) => {
        return {
          ...prevMessages,
          [selectedUser]: [...prevMessages[selectedUser], newMessage],
        };
      });
  
      setCurrentMessage("");
    }
  };
  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleEditMessage = (messageId) => {
    const messageToEdit = userMessages[selectedUser].find(
      (message) => message.id === messageId && message.sender === "user"
    );

    if (messageToEdit) {
      const newText = prompt("Modifier le message", messageToEdit.text);
      if (newText !== null) {
        const updatedMessages = userMessages[selectedUser].map((message) =>
          message.id === messageId ? { ...message, text: newText } : message
        );

        setUserMessages((prevMessages) => ({
          ...prevMessages,
          [selectedUser]: updatedMessages,
        }));
      }
    } else {
      alert("Vous ne pouvez modifier que vos propres messages.");
    }
  };

  const handleDeleteMessage = (messageId) => {
    const confirmed = window.confirm("Voulez-vous supprimer ce message ?");
    if (confirmed) {
      const updatedMessages = userMessages[selectedUser].filter(
        (message) => message.id !== messageId
      );

      setUserMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: updatedMessages,
      }));
    }
  };

  const filteredMessages = userMessages[selectedUser];

  return (
    <div className="chat-container">
      <div className="sidebar">
        {Object.keys(initialMessages).map((user) => (
          <div className="other-user" key={user}>
            ✏️<a href="#" onClick={() => handleUserSelection(user)} id="lien">
              {user}
            </a>
          </div>
        ))}
      </div>
      <h3 id="titre">Discussion avec {selectedUser}</h3>
      <div className="message-list">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={message.sender === "user" ? "user-message" : "autre-message"}
          >
            <p>
              <strong>{message.sender === "user" ? "Vous" : message.sender}:</strong>{" "}
              {message.text}{" "}
              {message.sender === "user" && (
                <>
                  <button className="small-button" onClick={() => handleEditMessage(message.id)}>
                    ✏️
                  </button>{" "}
                  <button className="small-button" onClick={() => handleDeleteMessage(message.id)}>
                    🗑️
                  </button>
                </>
              )}
            </p>
          </div>
        ))}
        <div className="input-container">
          <input
            type="text"
            placeholder={`Saisissez votre message à ${selectedUser}...`}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;

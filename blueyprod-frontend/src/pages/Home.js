import React, { useState, useEffect } from 'react';
import './Home.css'

function Home() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null)


    useEffect(() => {
      fetch ('https://blueyprod.onrender.com/cards')
      // fetch('http://localhost:3000/cards')  
      
        .then(response => response.json())
        .then(data => {
          console.log('Fetched cards:', data);  // ADD THIS LINE
          setCards(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleClose = () => {
    setSelectedCard(null)
  }

 
  return (
    <div>
      <h1>Happy Birthday, Millie!</h1>
      <div className="cards-grid">
        {cards.map(card => (
          <div key={card.id} 
          className="greeting-card"
          onClick={() => handleCardClick(card)}
          >
          <div className='card-front'>
              <span className="birthday-icon">🎉</span>
              <p className="from-text">From: {card.name}</p>
          </div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <div className="card-modal" onClick={handleClose}>
          <div className="card-expanded" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>×</button>
            
            <div className="card-content">
              <h2>From: {selectedCard.name}</h2>
              
              {selectedCard.image_url && (
                <img src={selectedCard.image_url} alt="Card" className="card-image" />
              )}
              
              <p className="card-message">{selectedCard.message}</p>
              
              {selectedCard.music_recommendation && (
                <div className="music-section">
                  <p className="music-label">🎵 Song Recommendation:</p>
                  <p className="music-rec">{selectedCard.music_recommendation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
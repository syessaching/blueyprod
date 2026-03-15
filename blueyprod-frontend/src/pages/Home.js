import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import presents from './presents.json'; 
import boxes from './boxes.json'; 
import './Home.css'

function Home() {
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null)

  const randomImages = ['/babytoothless.png', '/toothlesscupcake.png', '/lightfury.png'];
  
  const getImageForCard = (cardId) => {
    return randomImages[cardId % 3]; // Uses card ID to pick image
  };

  const getCardColors = (cardId) => {
  const colorThemes = [
    { bg: 'linear-gradient(135deg, #7b4a1e 0%, #f0d0a0 100%)' }, // Flat white
    { bg: 'linear-gradient(135deg, #3b1f0a 0%, #d4a96a 100%)' }, // Americano
    { bg: 'linear-gradient(135deg, #1b6b5a 0%, #a8d4e8 100%)' }, // Baby Toothless
    { bg: 'linear-gradient(135deg, #7a2060 0%, #ff7eb3 100%)' }, // Hibiscus
    { bg: 'linear-gradient(135deg, #c0623a 0%, #ffd8c0 100%)' }, // Peach bloom
    { bg: 'linear-gradient(135deg, #e8896a 0%, #fff0e8 100%)' }, // Sorbet
    { bg: 'linear-gradient(135deg, #e6a800 0%, #fff8cc 100%)' }, // Buttercup

  ];
  const scrambled = (cardId * 3 + 2) % colorThemes.length;
  return colorThemes[scrambled];
  };  

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
    <div className='home-container'>
       {/* Top left - boxes */}
      <Lottie 
        animationData={boxes}
        loop={true}
        style={{ 
          width: '200px',
          height: '200px',
          position: 'absolute',
          left: '1%',
          top: '0%',
          opacity: 0.8
        }}
      />

      {/* Top right - boxes */}
      <Lottie 
        animationData={boxes}
        loop={true}
        style={{ 
          width: '200px',
          height: '200px',
          position: 'absolute',
          right: '1%',
          top: '0%',
          opacity: 0.8
        }}
      />
      <h1>Happy Birthday, Millie!</h1>
      <div className="cards-grid">
        {cards.map(card => (
          <div key={card.id} 
          className="greeting-card"
          onClick={() => handleCardClick(card)}
          style={{ position: 'relative' }}  // 👈 ADD THIS
          >
            {isAdmin && (  // 👈 ADD THIS BLOCK
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  fetch(`https://blueyprod.onrender.com/cards/${card.id}`, { method: 'DELETE' })
                    .then(() => setCards(cards.filter(c => c.id !== card.id)));
                }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer',
                  zIndex: 10,
                  fontSize: '16px'
                }}
              >×</button>
            )}
          
          <div className='card-front'
            style={{
            background: getCardColors(card.id).bg,
            borderColor: getCardColors(card.id).border
            }}  
          >
                <img 
                  src={getImageForCard(card.id)}
                  alt="Dragon"
                  className="card-dragon-icon"
                />
              <p className="from-text">From: {card.name}</p>
          </div>
          </div>
        ))}
      </div>
        <Lottie 
        animationData={presents}
        loop={true}
        style={{ 
          width: '200px',
          height: '200px',
          position: 'absolute',
          left: '1%',
          bottom: '2%',
          opacity: 0.8
        }}
      />

        {/* Bottom right - presents */}
        <Lottie 
          animationData={presents}
          loop={true}
          style={{ 
            width: '200px',
            height: '200px',
            position: 'absolute',
            right: '1%',
            bottom: '2%',
            opacity: 0.8
          }}
        />

      

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
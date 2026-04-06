import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import jsPDF from 'jspdf';
import presents from './presents.json'; 
import boxes from './boxes.json'; 
import './Home.css'

function Home() {
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

const generatePDF = async () => {
    setIsGeneratingPDF(true);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;

    // Strip emojis helper
    const stripEmojis = (str) => str ? str.replace(/[\u{1F300}-\u{1FFFF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{FE00}-\u{FE0F}|\u{1F900}-\u{1F9FF}]/gu, '').trim() : '';

    // Cover page
    pdf.setFillColor(14, 31, 61);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(32);
    pdf.setFont('times', 'italic');
    pdf.text('Happy Birthday, Millie!', pageWidth / 2, pageHeight / 2 - 20, { align: 'center' });
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${cards.length} birthday cards from people who love you`, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });

    // One card per page
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      pdf.addPage();

      // Card background color
      const colors = [
        [123, 74, 30], [59, 31, 10], [27, 107, 90],
        [122, 32, 96], [192, 98, 58], [232, 137, 106], [230, 168, 0]
      ];
      const colorIndex = (card.id * 3 + 2) % colors.length;
      const [r, g, b] = colors[colorIndex];
      pdf.setFillColor(r, g, b);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // From name
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`From: ${card.name}`, margin, 30);

      // Divider line
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(0.5);
      pdf.line(margin, 35, pageWidth - margin, 35);

      // Image — top right
      let imageLoaded = false;
      if (card.image_url) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = card.image_url;
          });

          const maxW = 70;
          const maxH = 70;
          const ratio = Math.min(maxW / img.width, maxH / img.height);
          const imgW = img.width * ratio;
          const imgH = img.height * ratio;

          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const imgData = canvas.toDataURL('image/jpeg');

          pdf.addImage(imgData, 'JPEG', pageWidth - margin - imgW, 45, imgW, imgH);
          imageLoaded = true;
        } catch (e) {
          console.log('Could not load image for card', card.id);
        }
      }

      // Message
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(255, 255, 255);
      const cleanMessage = stripEmojis(card.message);
      const messageWidth = imageLoaded ? pageWidth - margin * 2 - 80 : pageWidth - margin * 2;
      const splitMessage = pdf.splitTextToSize(cleanMessage, messageWidth);
      pdf.text(splitMessage, margin, 48);

      // Music rec
      if (card.music_recommendation) {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(255, 220, 150);
        const cleanMusic = stripEmojis(card.music_recommendation);
        pdf.text(`Song recommendation: ${cleanMusic}`, margin, pageHeight - 20);
      }
    }

    pdf.save('Happy_Birthday_Millie.pdf');
    setIsGeneratingPDF(false);
  };
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
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={generatePDF}
          disabled={isGeneratingPDF}
          style={{
            padding: '12px 30px',
            background: 'linear-gradient(135deg, #1a3566, #6aafd4)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: isGeneratingPDF ? 'wait' : 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          {isGeneratingPDF ? '⏳ Generating PDF...' : '📄 Download All Cards as PDF'}
        </button>
      </div>
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
                <img src={selectedCard.image_url} alt="Card" className="card-image" crossOrigin="anonymous" />
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
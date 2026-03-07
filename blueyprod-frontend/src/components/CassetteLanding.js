import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'
import fireworksAnimation from './Confetti.json'
import './CassetteLanding.css';

function CassetteLanding({ audioRef, setIsPlaying } ) {
  const [isInserted, setIsInserted] = useState(false);
  const [isPlaying] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const navigate = useNavigate()
  // const canvasRef = useRef(null)

  const handleInsert = () => {
    console.log('Cassette clicked!', isInserted);
    setIsInserted(true);
      setTimeout(() => {
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 1000);
    setTimeout(() => {
      setIsMinimized(true);
    }, 4000);

    setTimeout(() => {
    setShowMessage(true);
    }, 9000);

    setTimeout(() => {
    setShowButton(true);
    }, 12000);

    setIsPlaying(true);

    if (audioRef.current) {
        audioRef.current.play();
      }
};

// useEffect(() => {
//   if (!isMinimized || !canvasRef.current) return;

//   const canvas = canvasRef.current;
//   const ctx = canvas.getContext('2d');
//   const particles = [];

//   class Particle {
//     constructor(x, y, color) {
//       this.x = x;
//       this.y = y;
//       this.vx = (Math.random() - 0.5) * 8;
//       this.vy = (Math.random() - 0.5) * 8;
//       this.color = color;
//       this.life = 100;
//     }

//     update() {
//       this.x += this.vx;
//       this.y += this.vy;
//       this.vy += 0.2; // gravity
//       this.life -= 1;
//     }

//     draw() {
//       ctx.fillStyle = this.color;
//       ctx.fillRect(this.x, this.y, 3, 3);
//     }
//   }

//   function createFirework(x, y) {
//     const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
//     const color = colors[Math.floor(Math.random() * colors.length)];
    
//     for (let i = 0; i < 50; i++) {
//       particles.push(new Particle(x, y, color));
//     }
//   }

//   function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     particles.forEach((p, index) => {
//       p.update();
//       p.draw();
//       if (p.life <= 0) particles.splice(index, 1);
//     });

//     requestAnimationFrame(animate);
//   }

//   // Launch fireworks every 500ms
//   const interval = setInterval(() => {
//     const x = Math.random() * canvas.width;
//     const y = Math.random() * canvas.height * 0.5;
//     createFirework(x, y);
//   }, 500);

//   animate();

//   return () => clearInterval(interval);
// }, [isMinimized]);
  
  return (
  <div className="cassette-container">
    {/* <h1>Let's go old school!</h1> */}
    {/* <audio ref={audioRef} loop>
        <source src="/haveitall.mp3" type="audio/mpeg" />
      </audio> */}
      {!isMinimized && <p className="subtitle">Click play to insert the cassette...</p>}
    {/* The Walkman/Player */}
    <div className={`walkman ${isMinimized ? 'minimized' : ''}`}>
      <div className="walkman-body">
        <div className="buttons">
            <div className="btn play"
              onClick={handleInsert}
              >▶
              
              <p>play</p>
            </div>
            <div className="btn stop"
              >■
              <p>stop</p>
            </div>
            
            <div className="btn rec">●
              <p>rec</p>
            </div>
            <div className="btn rew">⏪
              <p>rew</p>
            </div>
            <div className="btn load">⏩
              <p>ff</p>
            </div>
          </div>

        <div className="cassette-slot">
          <div className="slot-opening" />
          <div className="display-screen">
            <p className="track-status">
                {isPlaying ? '♫Track 01 - Have It All - Jason Mraz' : '🎵 No track playing . . . .'}
              </p>
          </div>
        </div>
        <div className="player-details">
          

          <div className="speaker-grill" />
          
        </div>
      </div>
    </div>

    <div 
      className={`cassette ${isInserted ? 'inserted' : ''}`}
      
    >
      <div className="cassette-body">
        {/* Top label area */}
        <div className="cassette-label">
          <span className="age-left">20</span>
          <div className="label-lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span className="age-right">26</span>
        </div>

        {/* Colored stripes */}
        <div className="color-stripes">
          <div className="stripe teal"></div>
          <div className="stripe coral"></div>
          <div className="stripe yellow"></div>
        </div>

        {/* Reels area */}
        <div className="reels-section">
          <div className="reel left-reel" />
          <div className="tape-visible"></div>
          <div className="reel right-reel" />
        </div>

        {/* Bottom screws */}
        <div className="screws">
          <div className="screw"></div>
          <div className="screw"></div>
          <div className="screw"></div>
          <div className="screw"></div>
        </div>
      </div>
    </div>
      {showMessage && (
        <div className="birthday-message">
          <h1 className="birthday-text">Happy Birthday,</h1>
          <h1 className="birthday-name">Millie!</h1>

           {showButton && (
            <button className="cards-button" onClick={() => navigate('/cards')}>
              See Your Birthday Cards 🎉
            </button>
          )}


        </div>
      )}

      {isMinimized && (
      <div className="fireworks-container">
        <Lottie 
          animationData={fireworksAnimation}
          loop={true}
          style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 999 }}
        />
      </div>
    )}
  </div>
);
}

export default CassetteLanding;
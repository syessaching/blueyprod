import React, { useState } from "react";
import Lottie from 'lottie-react';
import birthdayAnimation from './balloon.json';  
import birthdayconfetti from './banner.json';  
import birthdayGift from './Gift.json'; 
import './Contribute.css'

export default function Contribute() {
  const [formData, setFormData] = useState({
    name: '', 
    message: '',
    music_recommendation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('card[name]', formData.name)
    formDataToSend.append('card[message]', formData.message)
    formDataToSend.append('card[music_recommendation]', formData.music_recommendation)

    if(imageFile){
        formDataToSend.append('card[image]', imageFile)
    }

    const apiUrl = process.env.REACT_APP_API_URL || 'https://blueyprod.onrender.com';
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    fetch(`${apiUrl}/cards`, {
      method: 'POST',
      body: formDataToSend
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then(newCard => {
        setFormData({ name: '', message: '', music_recommendation: '' });
        setImageFile(null);
        setSubmitted(true);
        // setTimeout(() => setSubmitted(false), 3000);
      })
      .catch(err => {
        console.error('Submit failed', err);
      });
  }

  return (
    <div className="contribute-container">
      {submitted ? (
        // Celebration screen
        <div className="celebration-overlay">
          <Lottie 
            animationData={birthdayAnimation}
            loop={true}
            style={{ width: '100vw', height: '100vh', position: 'absolute', top: '50%', left: '50%', transform:  'translate(-50%, -50%) scale(1.5)'}}
          />
            <Lottie 
              animationData={birthdayconfetti}
              loop={true}
              style={{ 
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '-20%',  
                left: '-10%',
                transform: 'scale(1.8)'
              }}
            />
          <div className="thank-you-message">
            <h1>Thank You! 🎉</h1>
            <p>Your birthday card has been sent to Millie!</p>
          </div>
        </div>
      ) : (
        // Form screen
        <>
          <h1>Send Millie a Birthday Card!</h1>
          <p className="contribute-intro">Share your birthday wishes, a photo, and a song recommendation!</p>

             <Lottie 
                animationData={birthdayGift}
                loop={true}
                style={{ 
                  width: '300px',
                  height: '400px',
                  position: 'absolute',
                  left: '5%',
                  top: '30%',
                  opacity: 0.7
                }}
              />

              <Lottie 
                animationData={birthdayGift}
                loop={true}
                style={{ 
                  width: '300px',
                  height: '400px',
                  position: 'absolute',
                  right: '5%',
                  top: '30%',
                  opacity: 0.7
                }}
              />
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name='message'
              placeholder='Your Birthday message'
              value={formData.message}
              onChange={handleChange}
              required
            />
            <input 
              type='text'
              name='music_recommendation'
              placeholder='Music Recommendation'
              value={formData.music_recommendation}
              onChange={handleChange}
            />
            <input
              type='file'
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <button type="submit">Add Card</button>
          </form>
        </>
      )}
    </div>
  );
}
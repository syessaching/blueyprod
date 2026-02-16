import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([])
  const [formData, setFormData] = useState({
    name: '', 
    message: '',
    music_recommendation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/cards', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({card: formData})
    })
    .then(res => res.json())
    .then(newCard => {
      setCards([...cards, newCard]);
      setFormData({ name: '', message: '', music_recommendation: ''})
    })
  }

  useEffect(() => {
    fetch('http://localhost:3000/cards')
    .then(res=> res.json())
    .then(data => setCards(data));
  }, []);
  

    return (
      <div className="App">
        <h1> Birthday Cards for Millie!</h1>

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
          <button type ="submit"> Add Card</button>
        </form>

        <div className='cards-container'>
          {cards.map(card => (
            <div key={card.id} className='card'>
              <h3>{card.name}</h3>
              <p>{card.message}</p>
              <p>🎵 {card.music_recommendation}</p>
            </div>
          ))}

        </div>

      </div>
    )
}

export default App;

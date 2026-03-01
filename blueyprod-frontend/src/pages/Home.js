import React, {useState, useEffect} from 'react';


function Home() {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://blueyprod.onrender.com';

    useEffect(() => {
    fetch(`${apiUrl}/cards`)
        .then(res => res.json())
        .then(data => {
        console.log('Received data:', data);
        if (Array.isArray(data)) {
            setCards(data);
        } else {
            console.error('Data is not an array:', data);
            setCards([]);
        }
        })
        .catch(err => console.error('Error fetching cards:', err));
    }, [])
    
    return(
        <div>
            <h1> Happy Birthday, Millie! </h1>
            <div className='cards-container'>
                {cards.map(card => (
                    <div key={card.id} className='card'>
                        <h3>{card.name}</h3>
                        {card.image_url && (
                            <img src={card.image_url} alt={`${card.name}'s upload`} className='card-image' />
                        )}
                        <p>{card.message}</p>
                        <p>🎵 {card.music_recommendation}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;
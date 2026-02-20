import React, {useState} from "react";


function Contribute() {
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

    fetch('http://localhost:3000/cards', {
      method: 'POST', 
      body: formDataToSend
    })
    .then(res => res.json())
    .then(newCard => {
      setFormData({ name: '', message: '', music_recommendation: ''})
      setImageFile(null)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    })
  }


    return (
      <div>
        <h1> Add a Birthday Card for Millie!</h1>

        {submitted && <p className="success">Card added successfully! ✨</p>}

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
              <button type ="submit"> Add Card</button>
            </form>


      </div>
    )



}

export default Contribute;

// import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Player = () => {
  const {id} = useParams();
  const [apiData, setApiData] = useState({
    name : "",
    key: "",
    published_at: "",
    type: ""
  });
  const navigate = useNavigate();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDBhZWJjMjZmNDQ1MDYyY2Q5ZmY0ZmU5YTJmZTdlZSIsIm5iZiI6MTc4OTQ4NTg2Ni43OTMsInN1YiI6IjZhYTk2MzJhMjFmZTdlNjdmNzU3OWNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cEvid3PdWUH22zKCJEfQoF6Euxc1L2O9JxkXw9yUtSQ'
  }
};
useEffect(() =>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
}, []);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" className="back-arrow" onClick={() => navigate(-2)} />
      <iframe height="90%" width="90%" src={`https://www.youtube.com/embed/${apiData.key}`}   title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <div className="player-info">
        <p>{apiData.name}</p>
        <p>{apiData.published_at}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player

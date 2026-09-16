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
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`
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
        <p>{apiData.published_at.split('T')[0]}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player

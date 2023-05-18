import React, { useState, useEffect } from 'react';
import './main.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Main (props){
      const {Mainchangecolor, isWhite} = props;
      const mainText = {
         color: Mainchangecolor ? '#62ffe2' : 'black',
      }
      const buttonClasses = isWhite ? 'main__button-black' : 'main__button-white';
      const chartStyles = isWhite ? 'main__topchart-item-black' : 'main__topchart-item-white';   
      const inputClasses = isWhite ? 'main__input-white' : 'main__input-black';
      const [topChart, setTopChart] = useState ([]);
      const [seacrhItem,setSearchItem]= useState ('');
      const writeSearch = (event) => {
         setSearchItem(event.target.value.toLowerCase()
         .replace(/[^a-zA-Z0-9\s]/g, '')
         .replace(/(\b\w)/gi, (char) => char.toUpperCase()));
      }
      useEffect(() => {
         const apikey = 'f4d6d5d2e50ef2ac1722aee6c41a3b24';
         axios.get(`http://localhost:8080/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=worldwide&f_has_lyrics=1&apikey=${apikey}`)
           .then(response => {
             console.log(response.data);
             setTopChart(response.data.message.body.track_list);
           })
           .catch(error => {
             console.log(error);
           });
       }, []);
       
   return(
      <main className='main'>
         <div className="main__form">
            <h2 className='main__title' style={mainText}>Discover the words to your favorite tunes!</h2>
            <input type="text" className={inputClasses} value= {seacrhItem}placeholder='Write the song name here!' id="search-input" onChange={writeSearch}/>
            <Link to={`/list/mainlist/${seacrhItem}`} className='main__buttonlink'>
               <button className={buttonClasses}>Search</button>
            </Link>
         </div>
         <div className='main__topchart'>
            <h2 className='main__topchart-title' style={mainText}>Top-10 Tracks In This Week</h2>
            <ul className="main__topchart-list">
               {topChart.map((track, index) => (
                  <Link to={`/list/singlesong/${track.track.commontrack_id}/${track.track.track_id}`} className="main__topchart-link" key={index}>
                     <li className={chartStyles}>
                        <p className='main__topchart-track'>{index+1}. {track.track.track_name}</p>
                        <p className='main__topchart-name'>{track.track.artist_name}</p>
                        <p className="main__topchart-genre">{track.track.primary_genres && track.track.primary_genres.music_genre_list && track.track.primary_genres.music_genre_list[0] && track.track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</p>
                        <p className='main__topchart-rating'>{track.track.track_rating}</p>
                     </li>
                  </Link>
               ))}
            </ul>
         </div>
      </main>
   )
}

export default Main;
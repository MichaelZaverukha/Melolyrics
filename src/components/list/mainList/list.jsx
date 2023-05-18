import React from "react";
import './list.scss';
import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function MainList (props){
      const {Mainchangecolor,isWhite} = props;
      const {searchMusic} = useParams();
      const [list, setList] = useState ([]);
      const mainText = {
        color: Mainchangecolor ? '#62ffe2' : 'black',
     }
     const borderclasses = isWhite ? 'list__item-white' : 'list__item-black';
      useEffect(() => {
         const apikey = 'f4d6d5d2e50ef2ac1722aee6c41a3b24';
         axios.get(`http://localhost:8080/http://api.musixmatch.com/ws/1.1/track.search?q_track=${searchMusic}&page_size=10&page=1&s_track_rating=desc&apikey=${apikey}`)
           .then(response => {
             console.log(response.data);
             setList(response.data.message.body.track_list);
           })
           .catch(error => {
             console.log(error);
           });
       }, []);
   return(
      <main className="list">
        <h2 className="list__title" style={mainText}>Top 10 tracks for your query</h2>
         <ul className="list__menu">
           {list.map((track, index) => (
             <Link to={`/list/singlesong/${track.track.commontrack_id}/${track.track.track_id}`} className="list__link" key={index}>
              <li className={borderclasses} style={mainText}>
                  <div className="list__item-main">
                    <p className="list__item-title">{index+1}. {track.track.track_name}</p>
                  </div>
                  <div className="list__item-description">
                    <p className="list__item-artist">Artist: {track.track.artist_name}</p>
                    <p className="list__item-genre">Genre: {track.track.primary_genres && track.track.primary_genres.music_genre_list && track.track.primary_genres.music_genre_list[0] && track.track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</p>
                    <p className="list__item-rating">Rating: {track.track.track_rating}</p>
                  </div>
              </li>
             </Link>
           ))}
         </ul>
      </main>
   )
}

export default MainList;
import React from "react";
import './singlesong.scss';
import axios from "axios";
import { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";

function Singlesong(props){
      const {Mainchangecolor} = props
      const {commontrackId} = useParams();
      const {trackId} = useParams();
      const [track, setTrack] = useState ([]);
      const [lyrics,setLyrics] = useState([]);
      const mainText = {
        color: Mainchangecolor ? '#62ffe2' : 'black',
     }
   useEffect(() => {
      const apikey = 'f4d6d5d2e50ef2ac1722aee6c41a3b24';
      axios.get(`http://localhost:8080/https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${commontrackId}&apikey=${apikey}`)
        .then(response => {
          console.log(response.data);
          setTrack(response.data.message.body.track);
        })
        .catch(error => {
          console.log(error);
        });
    }, [commontrackId]);
    useEffect(() => {
      const apikey = 'f4d6d5d2e50ef2ac1722aee6c41a3b24';
      axios.get(`http://localhost:8080/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${apikey}`)
        .then(response => {
          console.log(response.data);
          setLyrics(response.data.message.body.lyrics);
        })
        .catch(error => {
          console.log(error);
        });
    }, [trackId]);

   return(
      <main>
        <div className="singlepage" style={mainText}>
          <div className="singlepage__lyrics-block">
            <p className="singlepage__lyrics">{lyrics.lyrics_body}</p>
          </div>
          <div className="singlepage__description">
            <h2 className="singlepage__name">{track.track_name}</h2>
            <p className="singlepage__artist">{track.artist_name}</p>
            <p className="singlepage__album">Album: {track.album_name}</p>
            <p className="singlepage__genre">Genre: {track.primary_genres && track.primary_genres.music_genre_list && track.primary_genres.music_genre_list[0] && track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</p>
            <p className="singlepage__rating">Rating: {track.track_rating}</p>
          </div>
          
        </div>
      </main>
   )
}

export default Singlesong;
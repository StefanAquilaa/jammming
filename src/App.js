import './App.css';
import Tracklist from './components/Track/Tracklist.js';
import Playlist from './components/Playlist/Playlist.js';
import SearchBar from './components/Search/SearchBar.js';
import {useState, useEffect} from 'react';



function App() {

  const CLIENT_ID = '1d77de4d56ef445785d7bf8bbd0b64bf';
const REDIRECT_URI = 'http://localhost:3000/jammming'; // Update with your callback URL;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'playlist-modify-private playlist-modify-public user-library-read';

const spotifyAuthUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;

//Get the Access Token from the URL with useEffect
const [accessToken, setAccessToken] = useState("");

useEffect(() =>{
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token");

  if(!accessToken && hash){
    token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

    window.location.hash = "";
    window.localStorage.setItem("token", token);
    
    
  }

  setAccessToken(token);

}, [accessToken])

//Removes the Access Token from the local storage and logouts user
const logout = () => {
  setAccessToken("");
  window.localStorage.removeItem("token");
};

  
  //Adds tracks to a custom playlist
  const [customTracks, setCustomTracks] = useState([]);
  const handlePlaylist = (track) => {

    setCustomTracks((prev) => {
      if (prev.some((t) => t.id === track.id)) {
        // Track is already in the playlist, so remove it
        return prev.filter((t) => t.id !== track.id);
      } else {
        // Track is not in the playlist, so add it
        return [track, ...prev];

      }
    });
  
};

 //Removes a song based on its unique ID
 const handleDelete = (songIdToRemove) => {
  setCustomTracks((prev) => prev.filter(
      (song) => song.id !== songIdToRemove
    ));
  };

// Function that handles search queries and sends them to SearchResults
const [searchQuery, setSearchQuery] = useState('');
const handleSearch = (query) => {
  setSearchQuery(query);
};

  if(!accessToken){
    return(  
        <div className="App">
          <header className="App-header">
          <div className='login-button-container'>
            {!accessToken? <a className="login-button" href={spotifyAuthUrl}>Login</a> : 
            <button className="logout-button" onClick={logout}>Logout</button>}
            </div>
            <div className="main-title-container">
              <p className="main-title">Jam<span style={{color:"#f8bfdf"}}>mm</span>ing</p>
            </div>
          </header>
          <main className='App-main'>
        <section className='search-section'>
          <div className='search-form'>
            <h2>Please Login</h2>
          </div>
        </section>
        <section className='display-section'>
          <div className='left-display-card'>
            <div className='track-list'>
              <h2>Results</h2>
            </div>
          </div>
          <div className='right-display-card'>
            <div className='custom-spotify-playlist'>
            </div>
          </div>
        </section>
      </main>
      <footer className='App-footer'>

      </footer>
    </div>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
      <div className='login-button-container'>
        {!accessToken? <a className="login-button" href={spotifyAuthUrl}>Login</a> : 
        <button className="logout-button" onClick={logout}>Logout</button>}
        </div>
        <div className="main-title-container">
          <p className="main-title">Jam<span style={{color:"#f8bfdf"}}>mm</span>ing</p>
        </div>
      </header>
      <main className='App-main'>
        <section className='search-section'>
          <div className='search-form'>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>
        <section className='display-section'>
          <div className='left-display-card'>
            <div className='track-list'>
              <h2>Results</h2>
               <Tracklist accessToken={accessToken} query={searchQuery} handlePlaylist={handlePlaylist} />
            </div>
          </div>
          <div className='right-display-card'>
            <div className='custom-spotify-playlist'>
              <Playlist accessToken={accessToken} setCustomTracks={setCustomTracks} trackUri={customTracks.map(track => track.uri)} customPlaylist={customTracks.map(track => (
                <li key={track.id}>
                  <div className='track-title'>
                      <h3>{track.name}</h3>
                      <button onClick={() => handleDelete(track.id)} key='removeSong' className='removeSong'>-</button>
                  </div>
                  <div className='track-description'>
                      <p>
                          {track.artists.map((artist, index) => (
                              <span key={`${artist.id}-${index}`}>
                                  {artist.name}
                                  {index < track.artists.length - 1 && ', '}
                              </span>
                          ))}
                          | 
                          <span>{track.album.name}</span>
                      </p>
                  </div>
                </li>
              ))}/>
            </div>
          </div>
        </section>
      </main>
      <footer className='App-footer'>

      </footer>
    </div>
  );
}

export default App;

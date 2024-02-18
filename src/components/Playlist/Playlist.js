import { useEffect, useState } from 'react';
import './Playlist.css';

function Playlist(props) {
  const { accessToken, setCustomTracks, trackUri, customPlaylist } = props;

  // Handles Playlist Title
  const [playlistTitle, setPlaylistTitle] = useState("");

  const handleChange = ({ target }) => {
    const title = target.value;
    setPlaylistTitle(title);
  };

  // Fetches the Spotify User's ID through useEffect
  const [spotifyUserId, setSpotifyUserId] = useState(null);

  useEffect(() => {
    const fetchSpotifyId = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          setSpotifyUserId(jsonResponse.id);
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const timeout = setTimeout(() => {
      fetchSpotifyId();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [accessToken]);

  // Create a New Playlist
  //const [newPlaylist, setNewPlaylist] = useState(null);

  /*const createNewPlaylist = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistTitle,
          public: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Playlist created successfully!`);
      } else {
        throw new Error(`Error creating playlist: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating playlist");
    }
  };*/

  const createNewPlaylist = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${spotifyUserId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistTitle,
          public: false
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error creating playlist: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Add Tracks To a Playlist
      const addTracksToPlaylist = async () => {
        try {
          const response = await fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uris: trackUri,
            })
          });
  
          if (!response.ok) {
            throw new Error(`Error adding tracks to playlist: ${response.statusText}`);
          }
  
          // Display success message or handle success in UI
          console.log('Tracks added successfully to playlist');
        } catch (error) {
          console.error(error);
          // Handle error adding tracks to playlist
        }
      };
  
      await addTracksToPlaylist();
    } catch (error) {
      console.error(error);
      // Handle error creating playlist
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (trackUri.length > 0 && playlistTitle.length > 0) {
      createNewPlaylist();
      setCustomTracks([]);
      setPlaylistTitle("");
    }
  };

  return (
    <>
      <form className='playlist-form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={playlistTitle} name="title" className="playlistTitle" type='text' minLength={3} maxLength={43} />
        <ul className='custom-playlist'>
          {customPlaylist}
        </ul>
        <input value="Save to Spotify" type="submit" className="saveToSpotify" />
      </form>
    </>
  );
}

export default Playlist;

import {useEffect, useState} from 'react';


function SearchResults({accessToken, query, handlePlaylist}){
    const [results, setResults] = useState(null);
    //const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&offset=0`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setResults(data.tracks.items); // Assuming data structure
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchDataFromAPI();
    }, [accessToken, query]);
    

  if (results) {
  return (
    <div className='search-results'>
      {
        results.map((track) => (
            <li key={track.id}>
                <div className='track-title'>
                    <h3>{track.name}</h3>
                    <button onClick={() => handlePlaylist(track)} key='addSong' className='addSong'>+</button>
                </div>
                <div className='track-description'>
                    <p>
                        {track.artists.map((artist, index) => (
                            <span key={`${artist.id}-${index}`}>
                                {artist.name}
                                {index < track.artists.length - 1 && ', '}
                            </span>
                        ))}
                        &nbsp;| 
                        &nbsp;<span>{track.album.name}</span>
                    </p>
                </div>
            </li>
        ))
      }
    </div>
  )
}

}


export default SearchResults;
import './Tracklist.css';
import Track from './Track';

function Tracklist({accessToken, query, handlePlaylist}){
    return(
        <ul className='tracklist'>
            <Track accessToken={accessToken} query={query} handlePlaylist={handlePlaylist}/>
        </ul>
    )
};

export default Tracklist;
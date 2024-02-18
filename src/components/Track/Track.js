import './Track.css'
//import {useState} from 'react';
import SearchResults from '../Search/SearchResults';

function Track(props){
    const {accessToken, query, handlePlaylist} = props;

    return(
        <>
          <SearchResults accessToken={accessToken} query={query} handlePlaylist={handlePlaylist}/>
        </>
    );
}

export default Track;
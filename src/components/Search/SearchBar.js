import { useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch}){
  const [query,setQuery] = useState("")

  const handleChange = ({target}) => {
    const query = target.value;
    setQuery(query);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(query.trim() !== 0){
      onSearch(query)
      setQuery("");
    }
  }

  return(
    <form className='search-form' onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={query} className="search-input" minLength={3} maxLength={23} required placeholder='Artists, tracks, albums...' />
        <input value="Search" type="submit" className="search-button" />
    </form>
  )
}

export default SearchBar;

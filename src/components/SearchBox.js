import React from 'react';

const SearchBox = (props) => {
    return(
    <div className="search-box">
        <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => props.setQuery(e.target.value)}
            value={props.query}
            onKeyPress={props.search}
          />
        </div>
    )
}

export default SearchBox;
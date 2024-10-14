import React from 'react';

const Search = () => {
  return (
    <div className="shop__sidebar__search">
        <form action="#">
            <input type="text" placeholder="Search..." />
                <button type="submit">
                <span className="icon_search"></span>
            </button>
        </form>
    </div>
  );
};

export default Search;
import React from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // We only call onSearch if the Enter key is pressed
    if (event.key === 'Enter') {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search items by name..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleSearchChange} // Use the onKeyPress event to detect Enter key
      />
    </div>
  );
};

export default SearchBar;

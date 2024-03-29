import React, { useState } from 'react';
import axios from 'axios';
import Config from '../utils/Config.js';

const SortFilter = ({ onSort }) => {
  const [sortMethod, setSortMethod] = useState('');
  const token = localStorage.getItem('token');

  const handleSortChange = async (event) => {
    const sortKey = event.target.value;
    setSortMethod(sortKey);

    let url = Config.fetchItemsUrl;
    if (sortKey) {
      url += `?ordering=${sortKey}`;
    }

    try {
      const response = await axios.get(url,
        {
            headers: {
                'Authorization': `Token ${token}` 
            }
        });
      onSort(response.data.items);
    } catch (error) {
      console.error('Error fetching sorted items:', error);
    }
  };

  return (
    <select value={sortMethod} onChange={handleSortChange}>
      <option value="">Sort by...</option>
      <option value="name">Sort by Name</option>
      <option value="category">Sort by Category</option>
      <option value="available_stock">Sort by Available Stock</option>
    </select>
  );
};

export default SortFilter;

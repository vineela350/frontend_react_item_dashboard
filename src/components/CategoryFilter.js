import React, { useState } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onFilter, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const token = localStorage.getItem('token');

    const handleCategoryChange = async (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

       
            try {
                const response = await axios.get(getItemsByCategoryUrl+`{category}`,
                {
                    headers: {
                        'Authorization': `Token ${token}` 
                    }
                });
                // onFilter is a callback function to update the state in the parent component
                const response1 = response.data.items;
                onFilter(response.data.items);
            } catch (error) {
                console.error('Error fetching items by category:', error);
            }
        
    };

    return (
        <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
        </select>
       
    );
};

export default CategoryFilter;

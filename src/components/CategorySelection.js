import React from 'react';

function CategorySelection({ categories, selectedCategory, onCategoryChange }) {
    return (
        <select value={selectedCategory} onChange={onCategoryChange}>
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}

  
export default CategorySelection;

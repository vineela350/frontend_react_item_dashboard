import React, { useState } from 'react';
import axios from 'axios';
import Config from '../utils/Config.js';


const AddNewCategoryForm = ({ onCategoryAdded, onClose }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const token = localStorage.getItem('token');

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(Config.fetchCategoriesUrl, {
        name: newCategoryName
      },
      {
        headers: {
            'Authorization': `Token ${token}` 
        }
    });
      console.log('Category added successfully', response.data);
      setNewCategoryName(''); // Reset the new category name
      onCategoryAdded(response.data); // Callback to inform parent component
    } catch (error) {
      console.error('Error adding category:', error);
      
      if (error.response) {
        if (error.response.status === 400) {
          // Check for unique constraint error in the response, adapt the condition as needed
          if (error.response.data.detail && error.response.data.detail === 'A category with this name already exists.') {
            alert("Category name already exists. Please choose a different name.");
          } else {
            // Handle other types of bad requests
            alert("There was an error processing your request.");
          }
        }
      }
    }
    
  };

  return (
    <div className="add-category-popup">
      <input
        type="text"
        placeholder="Enter category name"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
     <button onClick={handleAddCategory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
  Submit
</button>
<button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
  Cancel
</button>

    </div>
  );
};

export default AddNewCategoryForm;

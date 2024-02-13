import React from 'react';
import CategorySelection from './CategorySelection';
import TagSelection from './TagSelection';


// Import TagSelection component if you have one

const NewItemForm = ({ categories, tags, newItemData, setNewItemData, onAddNewItem , onClose}) => {
  const handleCategoryChange = (e) => {
    if (e && e.target) {
      const categoryId = e.target.value;
      console.log("hello");
      const category = categories.find(cat => cat.id.toString() === categoryId);
      setNewItemData(prevData => ({
        ...prevData,
        category: category ? { id: category.id, name: category.name } : { id: '', name: '' }
      }));
      console.log("category");
      console.log(category);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNewItem(newItemData); // Assuming onAddNewItem is a prop passed down that handles the POST request.
  };


  

  const handleTagsChange = (selectedTagIds) => {
    // Assuming `tags` is available in the scope and is an array of tag objects
    const selectedTags = tags.filter(tag => selectedTagIds.includes(tag.id.toString()));
    setNewItemData({ ...newItemData, tags: selectedTags });
  };

  return (
    // <div className="new-item-form">
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter SKU:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="SKU"
              value={newItemData.sku}
              onChange={(e) => setNewItemData({ ...newItemData, sku: e.target.value })}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter Name:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              value={newItemData.name}
              onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
            />
          </label>

            <label className="block text-sm font-medium text-gray-700">
              Select Category:
              <CategorySelection
                categories={categories}
                selectedCategory={newItemData.category.id.toString()}
                onCategoryChange={handleCategoryChange}
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Select Tag(s):
              <TagSelection
                tags={tags}
                selectedTags={newItemData.tags}
                onTagsChange={handleTagsChange}
              />
            </label>

            <label className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">
                In Stock:
              </span>
              <input
                type="checkbox"
                checked={newItemData.in_stock}
                onChange={(e) => setNewItemData({ ...newItemData, in_stock: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Number of Stocks:
              <input 
                type="number" 
                value={newItemData.available_stock} 
                onChange={(e) => setNewItemData({ ...newItemData, available_stock: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Available Stock" 
              />
            </label>
            </form>
            </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => onAddNewItem(newItemData)}
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          
          
        </div>
      </div>
    </div>


     
     
    
  );
};

export default NewItemForm;

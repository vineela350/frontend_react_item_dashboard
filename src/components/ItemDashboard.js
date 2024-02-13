import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item'; // Adjust the import path as necessary
import NewItemForm from './NewItemForm.js';
import AddNewCategoryForm from './AddNewComponentForm.js';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import Config from '../utils/Config.js';

const ItemDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsData, setItemsData] = useState([]); // To hold the items data
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false); // State to control the popup visibility
    const [showNewItemForm, setShowNewItemForm] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [newItemData, setNewItemData] = useState({
        sku: '',
        name: '',
        category: { id: '', name: '' }, // You might need to handle this as an object or id if it's a foreign key
        tags: [], // This will be an array of ids or tag objects
        in_stock: true,
        available_stock: '0',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const token = localStorage.getItem('token');

    const handleCloseNewItemForm = () => {
        setShowNewItemForm(false);
    };

    const handleCloseNewCategoryForm = () => {
        setShowAddCategoryPopup(false);
    };

    // Function to fetch items from the backend
    const fetchItems = async () => {
        try {
            const response = await axios.get(Config.fetchItemsUrl,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
            setItems(response.data.items);
            setTotalItems(response.data.items.length); // Update the total items count
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    // Function to fetch items from the backend
    const fetchItemsForSearch = async (searchTerm) => {
        const trimmedSearchTerm = searchTerm.trim();

        const url = trimmedSearchTerm
            ? Config.fetchItemsForSearchUrl+`${encodeURIComponent(trimmedSearchTerm)}`
            : Config.fetchItemsUrl;

        try {
            // If searchTerm is not empty, fetch filtered items
            if (searchTerm) {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setItems(response.data.items);
                setTotalItems(response.data.items.length);
            } else {
                // If searchTerm is empty, fetch all items
                const response = await axios.get(Config.fetchItemsUrl, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
                );
                setItems(response.data.items);
                setTotalItems(response.data.items.length);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };



    // Function to handle the deletion of an item
    const handleDeleteItem = async (itemId) => {
        try {
            // Make the DELETE request to your backend
            await axios.delete(Config.fetchItemsUrl+`${itemId}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
            );

            // Update the itemsData state to filter out the deleted item
            setItems(prevItems => prevItems.filter(item => item.id !== itemId));

            // Update the totalItems state
            setTotalItems(prevTotalItems => prevTotalItems - 1);

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleLogout = () => {
        // Perform any logout logic here, like clearing tokens or state
        // For example, if you're using localStorage to store a token:
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/');
    };



    useEffect(() => {
        // Function to fetch categories
        const fetchCategories = async () => {
            try {
                const response = await axios.get(Config.fetchCategoriesUrl, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
                );
                setCategories(response.data.categories);
                setTotalCategories(response.data.categories.length); // Assuming response.data is an array of categories
                // console.log(response.data.categories)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await axios.get(Config.fetchTagsUrl, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
                );
                setTags(response.data.tags);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        // Function to fetch items
        const fetchItems = async () => {
            try {
                const response = await axios.get(Config.fetchItemsUrl,
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                setItems(response.data.items);
                setItemsData(response.data); // Assuming response.data is an array of items
                setTotalItems(response.data.items.length);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        if (searchTerm) {
            axios.get(Config.fetchItemsForSearchUrl+`${searchTerm}`,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                .then(response => {
                    // Assuming the API returns the filtered items
                    setItems(response.data.items);
                })
                .catch(error => {
                    console.error('There was an error fetching the items', error);
                });
        }

        fetchTags();
        fetchCategories();
        fetchItems();
    }, []); // Empty dependency array means this effect runs once on mount

    const handleAddNewCategory = async (newCategory) => {
        try {

            // After a successful post, update the categories state
            setCategories(prevCategories => [...prevCategories, newCategory]);

            // Update the total number of categories
            setTotalCategories(prevTotalCategories => prevTotalCategories + 1);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        fetchItemsForSearch(searchTerm);
    };

    // Callback function to update the items based on the selected category
    const handleFilterByCategory = (items) => {
        console.log("category");
        console.log(items);
        setItems(items);
    };

    const handleSortItems = (sortedItems) => {
        setItems(sortedItems);
    };

    const handleAddNewItem = async () => {
        try {
            // Adjust the payload to match the backend expectations
            const payload = {
                ...newItemData,
                // Assuming the backend expects category as an object with id and name
                category: typeof newItemData.category === 'object' ? newItemData.category : { id: newItemData.category, name: '' },
                // Assuming the backend expects tags as an array of objects with id and name
                tags: newItemData.tags.map(tag => typeof tag === 'object' ? tag : { id: tag, name: '' })
            };

            console.log('Sending payload:', payload);
            console.log(token);
            const response = await axios.post(Config.fetchItemsUrl, payload, {
                headers: {
                    'Authorization': `Token ${token}`  // Assuming 'token' is defined and holds the value of the auth token
                }
            });
            //  console.log('Item added successfully', response.data);

            // Reset the newItemData to initial state
            setNewItemData({
                sku: '',
                name: '',
                category: { id: '', name: '' },
                tags: [],
                in_stock: true,
                available_stock: '0',
            });

            // Fetch the items again to update the list
            await fetchItems();
            //   await fetchCategories();
        } catch (error) {
            alert("Error adding item, check all fields");
            console.error('Error adding item:', error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-5">
            <div className="container mx-auto my-5 p-5 bg-white shadow-lg rounded-lg">
                <div className="mb-5">
                    <h1 className="text-xl font-semibold text-gray-700">Item Dashboard</h1>
                    <div className="mt-6 flex justify-between items-center">
                        <div className="flex space-x-4">
                            <div className=" text-base bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                                Total Categories: {totalCategories}
                            </div>
                            <div className=" text-base bg-green-100 text-green-800 px-4 py-2 rounded-full">
                                Total Items: {totalItems}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowAddCategoryPopup(true)}
                                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition ease-in-out duration-300"
                            >
                                <FaPlus className="mr-2" /> Add New Category
                            </button>
                            <button
                                onClick={() => setShowNewItemForm(true)}
                                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ease-in-out duration-300"
                            >
                                <FaPlus className="mr-2" /> Add New Item
                            </button>
                        </div>
                    </div>
                </div>
                {showAddCategoryPopup && (

                    <AddNewCategoryForm
                        onCategoryAdded={(newCategory) => {
                            handleAddNewCategory(newCategory);
                            setShowAddCategoryPopup(false);

                        }}
                        onClose={handleCloseNewCategoryForm}
                    />
                )}
                {showNewItemForm && <NewItemForm
                    categories={categories}
                    tags={tags}
                    newItemData={newItemData}
                    setNewItemData={setNewItemData}
                    onAddNewItem={handleAddNewItem}
                    onClose={handleCloseNewItemForm}
                />}
                {/* <SearchBar onSearch={handleSearch} />
                <CategoryFilter  categories={categories} onFilter={handleFilterByCategory} />
                <SortFilter onSort={handleSortItems} /> */}

                <div className="flex space-x-4 mb-4">
                    {/* Search Bar */}
                    <div className="flex items-center space-x-2">
                        <FaSearch className="text-gray-400" />
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center space-x-2">
                        <FaFilter className="text-gray-400" />
                        <CategoryFilter onFilter={handleFilterByCategory} categories={categories} />
                    </div>

                    {/* Sort Filter */}
                    <div className="flex items-center space-x-2">
                        <FaSort className="text-gray-400" />
                        <SortFilter onSort={handleSortItems} />
                    </div>
                </div>
                <Item items={items} handleDeleteItem={handleDeleteItem} />


                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Logout
                </button>

            </div>
        </div>
    );
};

export default ItemDashboard;

import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon from react-icons

const Item = ({ items , handleDeleteItem}) => {

    return (
        <div className="container mx-auto mt-10">
            <div className="flex flex-col">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SKU
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tags
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    In Stock
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Available Stock
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.sku}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.tags.map(tag => tag.name).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.in_stock ? 'Yes' : 'No'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.available_stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900">
                                            <FaTrashAlt /> {/* Display the trash icon */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Item;

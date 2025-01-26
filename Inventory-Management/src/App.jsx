import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [inventory, setInventory] = useState([
    { id: uuidv4(), name: 'Item A', category: 'Category 1', quantity: 5 },
    { id: uuidv4(), name: 'Item B', category: 'Category 2', quantity: 20 },
    { id: uuidv4(), name: 'Item C', category: 'Category 1', quantity: 8 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Add new item to inventory
  const addItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) {
      alert('Please fill in all fields');
      return;
    }
    setInventory([...inventory, { ...newItem, id: uuidv4(), quantity: parseInt(newItem.quantity) }]);
    setNewItem({ name: '', category: '', quantity: '' });
  };

  // Delete an item from inventory
  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // Edit an item in inventory
  const editItem = (id) => {
    const item = inventory.find((item) => item.id === id);
    setNewItem({ name: item.name, category: item.category, quantity: item.quantity.toString() });
    deleteItem(id);
  };

  // Filter inventory items by category
  const filteredItems = inventory.filter((item) =>
    filterCategory ? item.category === filterCategory : true
  );

  // Sort inventory items by quantity
  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === 'asc') return a.quantity - b.quantity;
    return b.quantity - a.quantity;
  });

  return (
    <div className="app">
      <h1>Inventory Management</h1>

      {/* Form to add or edit an item */}
      <div className="form-container">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* Filter and Sort options */}
      <div className="filter-sort-container">
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="">All Categories</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Quantity ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      {/* Inventory Table */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} style={{ backgroundColor: item.quantity < 10 ? '#ffcccc' : 'transparent' }}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

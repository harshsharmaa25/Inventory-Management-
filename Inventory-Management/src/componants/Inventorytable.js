import React, { useState, useEffect } from 'react';

const InventoryTable = ({ items, onAddItem, onEditItem, onDeleteItem }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortByQuantity, setSortByQuantity] = useState(false);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );

    if (sortByQuantity) {
      setFilteredItems(
        filtered.sort((a, b) => (a.quantity > b.quantity ? 1 : -1))
      );
    } else {
      setFilteredItems(filtered);
    }
  }, [items, categoryFilter, sortByQuantity]);

  const handleAddItem = () => {
    onAddItem();
  };

  const handleEditItem = (item) => {
    onEditItem(item);
  };

  const handleDeleteItem = (id) => {
    onDeleteItem(id);
  };

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        <button onClick={() => setSortByQuantity(!sortByQuantity)}>
          Sort by Quantity
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>
                {item.quantity} {item.quantity < 10 && <span className="low-stock"> (Low)</span>}
              </td>
              <td>
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default InventoryTable;
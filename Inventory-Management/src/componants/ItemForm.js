    import React, { useState } from 'react';

    const AddItemForm = ({ onAddItem }) => {
      const [name, setName] = useState('');
      const [category, setCategory] = useState('');
      const [quantity, setQuantity] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (name && category && quantity) {
          onAddItem({ name, category, quantity });
          setName('');
          setCategory('');
          setQuantity('');
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button type="submit">Add Item</button>
        </form>
      );
    };

    export default ItemForm;
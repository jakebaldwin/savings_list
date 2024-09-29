import React, { useState } from 'react';
import '../styles/AddItemModal.css';

const AddItemModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [amountToSave, setAmountToSave] = useState('');
  const [amountSaved, setAmountSaved] = useState('');

  const handleSave = () => {
    const newItem = {
      id: Math.random(),
      name,
      amountSaved: `$${amountSaved}/$${amountToSave}`,
      imageUrl,
    };
    onSave(newItem);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Item</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Amount to Save:</label>
          <input type="number" value={amountToSave} onChange={(e) => setAmountToSave(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Amount Saved:</label>
          <input type="number" value={amountSaved} onChange={(e) => setAmountSaved(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>cancel</button>
          <button onClick={handleSave}>save</button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;

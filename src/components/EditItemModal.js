import React, { useState } from 'react';
import '../styles/EditItemModal.css';

const EditItemModal = ({ item, onClose, onUpdate, onDelete, onMarkAsPurchased }) => {
  const [name, setName] = useState(item.name);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [amountToSave, setAmountToSave] = useState(item.amountToSave);
  const [amountSaved, setAmountSaved] = useState(item.amountSaved);

  const handleUpdate = () => {
    const updatedItem = {
      ...item,
      name,
      imageUrl,
      amountToSave,
      amountSaved,
    };
    onUpdate(updatedItem);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
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
          <button onClick={handleUpdate}>save</button>
          <button onClick={() => { onMarkAsPurchased(item.id); onClose(); }}>mark bought</button>
          <button className="delete-button" onClick={() => { onDelete(item.id); onClose(); }}>delete</button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;

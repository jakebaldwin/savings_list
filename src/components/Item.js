import React, { useState } from 'react';
import '../styles/Item.css';
import EditItemModal from './EditItemModal';

const Item = ({ item, onUpdateItem, onDeleteItem, onMarkAsPurchased, onEditItem }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const progressPercentage = Math.min(
    (parseInt(item.amountSaved) / parseInt(item.amountToSave)) * 100,
    100
  );
  return (
    <div className="item-container">
      <div className="item-image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-name">{item.name}</div>
        <div className="item-saved">{`$${item.amountSaved}/$${item.amountToSave}`}</div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="item-menu" onClick={() => onEditItem(item)}>
        ⋮
      </div>
    </div>
  );
};

export default Item;

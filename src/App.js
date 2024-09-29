import React, { useEffect, useState } from 'react';
import './App.css';
import Item from './components/Item';
import AddItemModal from './components/AddItemModal';
import EditItemModal from './components/EditItemModal'; // Import the EditItemModal
import { setItem, getItem } from './localStorage'; // Import local storage utility functions

const App = () => {
  const [filter, setFilter] = useState('active');
  const [activeItems, setActiveItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // State to hold the current item being edited

  // Load items from local storage when the component mounts
  useEffect(() => {
    const storedActiveItems = getItem('activeItems') || [];
    const storedPurchasedItems = getItem('purchasedItems') || [];
    setActiveItems(storedActiveItems);
    setPurchasedItems(storedPurchasedItems);
  }, []);

  // Save items to local storage whenever active or purchased items change
  useEffect(() => {
    setItem('activeItems', activeItems);
    setItem('purchasedItems', purchasedItems);
  }, [activeItems, purchasedItems]);

  const itemsToShow = filter === 'active' ? activeItems : purchasedItems;

  const addItem = (newItem) => {
    setActiveItems([...activeItems, newItem]);
  };

  const updateItem = (updatedItem) => {
    setActiveItems(activeItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteItem = (itemId) => {
    setActiveItems(activeItems.filter(item => item.id !== itemId));
  };

  const markAsPurchased = (itemId) => {
    const purchasedItem = activeItems.find(item => item.id === itemId);
    setPurchasedItems([...purchasedItems, purchasedItem]);
    deleteItem(itemId);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item); // Set the current item to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  return (
    <div className="app-container">
      <h1>Savings</h1>

      {/* Filter Toggle */}
      <div className="filter-container">
        <button
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-button ${filter === 'purchased' ? 'active' : ''}`}
          onClick={() => setFilter('purchased')}
        >
          Purchased
        </button>
      </div>

      {/* List of Items */}
      <div className="item-list">
        {itemsToShow.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={updateItem}
            onDeleteItem={deleteItem}
            onMarkAsPurchased={markAsPurchased}
            onEditItem={handleEditItem} // Pass down the edit handler
          />
        ))}
      </div>

      {/* Add Item Button */}
      <button className="add-button" onClick={() => setIsAddModalOpen(true)}>+</button>

      {/* Add Item Modal */}
      {isAddModalOpen && <AddItemModal onClose={() => setIsAddModalOpen(false)} onSave={addItem} />}

      {/* Edit Item Modal */}
      {isEditModalOpen && currentItem && (
        <EditItemModal
          item={currentItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentItem(null); // Clear the current item when closing
          }}
          onUpdate={updateItem}
          onDelete={deleteItem}
          onMarkAsPurchased={markAsPurchased}
        />
      )}
    </div>
  );
};

export default App;

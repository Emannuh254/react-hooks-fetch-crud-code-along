import { useState, useEffect } from "react";
import ItemForm from "./ItemForm"; // Import ItemForm
import Filter from "./Filter"; // Assuming Filter is another component
import Item from "./Item"; // Assuming Item is another component

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch items from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  // Add a new item to the list
  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // Update an item in the list (toggle isInCart status)
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  }

  // Delete an item from the list
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

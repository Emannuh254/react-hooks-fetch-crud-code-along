import { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Dessert");

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        category: category,
        isInCart: false,
      }),
    })
      .then((r) => r.json())
      .then((newItem) => {
        onAddItem(newItem);
        setName("");
        setCategory("Dessert");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Dessert">Dessert</option>
        <option value="Dairy">Dairy</option>
        <option value="Fruit">Fruit</option>
      </select>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;

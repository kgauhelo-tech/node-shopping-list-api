import item from "../models/item";

let items: item[] = [];

let currentId = 0;

export const getItems = (): item[] => {
  return items;
};

export const getItemById = (id: string): item | undefined => {
  const item = items.find((item) => item.id === id);

  if (!item) throw new Error("Item not found");

  return item;
};

export const addItem = (
  name: string,
  status: boolean,
  quantity: string,
): item => {
  if (!name || !name.trim()) throw new Error("Name is required");
  if (typeof status !== "boolean") throw new Error("Status must be a boolean");
  if (!quantity || !quantity.trim()) throw new Error("Quantity is required");

  const newItem: item = {
    id: `${(currentId = currentId + 1)}`,
    name,
    status,
    quantity,
  };
  items.push(newItem);
  return newItem;
};

export const updateItem = (
  id: string,
  newName: string,
  newStatus: boolean,
  newQuantity: string,
): item => {
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) throw new Error(`Item with ${id} not found`);

  if (!newName || !newName.trim()) throw new Error("Name is required");
  if (typeof newStatus !== "boolean")
    throw new Error("Status must be a boolean");
  if (!newQuantity || !newQuantity.trim())
    throw new Error("Quantity is required");
  const updatedItem: item = {
    id,
    name: newName,
    status: newStatus,
    quantity: newQuantity,
  };

  items[index] = updatedItem;
  return updatedItem;
};

export const deleteItem = (id: string) => {
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Item not found");
  }

  const deletedItems = items.splice(index, 1);
  return deletedItems[0]!;
};

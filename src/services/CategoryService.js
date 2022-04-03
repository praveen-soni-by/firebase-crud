import { collection, doc, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  updateItem,
  addItem,
  fetchItem,
  deleteItems,
  deleteItem,
} from "../firebase/firebaseService";

const CATERORY_DOC = "categories";
const categoriesRef = collection(db, CATERORY_DOC);

export const fetchCategories = async () => {
  return fetchItem(categoriesRef);
};

export const addCategory = async (data) => {
  return addItem(categoriesRef, data);
};

export const updateCategory = async (data) => {
  const docRef = doc(db, CATERORY_DOC, data.id);
  return await updateItem(docRef, data);
};

export const deleteCategories = async (data) => {
  return await deleteItems(categoriesRef, "code", data);
};

export const deleteCategory = async (data) => {
  const q = query(categoriesRef, where("code", "in", data));
  return await deleteItem(q);
};

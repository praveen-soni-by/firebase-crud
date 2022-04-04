import { collection, doc, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  updateItem,
  addItem,
  fetchItem,
  deleteItems,
  deleteItem,
} from "../firebase/firebaseService";

const PRODUCT_DOC = "products";
const ProductsRef = collection(db, PRODUCT_DOC);

export const fetchProducts = async () => {
  return fetchItem(ProductsRef);
};

export const addProduct = async (data) => {
  return addItem(ProductsRef, data);
};

export const updateProduct = async (data) => {
  const docRef = doc(db, PRODUCT_DOC, data.id);
  return await updateItem(docRef, data);
};

export const deleteProducts = async (data) => {
  return await deleteItems(ProductsRef, "id", data);
};

export const deleteProduct = async (data) => {
  const q = query(ProductsRef, where("id", "in", data));
  return await deleteItem(q);
};

import {
    addDoc, collection, doc, getDocs, query, updateDoc, where, writeBatch
} from "firebase/firestore";
import { db } from "./firebase";

const CATERORY_DOC = "categories";
const categoriesRef = collection(db, CATERORY_DOC);

export const fetchItem = async () => {
  const Categories = [];
  const categoriesSnapShot = await getDocs(categoriesRef);
  categoriesSnapShot.docs.map((doc) =>
    Categories.push({ ...doc.data(), id: doc.id })
  );
  return Categories;
};

export const addItem = async (data) => {
  return await addDoc(categoriesRef, {
    ...data,
  });
};

export const updateItem = async (data) => {
  const docRef = doc(db, CATERORY_DOC, data.id);
  delete data.id;
  return await updateDoc(docRef, {
    ...data,
  });
};

export const deleteItems = async (data) => {
  if (data.length > 10) {
    return sliceIntoChunks(data, 10).map((k) => deleteData(k));
  } else {
    return deleteData(data);
  }
};

const deleteData = async (data) => {
  let batch = writeBatch(db);
  const q = query(categoriesRef, where("code", "in", data));
  const querySnapshot = await getDocs(q);
  querySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  return batch.commit();
};

export const deleteItem = async (data) => {
  const q = query(categoriesRef, where("code", "in", data));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
};

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export default { updateItem, addItem, fetchItem, deleteItems, deleteItem };

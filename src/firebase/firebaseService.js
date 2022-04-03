import {
  addDoc, getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
  serverTimestamp,
  orderBy
} from "firebase/firestore";
import Utils from "../utils/Utils";
import { db } from "./firebase";

export const fetchItem = async (docRef) => {
  const docs = [];
  const docSnapshot = await getDocs(query(docRef, orderBy('createdAt')));
  docSnapshot.docs.map((doc) => docs.push({ ...doc.data() }));
  return docs;
};

export const addItem = async (docRef,data) => {
  return await addDoc(docRef, {
    ...data,
    id:uuidv4(),
    createAt:serverTimestamp()
  });
};


export const updateItem = async (docRef,data) => {
  delete data.id;
  return await updateDoc(docRef, {
    ...data,
  });
};

export const deleteItems = async (docRef,key,data) => {
  if (data.length > 10) {
    return Utils.sliceIntoChunks(data, 10).map((d) => deleteData(docRef,key,d));
  } else {
    return deleteData(docRef,key,data);
  }
};

export const deleteItem = async (docRef,key,data) => {
  const q = query(docRef, where(key, "in", data));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
};


const deleteData = async (docRef,key,data) => {
  let batch = writeBatch(db);
  const q = query(docRef, where(key, "in", data));
  const querySnapshot = await getDocs(q);
  querySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  return batch.commit();
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}

export default { updateItem, addItem, fetchItem, deleteItems, deleteItem };

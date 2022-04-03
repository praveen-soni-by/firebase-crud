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
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default { updateItem, addItem, fetchItem, deleteItems, deleteItem };

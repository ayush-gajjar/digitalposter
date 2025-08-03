import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", // Replace with your Firebase API key
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Auth functions
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  return await signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions
export const createPoster = async (posterData: any) => {
  return await addDoc(collection(db, 'posters'), {
    ...posterData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const getUserPosters = async (userId: string) => {
  const q = query(
    collection(db, 'posters'), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updatePoster = async (posterId: string, updates: any) => {
  const posterRef = doc(db, 'posters', posterId);
  return await updateDoc(posterRef, {
    ...updates,
    updatedAt: new Date()
  });
};

export const deletePoster = async (posterId: string) => {
  return await deleteDoc(doc(db, 'posters', posterId));
};

export const getPosterById = async (posterId: string) => {
  const posterDoc = await getDoc(doc(db, 'posters', posterId));
  return posterDoc.exists() ? { id: posterDoc.id, ...posterDoc.data() } : null;
};

// Storage functions
export const uploadImage = async (file: File, path: string) => {
  const imageRef = ref(storage, path);
  const snapshot = await uploadBytes(imageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const deleteImage = async (path: string) => {
  const imageRef = ref(storage, path);
  return await deleteObject(imageRef);
};

// User profile functions
export const createUserProfile = async (userId: string, profileData: any) => {
  return await addDoc(collection(db, 'profiles'), {
    userId,
    ...profileData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const getUserProfile = async (userId: string) => {
  const q = query(collection(db, 'profiles'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null;
};

export const updateUserProfile = async (profileId: string, updates: any) => {
  const profileRef = doc(db, 'profiles', profileId);
  return await updateDoc(profileRef, {
    ...updates,
    updatedAt: new Date()
  });
};

// Analytics functions
export const logEvent = async (eventName: string, eventData: any) => {
  return await addDoc(collection(db, 'analytics'), {
    eventName,
    eventData,
    timestamp: new Date()
  });
};
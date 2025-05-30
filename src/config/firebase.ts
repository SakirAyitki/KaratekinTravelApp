import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Firebase Auth
export const firebaseAuth = auth;

// Firestore Database
export const firebaseFirestore = firestore;

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  TOURS: 'tours',
  BOOKINGS: 'bookings',
  COMPANIES: 'companies',
};

// Auth functions
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Firestore functions
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userId)
      .set({
        ...userData,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const doc = await firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userId)
      .get();
    
    if (doc.exists) {
      return { success: true, data: doc.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}; 
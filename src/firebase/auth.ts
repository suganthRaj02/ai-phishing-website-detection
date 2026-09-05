import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, googleProvider, db } from './config';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile } from '../types';

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      await syncUserProfile(result.user);
      return result.user;
    }
    return null;
  } catch (error: any) {
    console.warn('Popup sign in error, trying redirect fallback or reporting:', error);
    // If popup was blocked or closed, attempt redirect
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      try {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (redirectErr) {
        console.error('Redirect sign in failed:', redirectErr);
        throw redirectErr;
      }
    }
    throw error;
  }
};

export const checkRedirectResult = async (): Promise<User | null> => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      await syncUserProfile(result.user);
      return result.user;
    }
    return null;
  } catch (error) {
    console.error('Redirect result check error:', error);
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    localStorage.removeItem('capstone_demo_user');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const syncUserProfile = async (user: User): Promise<UserProfile> => {
  const userRef = doc(db, 'users', user.uid);
  const now = new Date().toISOString();
  
  try {
    const docSnap = await getDoc(userRef);
    const profile: UserProfile = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Researcher',
      email: user.email || '',
      photoURL: user.photoURL || undefined,
      createdAt: docSnap.exists() ? (docSnap.data().createdAt || now) : now,
      lastLogin: now,
    };

    await setDoc(userRef, {
      ...profile,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    return profile;
  } catch (err) {
    console.warn('Could not sync user profile to Firestore (may be offline):', err);
    return {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Researcher',
      email: user.email || '',
      photoURL: user.photoURL || undefined,
      createdAt: now,
      lastLogin: now,
    };
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await syncUserProfile(user);
      } catch (e) {
        console.error('Error during auth state sync:', e);
      }
    }
    callback(user);
  });
};

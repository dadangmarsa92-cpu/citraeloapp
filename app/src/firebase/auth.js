/**
 * CitraElo Auth Module
 * Username + Password authentication via Firestore
 */
import { db } from './config.js';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

const SESSION_KEY = 'citraelo_session';
const USERS_COLLECTION = 'users';

/**
 * Login with username + password via Firestore
 */
export async function loginUser(username, password, role = 'user') {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(
      usersRef,
      where('username', '==', username),
      where('role', '==', role)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error('Username tidak ditemukan atau role tidak sesuai');
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Password check
    if (userData.password !== password) {
      throw new Error('Password salah');
    }

    // Save session
    const session = {
      uid: userDoc.id,
      username: userData.username,
      displayName: userData.displayName || userData.username,
      role: userData.role,
      avatarUrl: userData.avatarUrl || '',
      sector: userData.sector || '',
      loggedInAt: new Date().toISOString()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Logout - clear session
 */
export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Get current session
 */
export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

/**
 * Check if user is logged in
 */
export function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * Check if current user is admin
 */
export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'admin';
}

/**
 * Seed demo users to Firestore (run once)
 */
export async function seedUsers() {
  const users = [
    {
      id: 'admin001',
      username: 'admin',
      password: 'admin123',
      displayName: 'Expedition Lead',
      role: 'admin',
      avatarUrl: '',
      sector: 'River Sector Alpha',
    },
    {
      id: 'user001',
      username: 'user',
      password: 'user123',
      displayName: 'Rafting Explorer',
      role: 'user',
      avatarUrl: '',
      sector: 'Snake River',
    }
  ];

  for (const user of users) {
    const { id, ...data } = user;
    await setDoc(doc(db, USERS_COLLECTION, id), {
      ...data,
      createdAt: serverTimestamp()
    });
  }

  console.log('✅ Users seeded successfully!');
  return users;
}

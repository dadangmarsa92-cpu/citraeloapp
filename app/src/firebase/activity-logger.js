import { db } from './config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getCurrentUser } from './auth.js';

/**
 * Logs an activity to the 'activity_logs' Firestore collection.
 * 
 * @param {string} action - 'ADD', 'EDIT', or 'DELETE'
 * @param {string} title - Short summary, e.g. "Pesanan Ditambahkan"
 * @param {string} description - Detailed description, e.g. "Menambahkan 2 tamu untuk sesi pagi"
 * @param {object} details - Optional extra payload (e.g. { orderId: 'CE-XXX', price: 10000 })
 */
export async function logActivity(action, title, description, details = {}) {
  try {
    const user = getCurrentUser();
    const payload = {
      action,
      title,
      description,
      details,
      timestamp: serverTimestamp(),
      user: user ? {
        uid: user.uid || '',
        email: user.email || '',
        displayName: user.displayName || 'Unknown',
        role: user.role || 'user'
      } : {
        uid: 'system',
        email: 'system',
        displayName: 'System',
        role: 'system'
      }
    };
    
    // Clean undefined values to prevent Firestore errors
    const safePayload = JSON.parse(JSON.stringify(payload));
    // Restore serverTimestamp which gets destroyed by JSON stringify
    safePayload.timestamp = serverTimestamp();
    
    await addDoc(collection(db, 'activity_logs'), safePayload);
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

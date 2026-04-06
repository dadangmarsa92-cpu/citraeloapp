/**
 * Firestore Data Operations for CitraElo Rafting
 */
import { db } from './config.js';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';

// ── Expeditions ──
export async function getExpeditions() {
  const snapshot = await getDocs(collection(db, 'expeditions'));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getExpeditionsByDate(dateStr) {
  const q = query(collection(db, 'expeditions'), where('date', '==', dateStr));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Bookings ──
export async function getBookings() {
  const snapshot = await getDocs(collection(db, 'bookings'));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getRecentBookings(count = 10) {
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addBooking(data) {
  return await addDoc(collection(db, 'bookings'), {
    ...data,
    createdAt: serverTimestamp()
  });
}

// ── Guides ──
export async function getGuides() {
  const snapshot = await getDocs(collection(db, 'guides'));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getAvailableGuides() {
  const q = query(collection(db, 'guides'), where('isAvailable', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Reports ──
export async function getMonthlyReports() {
  const snapshot = await getDocs(collection(db, 'reports'));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Seed Demo Data ──
export async function seedDemoData() {
  // Expeditions
  const expeditions = [
    {
      name: 'Gorge Canyon Run',
      tripId: '#TC-9921',
      classLevel: 'Class IV+',
      date: '2024-08-06',
      departureTime: '09:00',
      leadGuide: 'Sarah "Riptide" Miller',
      maxCapacity: 8,
      currentManifest: 8,
      status: 'active',
      guests: ['John Doe', 'Elena R.', 'Marcus V.']
    },
    {
      name: 'Misty Valley Float',
      tripId: '#SD-4412',
      classLevel: 'Class II',
      date: '2024-08-06',
      departureTime: '13:30',
      leadGuide: 'Alex Chen',
      maxCapacity: 12,
      currentManifest: 4,
      status: 'active',
      guests: ['The Thompson Family (4)', 'Bill & Jen (2)']
    },
    {
      name: 'CitraElo Rapids Express',
      tripId: '#GG-2281',
      classLevel: 'Class III',
      date: '2024-08-06',
      departureTime: '15:00',
      leadGuide: 'Tom "Beard" Vance',
      maxCapacity: 12,
      currentManifest: 12,
      status: 'active',
      guests: ['University Kayak Club', 'Private Group B']
    },
    {
      name: 'Thunder Canyon Run',
      tripId: '#TC-9921',
      classLevel: 'Class IV',
      date: '2024-07-14',
      departureTime: '09:00',
      leadGuide: 'Marcus S.',
      maxCapacity: 12,
      currentManifest: 12,
      status: 'completed',
      guests: []
    },
    {
      name: 'Morning Mist Float',
      tripId: '#MM-3301',
      classLevel: 'Class II',
      date: '2024-08-02',
      departureTime: '07:30',
      leadGuide: 'Elena L.',
      maxCapacity: 8,
      currentManifest: 6,
      status: 'active',
      guests: []
    }
  ];

  for (const exp of expeditions) {
    await addDoc(collection(db, 'expeditions'), { ...exp, createdAt: serverTimestamp() });
  }

  // Bookings
  const bookings = [
    { expeditionName: 'Thunder Canyon Run', tripId: '#TC-9921', guestName: 'Group Alpha', numberOfPersons: 12, status: 'paid', date: '2024-07-14' },
    { expeditionName: 'Sunset Drift Expedition', tripId: '#SD-4412', guestName: 'Team Beta', numberOfPersons: 6, status: 'pending', date: '2024-07-20' },
    { expeditionName: 'Granite Gorge Sprint', tripId: '#GG-2281', guestName: 'Solo Explorer', numberOfPersons: 4, status: 'cancelled', date: '2024-07-22' }
  ];

  for (const b of bookings) {
    await addDoc(collection(db, 'bookings'), { ...b, createdAt: serverTimestamp() });
  }

  // Guides
  const guides = [
    { name: 'Sarah Miller', nickname: 'Riptide', specialty: 'Class V Expert', isAvailable: true, sector: 'Alpha' },
    { name: 'Alex Chen', nickname: '', specialty: 'Scenic Float', isAvailable: true, sector: 'Alpha' },
    { name: 'Tom Vance', nickname: 'Beard', specialty: 'Speed Runs', isAvailable: true, sector: 'Alpha' },
    { name: 'Marcus Santos', nickname: '', specialty: 'Lead Guide', isAvailable: true, sector: 'Alpha' },
    { name: 'Elena Lopez', nickname: '', specialty: 'Nature Specialist', isAvailable: true, sector: 'Alpha' },
    { name: 'Jake Rivers', nickname: '', specialty: 'Safety Lead', isAvailable: true, sector: 'Alpha' },
    { name: 'Nadia Patel', nickname: '', specialty: 'Kayak Instructor', isAvailable: true, sector: 'Beta' },
    { name: 'Oscar Wu', nickname: '', specialty: 'Equipment Lead', isAvailable: true, sector: 'Beta' }
  ];

  for (const g of guides) {
    await addDoc(collection(db, 'guides'), { ...g, createdAt: serverTimestamp() });
  }

  // Reports
  const reports = [
    { month: 'March', revenue: 28500, bookings: 310 },
    { month: 'April', revenue: 35200, bookings: 380 },
    { month: 'May', revenue: 31000, bookings: 340 },
    { month: 'June', revenue: 52000, bookings: 420 },
    { month: 'July', revenue: 68000, bookings: 482 },
    { month: 'August', revenue: 78500, bookings: 510 },
    { month: 'September', revenue: 45300, bookings: 390 }
  ];

  for (const r of reports) {
    await addDoc(collection(db, 'reports'), { ...r, createdAt: serverTimestamp() });
  }

  console.log('Demo data seeded successfully!');
}

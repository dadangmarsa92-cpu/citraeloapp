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
// ── Seed Demo Data ──
export async function seedDemoData() {
  const raftingTypes = [
    { name: 'Elo River Adventure', price: 750000 },
    { name: 'Progo River Thrill', price: 1200000 },
    { name: 'Family Fun Float', price: 600000 }
  ];

  const tambahanTypes = [
    { name: 'Dokumentasi', price: 150000 },
    { name: 'Makan Siang Extra', price: 50000 },
    { name: 'Transportasi antar-jemput', price: 200000 }
  ];

  // Seed Rafting Types
  for (const type of raftingTypes) {
    await setDoc(doc(db, 'rafting_types', type.name.replace(/\s+/g, '_').toLowerCase()), type);
  }

  // Seed Tambahan Types
  for (const extra of tambahanTypes) {
    await setDoc(doc(doc(db, 'tambahan_types', extra.name.replace(/\s+/g, '_').toLowerCase())), extra);
  }

  // Generate April 2026 Bookings
  const names = ['Andi', 'Budi', 'Cici', 'Dedi', 'Euis', 'Fajar', 'Gita', 'Hadi', 'Indra', 'Joko', 'Kiki', 'Lulu', 'Maman', 'Nina', 'Oki', 'Putri'];
  const dates = [];
  for (let i = 1; i <= 30; i++) {
    dates.push(`2026-04-${String(i).padStart(2, '0')}`);
  }

  for (const date of dates) {
    // 1-3 bookings per day
    const bookingCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < bookingCount; j++) {
      const name = names[Math.floor(Math.random() * names.length)] + ' ' + (j + 1);
      const type = raftingTypes[Math.floor(Math.random() * raftingTypes.length)];
      const boats = Math.floor(Math.random() * 3) + 1;
      const participants = boats * (Math.floor(Math.random() * 2) + 4); // 4-5 per boat
      const sessi = Math.random() > 0.5 ? 'Pagi' : 'Siang';
      
      const extras = [];
      if (Math.random() > 0.5) extras.push({ ...tambahanTypes[0], qty: boats });
      if (Math.random() > 0.7) extras.push({ ...tambahanTypes[1], qty: participants });

      const subtotalExtras = extras.reduce((sum, e) => sum + (e.price * e.qty), 0);
      const total = (type.price * boats) + subtotalExtras;

      await addDoc(collection(db, 'bookings'), {
        nama: name,
        noTelp: '08' + Math.floor(Math.random() * 1000000000),
        tanggalPemesanan: '2026-04-01',
        tanggal: date,
        raftingType: type.name,
        hargaPerKapal: type.price,
        jumlahPeserta: participants,
        jumlahPerahu: boats,
        sesiTrip: sessi,
        tambahan: extras,
        totalHarga: total,
        createdAt: serverTimestamp()
      });
    }
  }

  console.log('April 2026 demo data seeded successfully!');
}


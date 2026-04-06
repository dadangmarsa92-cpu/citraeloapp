/**
 * Settings Page — Manage Rafting Types & Tambahan (Extras)
 */
import { db } from '../firebase/config.js';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const COL_RAFTING = 'rafting_types';
const COL_TAMBAHAN = 'tambahan_types';

export async function loadRaftingTypes() {
  try {
    const snap = await getDocs(collection(db, COL_RAFTING));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) { console.error(e); return []; }
}

export async function loadTambahanTypes() {
  try {
    const snap = await getDocs(collection(db, COL_TAMBAHAN));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) { console.error(e); return []; }
}

function formatRp(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

function sectionHTML(title, icon, addId, formId, nameId, priceId, saveBtnId, cancelBtnId, listId, priceLabel) {
  return `
    <section>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
        <h3 class="label-sm" style="color:var(--outline);letter-spacing:0.2em;">${title}</h3>
        <button id="${addId}" style="display:flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;background:var(--primary);color:white;border:none;border-radius:var(--radius-full);cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.75rem;">
          <span class="material-symbols-outlined" style="font-size:1rem;">add</span> Tambah
        </button>
      </div>
      <div id="${formId}" style="display:none;background:var(--surface-container-low);border-radius:var(--radius-xl);padding:1.25rem;margin-bottom:1rem;">
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;">NAMA</label>
            <input type="text" id="${nameId}" class="input-field" placeholder="Masukkan nama" style="padding-left:1rem;height:2.75rem;">
          </div>
          <div>
            <label class="label-xs" style="display:block;color:var(--on-surface-variant);margin-bottom:0.25rem;">${priceLabel}</label>
            <input type="number" id="${priceId}" class="input-field" placeholder="0" min="0" style="padding-left:1rem;height:2.75rem;">
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button id="${saveBtnId}" class="btn btn--primary" style="flex:1;font-size:0.8125rem;padding:0.625rem;">
              <span class="material-symbols-outlined" style="font-size:1rem;">save</span> Simpan
            </button>
            <button id="${cancelBtnId}" style="flex:1;padding:0.625rem;border:1px solid var(--outline-variant);background:none;border-radius:var(--radius-full);font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--outline);cursor:pointer;font-size:0.8125rem;">Batal</button>
          </div>
        </div>
      </div>
      <div id="${listId}" style="display:flex;flex-direction:column;gap:0.5rem;">
        <div style="text-align:center;padding:2rem;color:var(--outline);"><div class="spinner" style="margin:0 auto 1rem;"></div>Memuat...</div>
      </div>
    </section>`;
}

export function renderSettings(user) {
  return `
    <div class="page" style="display:flex;flex-direction:column;gap:2rem;">
      <section style="display:flex;align-items:center;gap:0.75rem;">
        <button id="btn-back-settings" style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--on-surface);">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h2 class="font-headline" style="font-size:1.75rem;font-weight:700;color:var(--primary);line-height:1;">Settings</h2>
          <p style="color:var(--outline);font-size:0.75rem;margin-top:0.25rem;">Kelola tipe rafting & tambahan</p>
        </div>
      </section>
      ${sectionHTML('TIPE RAFTING', 'kayaking', 'btn-add-type', 'type-form', 'type-name', 'type-price', 'btn-save-type', 'btn-cancel-type', 'types-list', 'HARGA PER KAPAL (Rp)')}
      ${sectionHTML('JENIS TAMBAHAN', 'add_shopping_cart', 'btn-add-extra', 'extra-form', 'extra-name', 'extra-price', 'btn-save-extra', 'btn-cancel-extra', 'extras-list', 'HARGA SATUAN (Rp)')}
    </div>
  `;
}

function initCRUD({ col, addBtn, formId, nameId, priceId, saveBtn, cancelBtn, listId, icon, emptyText, loadFn }) {
  let editingId = null;
  const form = document.getElementById(formId);
  const nameEl = document.getElementById(nameId);
  const priceEl = document.getElementById(priceId);

  async function loadList() {
    const list = document.getElementById(listId);
    const items = await loadFn();
    if (items.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:1.5rem;color:var(--outline);font-size:0.875rem;">
        <span class="material-symbols-outlined" style="font-size:2rem;display:block;margin-bottom:0.5rem;opacity:0.3;">${icon}</span>${emptyText}</div>`;
      return;
    }
    list.innerHTML = items.map(t => `
      <div style="display:flex;align-items:center;gap:1rem;padding:0.875rem 1.25rem;background:var(--surface-container-low);border-radius:var(--radius-xl);">
        <span class="material-symbols-outlined" style="color:var(--primary);font-size:1.25rem;">${icon}</span>
        <div style="flex:1;">
          <p style="font-weight:700;font-size:0.8125rem;">${t.name}</p>
          <p style="font-size:0.75rem;color:var(--secondary);font-weight:700;font-family:'Space Grotesk',sans-serif;">${formatRp(t.price)}</p>
        </div>
        <button class="crud-edit" data-id="${t.id}" data-name="${t.name}" data-price="${t.price}" style="width:2rem;height:2rem;border-radius:50%;background:var(--surface-container-high);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--primary);">
          <span class="material-symbols-outlined" style="font-size:1rem;">edit</span>
        </button>
        <button class="crud-del" data-id="${t.id}" style="width:2rem;height:2rem;border-radius:50%;background:var(--error-container);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--error);">
          <span class="material-symbols-outlined" style="font-size:1rem;">delete</span>
        </button>
      </div>`).join('');

    list.querySelectorAll('.crud-edit').forEach(btn => {
      btn.addEventListener('click', () => { editingId = btn.dataset.id; nameEl.value = btn.dataset.name; priceEl.value = btn.dataset.price; form.style.display = 'block'; });
    });
    list.querySelectorAll('.crud-del').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Hapus item ini?')) return;
        try { await deleteDoc(doc(db, col, btn.dataset.id)); loadList(); } catch (e) { alert('Gagal: ' + e.message); }
      });
    });
  }

  document.getElementById(addBtn)?.addEventListener('click', () => { editingId = null; nameEl.value = ''; priceEl.value = ''; form.style.display = 'block'; });
  document.getElementById(cancelBtn)?.addEventListener('click', () => { form.style.display = 'none'; editingId = null; });
  document.getElementById(saveBtn)?.addEventListener('click', async () => {
    const name = nameEl.value.trim();
    const price = parseInt(priceEl.value) || 0;
    if (!name || !price) { alert('Nama dan harga wajib diisi'); return; }
    try {
      if (editingId) { await updateDoc(doc(db, col, editingId), { name, price }); }
      else { await addDoc(collection(db, col), { name, price }); }
      form.style.display = 'none'; editingId = null; loadList();
    } catch (e) { alert('Gagal: ' + e.message); }
  });

  loadList();
}

export function initSettings() {
  document.getElementById('btn-back-settings')?.addEventListener('click', () => { window.location.hash = '/profile'; });

  initCRUD({
    col: COL_RAFTING, addBtn: 'btn-add-type', formId: 'type-form', nameId: 'type-name', priceId: 'type-price',
    saveBtn: 'btn-save-type', cancelBtn: 'btn-cancel-type', listId: 'types-list', icon: 'kayaking',
    emptyText: 'Belum ada tipe rafting.', loadFn: loadRaftingTypes
  });

  initCRUD({
    col: COL_TAMBAHAN, addBtn: 'btn-add-extra', formId: 'extra-form', nameId: 'extra-name', priceId: 'extra-price',
    saveBtn: 'btn-save-extra', cancelBtn: 'btn-cancel-extra', listId: 'extras-list', icon: 'add_shopping_cart',
    emptyText: 'Belum ada jenis tambahan.', loadFn: loadTambahanTypes
  });
}

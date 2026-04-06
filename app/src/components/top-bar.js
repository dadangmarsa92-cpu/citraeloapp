/**
 * Top App Bar Component
 */
export function renderTopBar(user) {
  const avatarUrl = user?.avatarUrl || '';
  const initials = (user?.displayName || 'U').charAt(0).toUpperCase();

  return `
    <header class="top-bar" id="top-bar">
      <div class="top-bar__brand">
        <span class="material-symbols-outlined top-bar__brand-icon">waves</span>
        <h1 class="top-bar__brand-name">CitraElo Rafting</h1>
      </div>
      <div class="top-bar__actions">
        <button class="material-symbols-outlined" style="background:none;border:none;cursor:pointer;color:var(--primary);font-size:1.5rem;" id="btn-notifications">
          notifications
        </button>
        <div class="top-bar__avatar" onclick="window.location.hash='/profile'" style="cursor:pointer">
          ${avatarUrl 
            ? `<img src="${avatarUrl}" alt="Profile">` 
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--primary-container);color:white;font-weight:700;font-family:'Space Grotesk',sans-serif;">${initials}</div>`
          }
        </div>
      </div>
    </header>
  `;
}

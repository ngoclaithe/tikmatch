/**
 * TikMatch Prototype - Profile & Verified Badge Controller
 */

import { getText, getLang } from './i18n.js';

let toastCallback = null;
let loginTriggerCallback = null;
let logoutCallback = null;

export function initProfile(onToast, onLoginTrigger, onLogout) {
  toastCallback = onToast;
  loginTriggerCallback = onLoginTrigger;
  logoutCallback = onLogout;
  bindProfileEvents();
}

export function updateProfileView(isLoggedIn) {
  const guestView = document.getElementById('profile-guest-view');
  const userView = document.getElementById('profile-user-view');
  const logoutBtn = document.getElementById('logout-btn');

  if (isLoggedIn) {
    if (guestView) guestView.style.display = 'none';
    if (userView) userView.style.display = 'flex';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  } else {
    if (guestView) guestView.style.display = 'flex';
    if (userView) userView.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

function bindProfileEvents() {
  // Guest CTA: Trigger Login / Registration modal
  const guestLoginBtn = document.getElementById('guest-login-btn');
  if (guestLoginBtn) {
    guestLoginBtn.addEventListener('click', () => {
      if (loginTriggerCallback) loginTriggerCallback();
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (logoutCallback) logoutCallback();
    });
  }

  // Verification banner click
  const verifyBanner = document.getElementById('verification-badge-card');
  const verifyModal = document.getElementById('verify-modal-overlay');
  const closeModalBtn = document.getElementById('close-verify-modal-btn');
  const submitVerifyBtn = document.getElementById('modal-submit-btn');
  const dropzone = document.getElementById('upload-dropzone');
  const uploadLabel = document.getElementById('modal-upload-label');

  if (verifyBanner && verifyModal) {
    verifyBanner.addEventListener('click', () => {
      verifyModal.classList.add('open');
    });
  }

  if (closeModalBtn && verifyModal) {
    closeModalBtn.addEventListener('click', () => {
      verifyModal.classList.remove('open');
    });
  }

  if (dropzone && uploadLabel) {
    dropzone.addEventListener('click', () => {
      dropzone.style.borderColor = '#10b981';
      dropzone.style.background = 'rgba(16, 185, 129, 0.1)';
      uploadLabel.textContent = getLang() === 'vi'
        ? "✓ Đã chọn: BI_Angola_Sara.jpg (1.8 MB)"
        : "✓ Selecionado: BI_Angola_Sara.jpg (1.8 MB)";
    });
  }

  if (submitVerifyBtn) {
    submitVerifyBtn.addEventListener('click', () => {
      submitVerifyBtn.textContent = getText('connectingStatus');

      setTimeout(() => {
        if (verifyModal) verifyModal.classList.remove('open');
        submitVerifyBtn.textContent = getText('modalSubmit');

        // Show gold badge
        const badge = document.getElementById('profile-verified-badge');
        if (badge) badge.style.display = 'inline-block';

        // Update banner text
        const titleEl = document.getElementById('verify-card-title');
        const descEl = document.getElementById('verify-card-desc');
        const actionEl = document.getElementById('verify-action-btn-text');

        if (titleEl) titleEl.textContent = getText('verifiedStatus');
        if (descEl) descEl.textContent = "Bilhete de Identidade: #AO-8924019";
        if (actionEl) actionEl.textContent = "✓ OK";

        if (toastCallback) {
          toastCallback(
            getLang() === 'vi' ? "Đã duyệt Tích Xanh! 🏅" : "Selo Oficial Aprovado! 🏅",
            getText('toastVerified')
          );
        }
      }, 1400);
    });
  }
}

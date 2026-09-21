/**
 * TikMatch Prototype - Main Application Entry Point
 */

import { setLang, getLang, updateTexts, getText } from './i18n.js';
import { initFeed, updateFeedGuestState } from './feed.js';
import { initMatch, updateMatchGuestState } from './match.js';
import { initCall, startVoiceCall, endVoiceCall } from './call.js';
import { initChat, updateChatGuestState, addMatchedPartner } from './chat.js';
import { initProfile, updateProfileView } from './profile.js';

// Global Auth State (Starts as Guest per requirements)
let isLoggedIn = false;

// Show In-App Dynamic Toast (Only created on actual action, auto-removed)
export function showToast(title, message) {
  const container = document.getElementById('app-root');
  if (!container) return;

  // Clear existing toasts
  const existing = container.querySelectorAll('.dynamic-toast');
  existing.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'dynamic-toast';
  toast.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    </div>
    <div class="toast-msg">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;
  container.appendChild(toast);

  // Smooth slide in
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  // Auto-dismiss after 2.5s
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Router / Screen Navigation
export function switchScreen(targetScreenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));

  const target = document.getElementById(targetScreenId);
  if (target) target.classList.add('active');

  // Update bottom nav active state strictly for the current screen
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => {
    n.classList.remove('active');
    if (n.dataset.screen === targetScreenId || (targetScreenId === 'screen-call' && n.dataset.screen === 'screen-match')) {
      n.classList.add('active');
    }
  });
}

// Auth State Controller (Synchronizes all 4 tabs)
function setAuthState(loggedIn) {
  isLoggedIn = loggedIn;
  updateProfileView(isLoggedIn);
  updateFeedGuestState(isLoggedIn);
  updateMatchGuestState(isLoggedIn);
  updateChatGuestState(isLoggedIn);

  if (isLoggedIn) {
    showToast(
      getLang() === 'vi' ? "Đăng nhập thành công! 🎉" : "Sessão Iniciada! 🎉",
      getText('toastLoginSuccess')
    );
  } else {
    showToast(
      getLang() === 'vi' ? "Đã đăng xuất" : "Sessão Terminada",
      getText('toastLogout')
    );
  }
}

// Auth Modal Controls
function openAuthModal() {
  const modal = document.getElementById('auth-modal-overlay');
  if (modal) modal.classList.add('open');
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal-overlay');
  if (modal) modal.classList.remove('open');
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation setup
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const screenId = item.dataset.screen;
      if (screenId) {
        if (screenId === 'screen-match') {
          // If leaving call, end call
          const callScreen = document.getElementById('screen-call');
          if (callScreen && callScreen.classList.contains('active')) {
            endVoiceCall();
          }
        }
        switchScreen(screenId);
      }
    });
  });

  // Dynamic Island tap: jump to call
  const dynamicIsland = document.getElementById('dynamic-island');
  if (dynamicIsland) {
    dynamicIsland.addEventListener('click', () => {
      switchScreen('screen-call');
    });
  }

  // 2. In-App Language Toggle Setup
  const langBtns = document.querySelectorAll('.inapp-lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      setLang(lang);
      updateFeedGuestState(isLoggedIn);
    });
  });

  // 3. Auth Modal Events
  const closeAuthBtn = document.getElementById('close-auth-modal-btn');
  if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuthModal);

  const authSubmitBtn = document.getElementById('auth-submit-btn');
  if (authSubmitBtn) {
    authSubmitBtn.addEventListener('click', () => {
      closeAuthModal();
      setAuthState(true);
    });
  }

  const authDemoBtn = document.getElementById('auth-demo-btn');
  if (authDemoBtn) {
    authDemoBtn.addEventListener('click', () => {
      closeAuthModal();
      setAuthState(true);
    });
  }

  // 4. Initialize Feature Controllers
  initFeed(showToast, openAuthModal);

  initMatch(
    () => {
      switchScreen('screen-call');
      startVoiceCall();
    },
    openAuthModal
  );

  initCall(
    showToast,
    (partner) => addMatchedPartner(partner),
    () => switchScreen('screen-match')
  );

  initChat(
    () => {
      switchScreen('screen-call');
      startVoiceCall();
    },
    openAuthModal
  );

  initProfile(
    showToast,
    openAuthModal,
    () => setAuthState(false) // logout
  );

  // Initial State: Guest Mode across all tabs
  updateTexts();
  updateProfileView(false);
  updateFeedGuestState(false);
  updateMatchGuestState(false);
  updateChatGuestState(false);
});

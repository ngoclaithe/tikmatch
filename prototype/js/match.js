/**
 * TikMatch Prototype - Radar Matching Controller (Litmatch Style)
 */

import { getText } from './i18n.js';

let startCallCallback = null;
let loginTriggerCallback = null;

export function initMatch(onStartCall, onLoginTrigger) {
  startCallCallback = onStartCall;
  loginTriggerCallback = onLoginTrigger;
  bindMatchEvents();
}

export function updateMatchGuestState(isLoggedIn) {
  const guestView = document.getElementById('match-guest-view');
  const activeView = document.getElementById('match-active-view');

  if (guestView && activeView) {
    if (isLoggedIn) {
      guestView.style.display = 'none';
      activeView.style.display = 'flex';
    } else {
      guestView.style.display = 'flex';
      activeView.style.display = 'none';
    }
  }
}

function bindMatchEvents() {
  // Guest login button
  const guestLoginBtn = document.getElementById('match-guest-login-btn');
  if (guestLoginBtn) {
    guestLoginBtn.addEventListener('click', () => {
      if (loginTriggerCallback) loginTriggerCallback();
    });
  }

  // Gender filters
  document.querySelectorAll('.gender-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.gender-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Age filters
  document.querySelectorAll('.age-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.age-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Start matching button
  const startBtn = document.getElementById('start-matching-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const connectingTxt = getText('connectingStatus');
      startBtn.innerHTML = `
        <svg class="music-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>
        </svg>
        <span>${connectingTxt}</span>
      `;
      startBtn.style.opacity = '0.85';

      // Simulate network search in Luanda then start call
      setTimeout(() => {
        startBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/></svg>
          <span id="start-matching-btn-text">${getText('startMatching')}</span>
        `;
        startBtn.style.opacity = '1';
        if (startCallCallback) startCallCallback();
      }, 2000);
    });
  }
}
